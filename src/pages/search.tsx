import TopBar from '@/components/TopBar/TopBar';
import { MAP_STYLE } from '@/configs/map.config';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, HStack, Heading, Link, Spinner, Stack, Text } from "@chakra-ui/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function SerchPage() {

    const { location, loading, error } = useCurrentLocation();
    const { latitude, longitude } = location.coords;

    console.log(location)

    const currentLocation: google.maps.LatLngLiteral = useMemo(() => {
        return {
            lat: latitude,
            lng: longitude
        }
    }, [latitude, longitude])

    return (
        <Container maxW="container.sm" display="flex" h="100svh" w="100svw" p={0} position="relative" overflow="hidden">
            <Flex w="full" h="100svh" zIndex={0} justify="center" align="center">
                {loading && (
                    <Flex direction="column" justify="center" align="center" gap={5}>
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
                        >
                            <Marker position={currentLocation} />
                        </Map>
                    </APIProvider>
                )}
                {error && (
                    <Flex direction="column" justify="center" align="center" gap={5}>
                        <WarningTwoIcon w={10} h={10} color="red.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>ไม่สามารถค้นหาตำแหน่งปัจจุบันของคุณได้</Text>
                    </Flex>
                )}
            </Flex>
            <TopBar position="absolute" />
            <Flex w="100%" position="absolute" bottom={0} px={2.5}>
                <Stack bgColor="brand.500" w="full" borderTopRadius="2xl" p={4} spacing={5}>
                    <Link as={RouterLink}
                        _hover={{ textDecoration: "none" }} display="flex" bgColor="white" color="brand.500" w="full" p={3} borderRadius="lg" shadow="md" alignItems="center"
                        to="/routesSearch"
                    >
                        <Box w={3} h={3} borderRadius="sm" bgColor="red" />
                        <Heading flex={1} textAlign="center" color="slate" size="md" fontWeight="medium">ไปที่ไหนดี?</Heading>
                        <Box w={3} h={3} borderRadius="sm" bgColor="transparent" />
                    </Link>

                    <Stack>
                        <Heading color="white" size="sm" fontWeight="medium">สถานที่โปรด</Heading>

                        <HStack>
                            <Button textColor="slate.500" bgColor="white" fontFamily="prompt" fontWeight="medium" borderRadius="lg" p={3} leftIcon={<Text>🏠</Text>} shadow="xl">
                                บ้าน
                            </Button>
                            <Button textColor="slate.500" bgColor="white" fontFamily="prompt" fontWeight="medium" borderRadius="lg" p={3} leftIcon={<Text>💼</Text>} shadow="xl">
                                ที่ทำงาน
                            </Button>
                            <Button textColor="slate.500" bgColor="white" fontFamily="prompt" fontWeight="medium" borderRadius="lg" p={3} leftIcon={<Text>🏥</Text>} shadow="xl">
                                โรงพยาบาล
                            </Button>
                        </HStack>
                    </Stack>
                </Stack>
            </Flex>
        </Container >
    )
}

export default SerchPage