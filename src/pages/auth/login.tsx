import logo from '@/assets/logo.svg';
import { auth } from '@/firebase/firebase';
import { Button, Container, Flex, FormControl, Heading, Image, Input, Link, Text, useToast } from "@chakra-ui/react";
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function LoginPage() {

    const toast = useToast();
    const navigate = useNavigate();

    const [subbmitting, setSubmitting] = useState(false);

    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setSubmitting(true);


        const data = {
            email: email.current?.value ?? '',
            password: password.current?.value ?? '',
        }

        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log(result);
            navigate('/search')
        } catch (error) {
            toast({
                title: "เกิดข้อผิดพลาด",
                description: (error as AuthError).message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Container maxW="container.sm" display="flex" h="100svh" w="100svw" alignItems="center" justifyContent="center" flexDirection="column" py={5}>
            <Flex h={10} justify="center">
                <Image src={logo} alt="WheelBus Logo" />
            </Flex>
            <Flex flex={1} direction="column" align="center" justify="center" w="full" rowGap={5}>
                <Flex direction="column" align="center">
                    <Heading as="h1" size="xl" fontWeight="bold" color="brand.500"> เข้าสู่ระบบ </Heading>
                    <Text fontFamily="prompt" color="gray.500">ยินดีต้อนรับกลับมาอีกครั้ง</Text>
                </Flex>

                <FormControl as="form" onSubmit={handleLogin} display="flex" flexDir="column" gap={5} w="full">
                    <Input required type="email" id="email" name="email" ref={email} autoComplete='current-email' w="full" placeholder='อีเมล์' bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}} />
                    <Input required type="password" id="password" name="password" ref={password} autoComplete='current-password' w="full" placeholder='รหัสผ่าน' bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}} />
                    <Button isLoading={subbmitting} loadingText="กำลังเข้าสู่ระบบ" type="submit" bgColor="brand.500" color="white" w="full" size="lg" shadow="md" _hover={{ bgColor: "brand" }}>
                        เข้าสู่ระบบ
                    </Button>
                </FormControl>
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