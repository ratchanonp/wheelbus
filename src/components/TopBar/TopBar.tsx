import logo from '@/assets/logo.svg';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, FlexProps, Image } from '@chakra-ui/react';

function TopBar(props: FlexProps) {
    return (
        <Flex h={20} justify="center" alignItems="center" w="100%" p={5} {...props}>
            <HamburgerIcon w={8} h={8} color="brand.500" />
            <Image h={12} flex={1} src={logo} alt="WheelBus Logo" />
            <Box w={8} h={8} />
        </Flex>
    )
}

export default TopBar