import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaWalking } from "react-icons/fa";

type Props = {
    step: google.maps.DirectionsStep
}

const Walking = (props: Props) => {

    const { step } = props;

    return (
        <Flex align="flex-start">
            <Icon w={6} h={6} as={FaWalking} />
            <Text>{Math.floor((step.duration?.value || 0) / 60)}</Text>
        </Flex>
    )
}

export default Walking