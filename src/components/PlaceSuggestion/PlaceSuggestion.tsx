import { CLEAR_PLACE_SUGGESTIONS, PlaceSuggestionContext, PlaceSuggestionReducerContext, SET_PLACE_SUGGESTIONS } from "@/contexts/PlaceSuggestionContext";
import { CLEAR_FOCUSED_INPUT, SET_FROM, SET_FROM_PLACE_ID, SET_TO, SET_TO_PLACE_ID, SearchContext, SearchDispatchContext } from "@/contexts/SearchContext";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useContext, useEffect } from "react";

const PlaceSuggestion = () => {

    const search = useContext(SearchContext);
    const searchDispatch = useContext(SearchDispatchContext);

    const placeSuggestions = useContext(PlaceSuggestionContext);
    const placeSuggestionsDispatch = useContext(PlaceSuggestionReducerContext);

    const { from, to, focusedInput } = search;

    const fromDebounce = useDebounce(from, 500);
    const toDebounce = useDebounce(to, 500);

    const placeLibrary = useMapsLibrary("places");


    useEffect(() => {
        const placeSuggesttions = async () => {
            if (!placeLibrary) return null;
            if (!focusedInput) return null;

            if (fromDebounce || toDebounce) {
                const prediction = new placeLibrary.AutocompleteService();

                const predictionRequest: google.maps.places.AutocompletionRequest = {
                    input: focusedInput === "from" ? fromDebounce : toDebounce,
                    language: "th",
                    componentRestrictions: {
                        country: "th"
                    }
                }

                prediction.getPlacePredictions(predictionRequest, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        if (results)
                            placeSuggestionsDispatch({ type: SET_PLACE_SUGGESTIONS, payload: { placeSuggestions: results } });
                    }
                })
            }
        }

        placeSuggesttions();
    }, [fromDebounce, toDebounce])


    const handleSelectSuggestion = async (placeId: string) => {
        if (!placeLibrary) return null;

        console.log(placeId);

        const placeDetail = new placeLibrary.PlacesService(document.createElement("div"));

        // Get Place Name
        const placeDetailRequest: google.maps.places.PlaceDetailsRequest = {
            placeId: placeId,
            fields: ["name"],
            language: "th"
        }

        placeDetail.getDetails(placeDetailRequest, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                if (focusedInput === "from") {
                    searchDispatch({ type: SET_FROM, payload: { from: place?.name || "" } });
                    searchDispatch({ type: SET_FROM_PLACE_ID, payload: { fromPlaceId: placeId } });
                } else if (focusedInput === "to") {
                    searchDispatch({ type: SET_TO, payload: { to: place?.name || "" } });
                    searchDispatch({ type: SET_TO_PLACE_ID, payload: { toPlaceId: placeId } });
                }

                searchDispatch({ type: CLEAR_FOCUSED_INPUT });
            }
        })

        placeSuggestionsDispatch({ type: CLEAR_PLACE_SUGGESTIONS })
    }

    return (
        <Stack divider={<Divider />} p={3}>
            {
                placeSuggestions && placeSuggestions.placeSuggestions.map((place, index) => (
                    <Box key={index} p={2} _hover={{ bgColor: "brand.500", color: "white" }} cursor="pointer" onClick={() => handleSelectSuggestion(place.place_id)}>
                        <Text fontFamily="prompt" fontSize="sm">{place.description}</Text>
                    </Box>
                ))
            }
        </Stack>
    )

}

export default PlaceSuggestion;