import logo from '@/assets/logo.svg';
import { Container, Image } from "@chakra-ui/react";

function RegisterPage() {
    return (
        <Container maxW="sm" display="flex" h="100vh" w="100vw" alignItems="center" justifyContent="center" flexDirection="column" py={5}>
            <Image src={logo} alt="WheelBus Logo" />
        </Container>
    )
}

export default RegisterPage