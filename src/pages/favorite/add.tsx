import { MAP_STYLE } from "@/configs/map.config"
import useCurrentLocation from "@/hooks/useCurrentLocation"
import { WarningTwoIcon } from "@chakra-ui/icons"
import { Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftElement, Spinner, Stack, Text } from "@chakra-ui/react"
import { APIProvider, Map } from "@vis.gl/react-google-maps"
import { useMemo } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { Link as RouterLink } from "react-router-dom"

const FavoriteAddPage = () => {

    const { location, loading, error } = useCurrentLocation();
    const { latitude, longitude } = location.coords;

    const currentLocation: google.maps.LatLngLiteral = useMemo(() => {
        return {
            lat: latitude,
            lng: longitude
        }
    }, [latitude, longitude])

    return (
        <Flex w="100svw" h="100svh" direction="column">
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
                    variant="ghost"
                />
                <Heading flex={1} as="h1" fontWeight="semibold" size="lg" color="slate">เพิ่มสถานที่โปรด</Heading>
                <InputGroup>
                    <InputLeftElement>
                        <Icon as={FaMagnifyingGlass} color="gray.500" w={4} h={4} />
                    </InputLeftElement>
                    <Input type="text" placeholder="ค้นหา/เลือกป้ายบนแผนที่" />
                </InputGroup>
            </Stack>
            <Flex w="full" flex={1}>
                {loading && (
                    <Flex w="full" direction="column" justify="center" align="center" gap={5}>
                        <Spinner size="xl" color="brand.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>กำลังค้นหาตำแหน่งปัจจุบันของคุณ</Text>
                    </Flex>
                )}
                {!loading && !error && (
                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <Map
                            center={currentLocation}
                            zoom={16}
                            disableDefaultUI={true}
                            styles={MAP_STYLE}
                            mapId="19388afc054dab84"
                        >
                        </Map>
                    </APIProvider>
                )}
                {error && (
                    <Flex direction="column" justify="center" align="center" gap={5} w="full">
                        <WarningTwoIcon w={10} h={10} color="red.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>ไม่สามารถค้นหาตำแหน่งปัจจุบันของคุณได้</Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default FavoriteAddPage