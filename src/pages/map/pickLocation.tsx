import StartMarker from "@/components/CustomMarker/StartMarker"
import { SearchContext, SearchDispatchContext } from "@/contexts/SearchContext"
import useCurrentPosition from "@/hooks/useCurrentLocation"
import { PlaceData } from "@/interfaces/favorite.interface"
import getAddress from "@/utils/Maps/getAddress"
import { WarningTwoIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, Icon, IconButton, Spinner, Stack, Text } from "@chakra-ui/react"
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps"
import { MapEvent } from "node_modules/@vis.gl/react-google-maps/dist/components/map/use-map-events"
import { useContext, useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { Link as RouterLink, useNavigate } from "react-router-dom"

const PickLocatopn = () => {

    const { location, loading: currentLocationLoading, error, getCurrentLocation } = useCurrentPosition();
    const { latitude, longitude } = location.coords;

    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({ lat: latitude, lng: longitude });
    const [currentPlaceData, setCurrentPlaceData] = useState<PlaceData | null>(null);
    const geoCodingLibrary = useMapsLibrary('geocoding');

    const search = useContext(SearchContext);
    const dispatchSearch = useContext(SearchDispatchContext);

    const { focusedInput } = search;

    const navigate = useNavigate();

    useEffect(() => {
        const setCurrentAddress = async () => {
            if (latitude && longitude && geoCodingLibrary) {
                const addressResult = await getAddress({ lat: latitude, lng: longitude }, geoCodingLibrary);

                if (!addressResult) return null;
                const { formatted_address, place_id } = addressResult;
                setCurrentLocation({ lat: latitude, lng: longitude })
                setCurrentPlaceData({ formatted_address, place_id })
            }
        }

        if (!currentLocationLoading && !error)
            setCurrentAddress();

    }, [latitude, longitude, currentLocationLoading, error])

    useEffect(() => {
        getCurrentLocation();
    }, [])


    const handleMapDrag = async (e: MapEvent) => {
        // Get the coordinates of the center of the map
        const { map } = e;
        if (map.getCenter() && geoCodingLibrary) {
            const { lat, lng } = (map.getCenter() as google.maps.LatLng).toJSON()
            const result = await getAddress({ lat: lat, lng: lng }, geoCodingLibrary);
            if (result) {
                setCurrentPlaceData(result)
                setCurrentLocation({ lat, lng })
                console.log("center", { lat, lng })
            }
        }
    }

    const handleSelectedLocation = () => {
        if (!currentPlaceData) return null;
        if (focusedInput === "from") {
            dispatchSearch({ type: "SET_FROM", payload: { from: currentPlaceData.formatted_address } })
            dispatchSearch({ type: "SET_FROM_PLACE_ID", payload: { fromPlaceId: currentPlaceData.place_id } })
        } else if (focusedInput === "to") {
            dispatchSearch({ type: "SET_TO", payload: { to: currentPlaceData.formatted_address } })
            dispatchSearch({ type: "SET_TO_PLACE_ID", payload: { toPlaceId: currentPlaceData.place_id } })
        }

        dispatchSearch({ type: "CLEAR_FOCUSED_INPUT" })

        navigate("/routesSearch")
    }

    return (
        <Flex w="100svw" h="100svh" direction="column" position="relative">
            <Stack align="start" p={5} shadow="md">
                <IconButton
                    justifyContent="flex-start"
                    icon={<Icon
                        as={FaArrowLeft}
                        color="slate"
                        w={4}
                        h={4}
                    />}
                    as={RouterLink}
                    to="/routesSearch"
                    aria-label="back"
                    size="sm"
                    variant="none"
                />
                <Heading flex={1} as="h1" fontWeight="semibold" size="lg" color="slate">เลือกบนแผนที่</Heading>
            </Stack>
            <Flex w="full" flex={1} position="relative">
                {currentLocationLoading && (
                    <Flex w="full" direction="column" justify="center" align="center" gap={5}>
                        <Spinner size="xl" color="brand.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>กำลังค้นหาตำแหน่งปัจจุบันของคุณ</Text>
                    </Flex>
                )}
                {!currentLocationLoading && !error && (<>
                    <Map
                        center={currentLocation}
                        zoom={16}
                        disableDefaultUI={true}
                        mapId="19388afc054dab84"
                        onDragend={handleMapDrag}
                        onZoomChanged={handleMapDrag}
                    >
                    </Map>
                    <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                        <StartMarker />
                    </Box>
                </>
                )}
                {error && (
                    <Flex direction="column" justify="center" align="center" gap={5} w="full">
                        <WarningTwoIcon w={10} h={10} color="red.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>ไม่สามารถค้นหาตำแหน่งปัจจุบันของคุณได้</Text>
                    </Flex>
                )}
            </Flex>

            <Button position="absolute" bgColor="white" w="90svw" bottom={8} size="lg" mx="auto" left={0} right={0} shadow="md" isDisabled={currentLocationLoading} onClick={handleSelectedLocation}>
                เลือกตำแหน่งนี้
            </Button>
        </Flex >
    )
}

export default PickLocatopn