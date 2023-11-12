import logo from '@/assets/logo.svg';
import { auth } from "@/firebase/firebase";
import { Button, Container, Flex, FormControl, Heading, Image, Input, Link, Text, useToast } from "@chakra-ui/react";
import { AuthError, sendPasswordResetEmail } from "firebase/auth";
import { useRef, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

const ForgetPasswordPage = () => {

    const toast = useToast();

    const [subbmitting, setSubmitting] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);

    const handleError = (error: AuthError) => {
        toast({
            title: "เกิดข้อผิดพลาด",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top"
        })
    }

    const handlePasswordReset = async (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        setSubmitting(true);

        const email: string = emailRef.current?.value ?? '';

        if (!email) {
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "กรุณากรอกอีเมล",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
            return
        }

        try {
            await sendPasswordResetEmail(auth, email)
            toast({
                title: "ส่งลิงก์เปลี่ยนรหัสผ่านเรียบร้อยแล้ว",
                description: "กรุณาตรวจสอบอีเมลของคุณ",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
        } catch (error) {
            handleError(error as AuthError);
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
                    <Heading as="h1" size="xl" fontWeight="bold" color="brand.500"> ตั้งรหัสผ่านใหม่ </Heading>
                    <Text fontFamily="prompt" color="gray.500">ลืมรหัสผ่านใช่ไหมไม่ต้องกังวลไป</Text>
                </Flex>

                <FormControl as="form" onSubmit={handlePasswordReset} display="flex" flexDir="column" gap={5} w="full">
                    <Input required type="email" id="email" name="email" ref={emailRef} autoComplete='current-email' w="full" placeholder='อีเมล์' bgColor="brand.100" border="none" px={6} py={7} fontFamily="prompt" _focusVisible={{}} />
                    <Button isLoading={subbmitting} loadingText="กำลังเข้าสู่ระบบ" type="submit" bgColor="brand.500" color="white" w="full" size="lg" shadow="md" _hover={{ bgColor: "brand" }}>
                        ตั้งรหัสผ่านใหม่
                    </Button>
                </FormControl>
            </Flex>
            <Flex mt={20}>
                <Text color="gray.500">
                    ตั้งรหัสผ่านใหม่แล้วใช่ไหม?&nbsp;
                    <Link as={RouterLink} to="/auth/login" color="brand.500" textDecor="underline">
                        เข้าสู่ระบบ
                    </Link>
                </Text>
            </Flex>
        </Container >
    )
}

export default ForgetPasswordPage