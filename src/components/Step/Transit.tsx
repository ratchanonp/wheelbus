import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaBus } from "react-icons/fa6";

type Props = {
    step: google.maps.DirectionsStep
}

const Transit = (props: Props) => {

    const { step } = props;

    return (
        <Flex maxW="200px" gap={1} >
            <Icon w={6} h={6} as={FaBus} />
            <Text minW="100px" maxW="100px" noOfLines={1} overflow="hidden" bg="brand.500" color="white" px={2} wordBreak="break-all">
                {step.transit?.line.name}
            </Text>
        </Flex >
    )
}

export default Transit