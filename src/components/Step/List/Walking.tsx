import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaWalking } from "react-icons/fa";

type Props = {
    step: google.maps.DirectionsStep
}

const Walking = (props: Props) => {

    const { step } = props;
    const { instructions, distance } = step

    return (
        <Flex align="center" gap={5}>
            <Flex>
                <Icon w={6} h={6} as={FaWalking} />
            </Flex>
            <Flex>
                <Text fontSize="xs">{instructions} ({distance?.text})</Text>
                <Text></Text>
            </Flex>
        </Flex>
    )
}

export default Walking