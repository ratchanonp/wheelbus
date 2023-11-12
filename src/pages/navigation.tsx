import CustomMarker from "@/components/CustomMarker/CustomMarker";
import StartMarker from "@/components/CustomMarker/StartMarker";
import StopMarker from "@/components/CustomMarker/StopMarker";
import Direction from "@/components/Direction/Direction";
import StopList from "@/components/Stop/StopList";
import { MAP_STYLE } from "@/configs/map.config";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Icon, IconButton, Spinner, Stack, Text } from "@chakra-ui/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaArrowLeft, FaBus } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const NavigationPage = () => {

    const { location, loading, error } = useCurrentLocation();
    const { latitude, longitude } = location.coords;

    const currentLocation: google.maps.LatLngLiteral = useMemo(() => {
        return {
            lat: latitude,
            lng: longitude
        }
    }, [latitude, longitude])

    const origin: google.maps.LatLngLiteral = { lat: 13.754938, lng: 100.532772 };
    const destination: google.maps.LatLngLiteral = { lat: 13.735961, lng: 100.529266 }

    const stopList: string[] = [
        "ราชเทวี (ทางออก 2)",
        "ตรงข้ามมาบุญครอง",
        "โรงเรียนเตรียมอุดมศึกษา",
        "จุฬาฯ​ (ลานพระบรมรูป)",
    ];

    return (
        <Flex direction="column" h="100svh">
            <Flex w="full" align="center" p={3}>
                <IconButton
                    icon={<Icon
                        as={FaArrowLeft}
                        color="slate"
                        w={4}
                        h={4}
                    />}
                    as={RouterLink}
                    to="/search"
                    aria-label="back"
                    size="sm"
                    variant="ghost"
                />
                <Heading textAlign="center" flex={1} as="h1" fontWeight="medium" size="md" color="slate">วิธีการเดินทาง</Heading>
                <Box w={8} h={8} />
            </Flex>
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
                            <Direction origin={origin} destination={destination} />
                            <CustomMarker position={origin} pin={<StartMarker />} />
                            <CustomMarker position={destination} pin={<StopMarker />} />
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
            <Stack p={5} pb={0} spacing={5} maxH="40svh" >
                <Flex align="center" justify="space-between" w="full">
                    <Flex>
                        <Icon
                            as={FaBus}
                            color="brand.500"
                            w={6}
                            h={6}
                        />
                        <Heading ml={3} as="h2" fontWeight="bold" size="md" color="brand.500">36</Heading>
                    </Flex>

                    <Text color="slate.500">
                        6 ป้าย
                    </Text>
                </Flex>
                <Stack spacing={0} overflowY="scroll" pb={5}>
                    <Flex border="3px solid" borderColor="origin" p={3} align="center" borderRadius="lg" shadow="md">
                        <Flex w="50px">
                            <StartMarker />
                        </Flex>
                        <Stack gap={0}>
                            <Text fontFamily="prompt" color="gray.500" fontSize="xs">ป้าย (ต้นทาง)</Text>
                            <Heading fontSize="lg">กรมปศุสัตว์</Heading>
                        </Stack>
                    </Flex>
                    <Flex px={3}>
                        <Flex w="50px" justify="right" align="center">
                            {/* Draw Vertical Line */}
                            <Box w="5px" h="full" bgColor="brand.500" />
                            <Box w="10px" h="5px" bgColor="brand.500" mr="15px" />
                        </Flex>
                        <Stack spacing={1} py={5} >
                            <Text fontFamily="prompt" color="gray.500" fontSize="xs">นั่งรถเมล์</Text>
                            <Flex align="center" gap={1}>
                                <Flex align="center">
                                    <Icon
                                        as={FaBus}
                                        color="brand.500"
                                        w="20px"
                                        h="20px"
                                    />
                                    <Heading ml={2} as="h2" fontWeight="bold" size="lg" color="brand.500">36</Heading>
                                </Flex>

                                <Icon h={3} as={BsArrowRight} />
                                <Text fontSize="sm">สี่พระยา</Text>

                            </Flex>
                            <Text bgColor="brand.500" textAlign="center" color="white" fontSize="smaller" w="fit-content" px={3}>5 ป้าย</Text>
                        </Stack>
                    </Flex>
                    {stopList.map((stop, index) => (<StopList key={index} stopName={stop} />))}
                    <Flex border="3px solid" borderColor="destination" p={3} align="center" borderRadius="lg" shadow="md">
                        <Flex w="50px">
                            <StopMarker />
                        </Flex>
                        <Stack gap={0}>
                            <Text fontFamily="prompt" color="gray.500" fontSize="xs">ป้ายรถเมล์</Text>
                            <Heading fontSize="lg">จุฬาฯ (คณะวิทยาศาสตร์)</Heading>
                        </Stack>
                    </Flex>
                </Stack>
            </Stack>
        </Flex >
    )
}

export default NavigationPage