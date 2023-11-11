import logo from '@/assets/logo.svg';
import { auth } from '@/firebase/firebase';
import { Button, Container, Flex, FormControl, Heading, Image, Input, Link, Stack, Text, useToast } from "@chakra-ui/react";
import { AuthError, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


function RegisterPage() {

    const toast = useToast();
    const navidate = useNavigate();

    const firstname = useRef<HTMLInputElement>(null);
    const lastname = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);

    const handleRegister = async (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();

        const data = {
            firstname: firstname.current?.value ?? '',
            lastname: lastname.current?.value ?? '',
            email: email.current?.value ?? '',
            password: password.current?.value ?? '',
        }

        if (data.password !== confirmPassword.current?.value) {
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "รหัสผ่านไม่ตรงกัน",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            return
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const { user } = result

            // TODO: Set user display name
            await updateProfile(user, {
                displayName: `${data.firstname} ${data.lastname}`
            });

            navidate('/search')
        } catch (error) {
            toast({
                title: "เกิดข้อผิดพลาด",
                description: (error as AuthError).message,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
        }
    }


    return (
        <Container maxW="container.sm" display="flex" h="100svh" w="100svw" alignItems="center" justifyContent="center" flexDirection="column" py={5}>
            <div id="recaptcha-container" />
            <Flex h={10} justify="center">
                <Image src={logo} alt="WheelBus Logo" />
            </Flex>
            <Flex flex={1} direction="column" align="center" justify="center" w="full" rowGap={5}>
                <Flex direction="column" align="center">
                    <Heading as="h1" size="xl" fontWeight="bold" color="brand.500"> ลงทะเบียน </Heading>
                    <Text fontFamily="prompt" color="gray.500">กรอกข้อมูลด้านล่างเพื่อสมัครใช้งาน</Text>
                </Flex>

                <FormControl as="form" onSubmit={handleRegister}>
                    <Stack spacing={2}>

                        <Input
                            id="firstname" name="firstname" type="text" placeholder='ชื่อ' autoComplete='given-name' ref={firstname}
                            w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                        />
                        <Input
                            id="lastname" name="lastname" type="text" placeholder='นามสกุล' autoComplete='family-name' ref={lastname}
                            w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                        />
                        <Input
                            id="email" name="email" type="email" placeholder='อีเมล' autoComplete='email' ref={email}
                            w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                        />
                        <Input
                            id="password" name="password" type="password" placeholder='รหัสผ่าน' autoComplete='new-password' ref={password}
                            w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                        />
                        <Input
                            id="confirm-password" name="confirm-password" type="password" placeholder='ยืนยันรหัสผ่าน' autoComplete='confirm-password' ref={confirmPassword}
                            w="full" bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}}
                        />
                        <Button type="submit" bgColor="brand.500" color="white" w="full" size="lg" shadow="md">
                            ลงทะเบียนใช้งาน
                        </Button>
                    </Stack>
                </FormControl>
            </Flex>
            <Flex>
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