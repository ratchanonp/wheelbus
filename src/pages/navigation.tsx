import Direction from "@/components/Direction/Direction";
import { Box, Flex, Heading, Icon, IconButton } from "@chakra-ui/react";
import { Map } from "@vis.gl/react-google-maps";
import { FaArrowLeft } from "react-icons/fa6";

import { Link as RouterLink } from "react-router-dom";

const NavigationPage = () => {

    return (
        <Flex direction="column" h="100svh">
            < Flex w="full" align="center" p={3} >
                <IconButton
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
                    variant="ghost"
                />
                <Heading textAlign="center" flex={1} as="h1" fontWeight="medium" size="md" color="slate">วิธีการเดินทาง</Heading>
                <Box w={8} h={8} />
            </Flex >
            <Map
                zoom={16}
                disableDefaultUI={true}
                mapId="19388afc054dab84"
            >
                <Direction />
            </Map>
        </Flex >
    )
}

export default NavigationPage