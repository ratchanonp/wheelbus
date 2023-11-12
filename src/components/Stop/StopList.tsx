import { Box, Flex, Stack, Text } from "@chakra-ui/react";

interface Props {
    stopName: string
}

const StopList = (props: Props) => {

    const { stopName } = props;

    return (
        <Flex px={3}>
            <Flex w="50px" justify="right" align="center">
                {/* Draw Vertical Line */}
                <Box w="5px" h="full" bgColor="brand.500" />
                <Box w="10px" h="5px" bgColor="brand.500" mr="15px" />
            </Flex>
            <Stack py={3} >
                <Text color="slate.500" fontFamily="prompt" fontWeight="medium" fontSize="sm">{stopName}</Text>
            </Stack>
        </Flex>
    )
}

export default StopList