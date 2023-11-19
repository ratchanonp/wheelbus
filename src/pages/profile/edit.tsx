import { auth } from "@/firebase/firebase";
import { Button, Flex, FormControl, FormLabel, Heading, Icon, IconButton, Input, Stack, useToast } from "@chakra-ui/react";
import { AuthError, updateProfile } from "firebase/auth";
import { useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const EditProfilePage = () => {

    const user = auth.currentUser;
    const displayName = user?.displayName;
    const { firstName, lastName } = displayName ? { firstName: displayName.split(" ")[0], lastName: displayName.split(" ")[1] } : { firstName: "", lastName: "" };

    const toast = useToast();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const newDisplayName = `${firstNameRef.current?.value} ${lastNameRef.current?.value}`;

        try {
            if (!user) throw new Error("User not found");

            await updateProfile(user, {
                displayName: newDisplayName
            });

            toast({
                title: "บันทึกข้อมูลสำเร็จ",
                description: "ข้อมูลของคุณได้รับการบันทึกแล้ว",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            })

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
            setIsSubmitting(false);
        }
    }

    return (
        <Flex w="100svw" h="100svh" direction="column">
            <Stack align="start" p={5} shadow="md">
                <IconButton
                    justifyContent="flex-start"
                    icon={<Icon
                        as={FaArrowLeft}
                        color="slate"
                        w={4}
                        h={4}
                    />}
                    as={RouterLink}
                    to="/search"
                    aria-label="back"
                    size="sm"
                    variant="none"
                />
                <Heading flex={1} as="h1" fontWeight="semibold" size="lg" color="slate">แก้ไขโปรไฟล์</Heading>

            </Stack>

            <Stack p={5} flex={1}>
                <form id="profile-form" onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>ชื่อ</FormLabel>
                            <Input type="text" id="firstName" name="firstName" placeholder="ชื่อ" ref={firstNameRef} defaultValue={firstName} required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>นามสกุล</FormLabel>
                            <Input type="text" id="lastName" name="lastName" placeholder="นามสกุล" ref={lastNameRef} defaultValue={lastName} required />
                        </FormControl>
                    </Stack>
                </form>
            </Stack>

            <Button
                colorScheme="brand"
                size="lg"
                borderRadius="lg"
                mb={5}
                mx={5}
                type="submit"
                form="profile-form"
                isLoading={isSubmitting}
                loadingText="กำลังบันทึก"
            >
                บันทึก
            </Button>
        </Flex>
    )
}

export default EditProfilePage