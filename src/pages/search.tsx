import logo from '@/assets/logo.svg';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, HStack, Heading, Image, Spinner, Stack, Text } from "@chakra-ui/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function SerchPage() {

    const [loading, setLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

    const options: PositionOptions = {
        enableHighAccuracy: true,
    }

    const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude })
        setLoading(false);
    }

    const error = () => {
        alert('Unable to retrieve your location');
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    }, [])

    if (loading) {
        return (
            <Container maxW="container.sm" display="flex" h="100svh" w="100svw" alignItems="center" justifyContent="center" flexDirection="column" py={5} gap={5}>
                <Spinner size="xl" color="brand.500" />
                <Text fontFamily="prompt" color="gray.500" ml={3}>กำลังค้นหาตำแหน่งปัจจุบันของคุณ</Text>
            </Container>
        )
    }

    const styles: google.maps.MapTypeStyle[] = [
        {
            featureType: "landscape.man_made",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
                {
                    visibility: "simplified"
                }
            ]
        },
        {
            featureType: "poi.business",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        },
        {
            featureType: "poi.park",
            elementType: "labels.text",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        }, {
            featureType: "transit",
            stylers: [
                {
                    visibility: "off"
                }
            ]
        }
    ]

    return (
        <Container maxW="container.sm" display="flex" h="100svh" w="100svw" p={0} position="relative" overflow="hidden">
            <Flex w="full" h="100svh" zIndex={0}>
                <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <Map
                        center={currentLocation}
                        zoom={16}
                        disableDefaultUI={true}
                        styles={styles}
                    >
                        <Marker position={currentLocation} />
                    </Map>
                </APIProvider>
            </Flex>
            <Flex h={20} justify="center" alignItems="center" w="100%" p={5} position="absolute">
                <HamburgerIcon w={8} h={8} color="brand.500" />
                <Image h={12} flex={1} src={logo} alt="WheelBus Logo" />
                <Box w={8} h={8} />
            </Flex>

            <Flex w="100%" position="absolute" bottom={0} px={2.5}>
                <Stack bgColor="brand.500" w="full" borderTopRadius="2xl" p={4} spacing={5}>
                    <Flex bgColor="white" color="brand.500" w="full" p={3} borderRadius="lg" shadow="md" alignItems="center"
                    >
                        <Box w={3} h={3} borderRadius="sm" bgColor="red" />
                        <Heading flex={1} textAlign="center" color="brand.500" size="md" fontWeight="medium">ไปไหนดี</Heading>
                        <Box w={3} h={3} borderRadius="sm" bgColor="transparent" />
                    </Flex>

                    <Stack>
                        <Heading color="white" size="sm" fontWeight="medium">สถานที่โปรด</Heading>

                        <HStack>

                            <Button bgColor="slate" borderRadius="lg" p={3} w="full" leftIcon={<Text>🏠</Text>} shadow="xl">
                                บ้าน
                            </Button>
                            <Button bgColor="slate" borderRadius="lg" p={3} w="full" leftIcon={<Text>💼</Text>} shadow="xl">
                                ที่ทำงาน
                            </Button>
                            <Button bgColor="slate" borderRadius="lg" p={3} w="full" leftIcon={<Text>🏥</Text>} shadow="xl">
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