import logo from '@/assets/logo.svg';
import CustomMarker from '@/components/CustomMarker/CustomMarker';
import StartMarker from '@/components/CustomMarker/StartMarker';
import SideDrawerContent from '@/components/SideDrawer/SideDrawer';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import { HamburgerIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, Heading, IconButton, Image, Link, Spinner, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Map } from "@vis.gl/react-google-maps";
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function SerchPage() {

    const { location, loading, error } = useCurrentLocation();
    const { latitude, longitude } = location.coords;

    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log(location)

    const currentLocation: google.maps.LatLngLiteral = useMemo(() => {
        return {
            lat: latitude,
            lng: longitude
        }
    }, [latitude, longitude])

    return (
        <Container maxW="container.sm" display="flex" h="100svh" w="100svw" p={0} position="relative" overflow="hidden">
            <SideDrawerContent onClose={onClose} isOpen={isOpen} />
            <Flex w="full" h="100svh" zIndex={0} justify="center" align="center">
                {loading && (
                    <Flex direction="column" justify="center" align="center" gap={5}>
                        <Spinner size="xl" color="brand.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>กำลังค้นหาตำแหน่งปัจจุบันของคุณ</Text>
                    </Flex>
                )}
                {!loading && !error && (
                    <Map
                        center={currentLocation}
                        zoom={16}
                        disableDefaultUI={true}
                        mapId="19388afc054dab84"
                    >
                        <CustomMarker position={currentLocation} pin={<StartMarker />} />
                    </Map>
                )}
                {error && (
                    <Flex direction="column" justify="center" align="center" gap={5}>
                        <WarningTwoIcon w={10} h={10} color="red.500" />
                        <Text fontFamily="prompt" color="gray.500" ml={3}>ไม่สามารถค้นหาตำแหน่งปัจจุบันของคุณได้</Text>
                    </Flex>
                )}
            </Flex>
            <Flex h={20} justify="center" alignItems="center" w="100%" p={5} pos="absolute">
                <IconButton variant="ghost" icon={<HamburgerIcon w={6} h={6} />} aria-label="Open Side Drawer" color="brand.500" onClick={onOpen} />
                <Image h={12} flex={1} src={logo} alt="WheelBus Logo" />
                <Box w={6} h={6} />
            </Flex>
            <Flex w="100%" position="absolute" bottom={0} px={2.5}>
                <Stack bgColor="brand.500" w="full" borderTopRadius="2xl" p={4} spacing={5}>
                    <Link as={RouterLink}
                        _hover={{ textDecoration: "none" }} display="flex" bgColor="white" color="brand.500" w="full" p={3} borderRadius="lg" shadow="md" alignItems="center"
                        to="/routesSearch"
                    >
                        <Box w={3} h={3} borderRadius="sm" bgColor="red" />
                        <Heading flex={1} textAlign="center" color="slate.500" size="md" fontWeight="medium">ไปที่ไหนดี?</Heading>
                        <Box w={3} h={3} borderRadius="sm" bgColor="transparent" />
                    </Link>
                </Stack>
            </Flex>
        </Container >
    )
}

export default SerchPage