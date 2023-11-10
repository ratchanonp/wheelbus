import logo from '@/assets/logo.svg';
import { Button, Container, Flex, Heading, Image, Input, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

function LoginPage() {
    return (
        <Container maxW="sm" display="flex" h="100svh" w="100svw" alignItems="center" justifyContent="center" flexDirection="column" py={5}>
            <Flex h={10} justify="center">
                <Image src={logo} alt="WheelBus Logo" />
            </Flex>
            <Flex flex={1} direction="column" align="center" justify="center" w="full" rowGap={5}>
                <Flex direction="column" align="center">
                    <Heading as="h1" size="xl" fontWeight="bold" color="brand.500"> เข้าสู่ระบบ </Heading>
                    <Text fontFamily="prompt" color="gray.500">กรอกเบอร์โทรศัพท์ที่ใช้งาน</Text>
                </Flex>

                <Flex direction="column" gap={5} w="full">
                    <Input type="tel" maxLength={10} w="full" placeholder='เบอร์โทร' bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}} />
                    <Button as={RouterLink} bgColor="brand.500" color="white" w="full" size="lg" to="/search" shadow="md">
                        เข้าสู่ระบบ
                    </Button>
                </Flex>
            </Flex>
            <Flex mt={20}>
                <Text color="gray.500">
                    ยังไม่มีบัญชีใช่ไหม?&nbsp;
                    <Link as={RouterLink} to="/auth/register" color="brand.500" textDecor="underline">
                        สมัครใช้งาน
                    </Link>
                </Text>
            </Flex>
        </Container >
    )
}

export default LoginPage