/* eslint-disable react-hooks/exhaustive-deps */
import StartMarker from "@/components/CustomMarker/StartMarker"
import AddFavoriteDrawer from "@/components/Favorite/AddFavoriteDrawer"
import useCurrentLocation from "@/hooks/useCurrentLocation"
import getAddress from "@/utils/Maps/getAddress"
import { WarningTwoIcon } from "@chakra-ui/icons"
import { Box, Button, Divider, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { useDebounce } from "@uidotdev/usehooks"
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps"
import { MapEvent } from "node_modules/@vis.gl/react-google-maps/dist/components/map/use-map-events"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaMagnifyingGlass, FaX } from "react-icons/fa6"
import { Link as RouterLink } from "react-router-dom"

const FavoriteAddPage = () => {

    const { location, loading, error } = useCurrentLocation();
    const { latitude, longitude } = location.coords;

    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({ lat: latitude, lng: longitude });
    const [currentPlaceId, setCurrentPlaceId] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const debounceAddress = useDebounce(address, 300);
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
    const [placeSuggestions, setPlaceSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const geoCodingLibrary = useMapsLibrary('geocoding');
    const placeLibrary = useMapsLibrary('places');


    useEffect(() => {
        const setCurrentAddress = async () => {
            if (latitude && longitude && geoCodingLibrary) {
                const addressResult = await getAddress({ lat: latitude, lng: longitude }, geoCodingLibrary);

                if (!addressResult) return null;
                const { formatted_address, place_id } = addressResult;
                setCurrentLocation({ lat: latitude, lng: longitude })
                setAddress(formatted_address || "")
                setCurrentPlaceId(place_id || "")
            }
        }

        if (!loading && !error)
            setCurrentAddress();

    }, [latitude, longitude, loading, error])

    const handlePlaceChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }

    useEffect(() => {
        const getAddressFromPlace = async () => {
            if (!placeLibrary) return null;

            if (debounceAddress) {
                setLoadingAddress(true);

                const prediction = new placeLibrary.AutocompleteService();

                const predictionRequest: google.maps.places.AutocompletionRequest = {
                    input: debounceAddress,
                    language: "th",
                    componentRestrictions: {
                        country: "th"
                    }
                }

                const response = await prediction.getPlacePredictions(predictionRequest);

                if (response) {
                    setPlaceSuggestions(response.predictions);
                }



                setLoadingAddress(false);
            }
        }

        getAddressFromPlace();
    }, [debounceAddress])


    const handleMapDrag = async (e: MapEvent) => {
        // Get the coordinates of the center of the map
        const { map } = e;
        if (map.getCenter() && geoCodingLibrary) {
            const { lat, lng } = (map.getCenter() as google.maps.LatLng).toJSON()
            setCurrentLocation({ lat, lng })
            // Get the address of the center of the map
            const address = await getAddress(currentLocation, geoCodingLibrary);
            setAddress(address?.formatted_address || "")
            setCurrentPlaceId(address?.place_id || "")
        }
    }

    const handleSelectSuggestion = async (placeId: string) => {
        if (!geoCodingLibrary) return null;

        const geoCoder = new geoCodingLibrary.Geocoder();

        const geoCoderRequest: google.maps.GeocoderRequest = {
            placeId: placeId,
            language: "th",
        }

        const response = await geoCoder.geocode(geoCoderRequest);

        if (response.results.length > 0 && geoCodingLibrary) {
            const { lat, lng } = response.results[0].geometry.location.toJSON();
            setCurrentLocation({ lat, lng })
            const address = await getAddress({ lat, lng }, geoCodingLibrary);
            setAddress(address?.formatted_address || "")
            setCurrentPlaceId(address?.place_id || "")
        }

        setPlaceSuggestions([]);

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
                    to="/favorites"
                    aria-label="back"
                    size="sm"
                    variant="none"
                />
                <Heading flex={1} as="h1" fontWeight="semibold" size="lg" color="slate">เพิ่มสถานที่โปรด</Heading>
                <Box position="relative" w="full">

                    <InputGroup >
                        <InputLeftElement>
                            <Icon as={FaMagnifyingGlass} color="gray.500" w={4} h={4} />
                        </InputLeftElement>
                        <Input type="text" placeholder="ค้นหา/เลือกป้ายบนแผนที่" value={address} onChange={handlePlaceChanged} />
                        <InputRightElement>
                            {loadingAddress ? <Spinner size="sm" color="brand.500" /> : <Icon as={FaX} color="gray.500" w={4} h={4} onClick={() => setAddress("")} />}
                        </InputRightElement>
                    </InputGroup>

                    {/* Place Suggestion */}
                    {
                        placeSuggestions && placeSuggestions.length > 0 && (

                            <Stack divider={<Divider />} position="absolute" top={10} left={0} right={0} zIndex={1} bgColor="white" shadow="md" borderRadius="md" p={3} mt={2}>
                                {
                                    placeSuggestions && placeSuggestions.map((place, index) => (
                                        <Box key={index} p={2} _hover={{ bgColor: "brand.500", color: "white" }} cursor="pointer" onClick={() => handleSelectSuggestion(place.place_id)}>
                                            <Text fontFamily="prompt" fontSize="sm">{place.description}</Text>
                                        </Box>
                                    ))
                                }
                            </Stack>)}
                </Box>

            </Stack>
            <Flex w="full" flex={1} position="relative">
                {loading && (
                    <Flex w="full" direction="column" justify="center" align="center" gap={5}>
                        <Spinner size="xl" color="brand.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>กำลังค้นหาตำแหน่งปัจจุบันของคุณ</Text>
                    </Flex>
                )}
                {!loading && !error && (<>
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

            <Button position="absolute" bgColor="white" w="90svw" bottom={8} size="lg" mx="auto" left={0} right={0} shadow="md" onClick={onOpen} isDisabled={loading || loadingAddress}>
                เพิ่มสถานที่โปรด
            </Button>

            {/* Drawer */}
            <AddFavoriteDrawer isOpen={isOpen} onClose={onClose} address={address} placeId={currentPlaceId} currentLocation={currentLocation} />
        </Flex >
    )
}

export default FavoriteAddPage