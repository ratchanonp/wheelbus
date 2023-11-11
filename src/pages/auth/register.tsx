import logo from '@/assets/logo.svg';
import { Button, Container, Flex, Heading, Image, Input, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';


function RegisterPage() {
    return (
        <Container maxW="container.sm" display="flex" h="100svh" w="100svw" alignItems="center" justifyContent="center" flexDirection="column" py={5}>
            <Flex h={10} justify="center">
                <Image src={logo} alt="WheelBus Logo" />
            </Flex>
            <Flex flex={1} direction="column" align="center" justify="center" w="full" rowGap={5}>
                <Flex direction="column" align="center">
                    <Heading as="h1" size="xl" fontWeight="bold" color="brand.500"> ลงทะเบียน </Heading>
                    <Text fontFamily="prompt" color="gray.500">กรอกข้อมูลด้านล่างเพื่อสมัครใช้งาน</Text>
                </Flex>

                <Flex direction="column" gap={5} w="full">
                    <Input
                        id="firstname" name="firstname" type="text" placeholder='ชื่อ' autoComplete='given-name'
                        w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                    />
                    <Input
                        id="lastname" name="lastname" type="text" placeholder='นามสกุล' autoComplete='family-name'
                        w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                    />
                    <Input
                        id="email" name="email" type="email" placeholder='อีเมล' autoComplete='email'
                        w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                    />
                    <Input
                        id="tel" name="tel" type="tel" maxLength={10} placeholder='เบอร์โทร' autoComplete='tel'
                        w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                    />
                    <Button as={RouterLink} bgColor="brand.500" color="white" w="full" size="lg" to="/search" shadow="md">
                        ลงทะเบียนใช้งาน
                    </Button>
                </Flex>
            </Flex>
            <Flex mt={20}>
                <Text color="gray.500">
                    มีบัญชีอยู่แล้วใช่ไหม?&nbsp;
                    <Link as={RouterLink} to="/auth/login" color="brand.500" textDecor="underline">
                        เข้าสู่ระบบ
                    </Link>
                </Text>
            </Flex>
        </Container >
    )
}

export default RegisterPage