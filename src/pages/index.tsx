import logo from '@/assets/logo.svg';
import { Button, Container, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";

import { Link as RouterLink } from 'react-router-dom';

function HomePage() {

    return (
        <Container maxW="sm" display="flex" h="100svh" w="100svw" alignItems="center" justifyContent="center" flexDirection="column" py={5}>
            <Flex flex={1} direction="column" align="center" justify="center">
                <Image src={logo} alt="WheelBus Logo" />
                <Heading color="gray" as="h1" size="sm" fontWeight="light"> WheelBus </Heading>
            </Flex>

            <Flex direction="column" gap={5} w="full" alignItems="center">
                <Button as={RouterLink} bgColor="brand.500" color="white" w="full" size="lg" to="/auth/register" shadow="md">
                    ลงทะเบียนใช้งาน
                </Button>

                <Text color="gray.500">
                    มีบัญชีอยู่แล้วใช่ไหม?&nbsp;
                    <Link as={RouterLink} to="/auth/login" color="brand.500" textDecor="underline">
                        เข้าสู่ระบบ
                    </Link>
                </Text>
            </Flex>
        </Container>
    )
}

export default HomePage