import { Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react"
import logo from '../assets/logo.svg'

import { Link as RouterLink } from 'react-router-dom'

function HomePage() {

    return (
        <Flex h="100vh" w="100vw" align="center" justify="center" direction="column" p={10}>
            <Flex flex={1} direction="column" align="center" justify="center">
                <Image src={logo} alt="WheelBus Logo" />
                <Heading color="gray" as="h1" size="sm" fontWeight="light"> WheelBus </Heading>
            </Flex>

            <Flex direction="column" gap={2} w="full" alignItems="center">
                <Button as={RouterLink} bgColor="brand.500" color="white" w="full" size="lg" to="/auth/register">
                    ลงทะเบียนใช้งาน
                </Button>

                <Text color="gray.500">
                    มีบัญชีอยู่แล้วใช่ไหม?&nbsp;
                    <Link as={RouterLink} to="/auth/login" color="brand.500" textDecor="underline">
                        เข้าสู่ระบบ
                    </Link>
                </Text>
            </Flex>
        </Flex>
    )
}

export default HomePage