import StepDetail from "@/components/Step/StepDetail";
import { DirectionRendererContext, DirectionRendererDispatchContext } from "@/contexts/RouteContext";
import useGetDirection from "@/hooks/useGetDirection";
import { Box, Circle, Divider, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaChevronRight, FaLocationDot } from "react-icons/fa6";
import { MdSwapVert } from "react-icons/md";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const RouteSearchPage = () => {

    // Input State
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    const fromDebounce = useDebounce(from, 300);
    const toDebounce = useDebounce(to, 300);

    const [fromPlaceId, setFromPlaceId] = useState<string | undefined>(undefined);
    const [toPlaceId, setToPlaceId] = useState<string | undefined>(undefined);

    const [fieldFocus, setFieldFocus] = useState<"from" | "to" | undefined>(undefined);

    const placeLibrary = useMapsLibrary("places");
    const [placeSuggestions, setPlaceSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);

    const { direction, getDirection } = useGetDirection();

    const dispatch = useContext(DirectionRendererDispatchContext);
    const directionRenderer = useContext(DirectionRendererContext);

    const navigate = useNavigate();


    useEffect(() => {
        const placeSuggesttions = async () => {
            if (!placeLibrary) return null;
            if (fieldFocus === undefined) return null;

            if (fromDebounce || toDebounce) {
                const prediction = new placeLibrary.AutocompleteService();

                const predictionRequest: google.maps.places.AutocompletionRequest = {
                    input: fieldFocus === "from" ? fromDebounce : toDebounce,
                    language: "th",
                    componentRestrictions: {
                        country: "th"
                    }
                }

                prediction.getPlacePredictions(predictionRequest, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        setPlaceSuggestions(results || []);
                    }
                })
            }
        }

        placeSuggesttions();
    }, [fromDebounce, toDebounce])

    useEffect(() => {
        if (fromPlaceId && toPlaceId) {
            getDirection(fromPlaceId, toPlaceId);
        }
    }, [fromPlaceId, toPlaceId])

    useEffect(() => {
        if (direction) {
            const option: google.maps.DirectionsRendererOptions = {
                directions: direction,
            }

            console.log("set option", option);

            dispatch({
                type: "SET_DIRECTION",
                payload: option
            })

            console.log("directionRenderer", directionRenderer);
        }
    }, [direction])


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
                if (fieldFocus === "from") {
                    setFrom(place?.name || "");
                    setFromPlaceId(placeId);
                } else if (fieldFocus === "to") {
                    setTo(place?.name || "");
                    setToPlaceId(placeId);
                }
                setFieldFocus(undefined);
            }
        })





        setPlaceSuggestions([]);
    }

    const handleSelectionRouteOption = (routeIndex: number) => {
        if (!direction) return null;

        const option: google.maps.DirectionsRendererOptions = {
            routeIndex: routeIndex,
        }

        dispatch({
            type: "PICK_DIRECTION_INDEX",
            payload: option
        })

        navigate("/navigation");
    }

    return (
        <Flex direction="column" h="100svh">
            <Stack bgColor="brand.500" p={3} pb={6} rowGap={3}>
                <Flex w="full" align="center">
                    <IconButton
                        icon={<Icon
                            as={FaArrowLeft}
                            color="white"
                            w={4}
                            h={4}
                        />}
                        as={RouterLink}
                        to="/search"
                        aria-label="back"
                        size="sm"
                        variant="ghost"
                    />
                    <Heading textAlign="center" flex={1} as="h1" fontWeight="medium" size="md" color="white">ค้นหาเส้นทาง</Heading>
                    <Box w={8} h={8} />
                </Flex>
                <Flex w="full" gap={2} pl={3}>
                    <Stack flex={1}>
                        <Flex align="center" gap={3}>
                            <Circle size={3} bgColor="blue.500" shadow="xl" />
                            <InputGroup>
                                <InputLeftElement><Text fontFamily="prompt" justifyContent="end" fontSize="smaller" textColor="gray">จาก</Text></InputLeftElement>
                                <Input
                                    bgColor="white" type="text" borderLeft="none" placeholder="เริ่มจากที่ไหน" fontFamily="prompt" color="gray" _focusVisible={{ border: "none" }}
                                    value={from}
                                    onChange={(e) => { e.target.value !== from && setFrom(e.target.value) }}
                                    onFocus={() => setFieldFocus("from")}
                                />
                            </InputGroup>
                        </Flex>
                        <Flex align="center" gap={3}>
                            <Box w={3} h={3} bgColor="red.500" borderRadius="2px" shadow="xl" />
                            <InputGroup>
                                <InputLeftElement><Text fontFamily="prompt" justifyContent="end" fontSize="smaller" textColor="gray">ถึง</Text></InputLeftElement>
                                <Input
                                    bgColor="white" type="text" borderLeft="none" placeholder="ไปที่ไหนดี" fontFamily="prompt" color="gray" _focusVisible={{ border: "none" }}
                                    value={to}
                                    onChange={(e) => { e.target.value !== to && setTo(e.target.value) }}
                                    onFocus={() => setFieldFocus("to")}
                                />
                            </InputGroup>
                        </Flex>
                    </Stack>
                    <Flex align="center">
                        <IconButton
                            icon={<Icon
                                as={MdSwapVert}
                                color="white"
                                w={6} h={6}
                            />}
                            aria-label="swap"
                            size="md"
                            variant="ghost"
                        />
                    </Flex>
                </Flex>
            </Stack>
            <Flex flex={1} direction="column">
                {fieldFocus && (
                    <Stack p={5} spacing={5} fontFamily="prompt">
                        <Flex justify="space-between">
                            <Heading size="md" fontWeight="semibold">เลือกบนแผนที่</Heading>
                            <Icon as={FaLocationDot} color="slate" w={4} h={4} />
                        </Flex>
                    </Stack>)}
                <Stack p={3}>
                    {placeSuggestions && placeSuggestions.length > 0 && (
                        <Stack divider={<Divider />} >
                            {
                                placeSuggestions && placeSuggestions.map((place, index) => (
                                    <Box key={index} p={2} _hover={{ bgColor: "brand.500", color: "white" }} cursor="pointer" onClick={() => handleSelectSuggestion(place.place_id)}>
                                        <Text fontFamily="prompt" fontSize="sm">{place.description}</Text>
                                    </Box>
                                ))
                            }
                        </Stack>
                    )}
                    {!fieldFocus && direction && direction.routes && direction.routes.length > 0 && (
                        <Stack p={3} divider={<Divider />} spacing={3}>
                            {direction?.routes.map((route, index) => {
                                const { legs } = route;
                                const data = legs[0];

                                const { duration, steps, departure_time, arrival_time } = data;

                                return (
                                    <Flex key={index} gap={5} direction="column" onClick={() => handleSelectionRouteOption(index)} cursor="pointer">
                                        <Flex mr={2} flexWrap={"wrap"} gap={2}>
                                            {steps.map((step, index) => {
                                                return (
                                                    <>
                                                        <StepDetail key={index} step={step} />
                                                        {index !== steps.length - 1 && (
                                                            <Icon as={FaChevronRight} color="slate" w={4} h={4} />
                                                        )}
                                                    </>
                                                )
                                            })}
                                        </Flex>
                                        <Flex justifyContent="space-between">
                                            <Text>{departure_time?.text} - {arrival_time?.text}</Text>
                                            <Text>{duration?.text}</Text>
                                        </Flex>
                                    </Flex>
                                )
                            })}
                        </Stack>
                    )}
                </Stack>
            </Flex>

        </Flex>
    )
}

export default RouteSearchPage