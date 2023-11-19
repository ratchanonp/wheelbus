/* eslint-disable react-hooks/exhaustive-deps */
import StartMarker from "@/components/CustomMarker/StartMarker"
import useCurrentLocation from "@/hooks/useCurrentLocation"
import { CloseIcon, WarningTwoIcon } from "@chakra-ui/icons"
import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Spinner, Stack, Text, useDisclosure } from "@chakra-ui/react"
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps"
import { MapEvent } from "node_modules/@vis.gl/react-google-maps/dist/components/map/use-map-events"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { Link as RouterLink } from "react-router-dom"

const FavoriteAddPage = () => {

    const { location, loading, error } = useCurrentLocation();
    const { latitude, longitude } = location.coords;

    const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral>({ lat: latitude, lng: longitude });
    const [address, setAddress] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    const geoCodingLibrary = useMapsLibrary('geocoding');


    useEffect(() => {
        const setCurrentAddress = async () => {
            if (latitude && longitude) {
                const address = await getAddress({ lat: latitude, lng: longitude });
                setCurrentLocation({ lat: latitude, lng: longitude })
                setAddress(address || "")
            }
        }

        if (!loading && !error)
            setCurrentAddress();

    }, [latitude, longitude, loading, error])


    const handleMapDrag = async (e: MapEvent) => {
        // Get the coordinates of the center of the map
        const { map } = e;
        if (map.getCenter()) {
            const { lat, lng } = (map.getCenter() as google.maps.LatLng).toJSON()
            setCurrentLocation({ lat, lng })
            // Get the address of the center of the map
            const address = await getAddress(currentLocation);
            setAddress(address || "")
        }
    }

    const getAddress = async (location: google.maps.LatLngLiteral): Promise<string | null> => {

        if (!geoCodingLibrary) return null;
        const geoCoder = new geoCodingLibrary.Geocoder();

        const geoCoderRequest: google.maps.GeocoderRequest = {
            location: location,
            language: "th",
        }

        const response = await geoCoder.geocode(geoCoderRequest);

        if (response.results.length > 0) {
            return response.results[0].formatted_address
        }

        return null;
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
                <InputGroup>
                    <InputLeftElement>
                        <Icon as={FaMagnifyingGlass} color="gray.500" w={4} h={4} />
                    </InputLeftElement>
                    <Input type="text" placeholder="ค้นหา/เลือกป้ายบนแผนที่" value={address} onChange={(e) => setAddress(e.target.value)} />
                </InputGroup>
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

            <Button position="absolute" bgColor="white" w="90svw" bottom={8} size="lg" mx="auto" left={0} right={0} shadow="md" onClick={onOpen}>
                เพิ่มสถานที่โปรด
            </Button>

            {/* Drawer */}
            <Drawer
                isOpen={isOpen}
                placement="bottom"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>

                    <DrawerHeader display="flex" alignItems="center" justifyContent="space-between">
                        <Heading color="slate">เพิ่มสถานที่โปรด</Heading>
                        <IconButton icon={<CloseIcon />} aria-label="Close Drawer" size="sm" onClick={onClose} />
                    </DrawerHeader>
                    <DrawerBody>
                        <Text>{address}</Text>
                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </Flex >
    )
}

export default FavoriteAddPage