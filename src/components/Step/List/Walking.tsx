import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaWalking } from "react-icons/fa";

type Props = {
    step: google.maps.DirectionsStep
}

const Walking = (props: Props) => {

    const { step } = props;
    const { instructions, distance } = step

    return (
        <Flex align="center" gap={5} w="fulll">
            <Flex>
                <Icon w={4} h={4} as={FaWalking} />
            </Flex>
            <Flex w="full" h="full" borderBottom="2px solid" borderColor="gray.200" py={3}>
                <Text fontSize="x-small">{instructions} ({distance?.text})</Text>
            </Flex>
        </Flex>
    )
}

export default Walking