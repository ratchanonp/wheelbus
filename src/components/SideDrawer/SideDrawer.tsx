import logo from '@/assets/logo.svg';
import { UserContext } from '@/contexts/UserContext';
import { auth } from '@/firebase/firebase';
import { CloseIcon } from '@chakra-ui/icons';
import { Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps, Flex, Heading, Icon, IconButton, Image, Link, List, ListIcon, ListItem, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { AuthError, User, sendEmailVerification, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { useContext, useState } from 'react';
import { BiSolidUserCircle } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

function SideDrawerContent(props: Omit<DrawerProps, "children">) {

    const { isOpen, onClose } = props;

    const { user } = useContext(UserContext);
    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const { displayName, email, emailVerified } = user as User
    const { firstName, lastName } = displayName ? { firstName: displayName.split(' ')[0], lastName: displayName.split(' ')[1] } : { firstName: '', lastName: '' }

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

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            handleError(error as AuthError);
        }
    }

    const handleEmailVerification = async () => {
        setLoading(true);
        if (!user) return

        try {
            await sendEmailVerification(user);
            toast({
                title: "ส่งลิงก์ยืนยันอีเมลเรียบร้อยแล้ว",
                description: "กรุณาตรวจสอบอีเมลของคุณ",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top"
            })
        } catch (error) {
            handleError(error as AuthError);
        } finally {
            setLoading(false);
        }
    }

    const handlePasswordReset = async () => {
        setLoading(true);
        if (!email) return
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
            setLoading(false);
        }
    }

    return (

        <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader display="flex" justifyContent="flex-start" alignItems="center">
                    <Flex flex={1}>
                        <Image h={12} src={logo} alt="WheelBus Logo" />
                    </Flex>
                    <IconButton aria-label='close' icon={<CloseIcon />} variant='ghost' color='brand.500' size='lg' onClick={props.onClose} />
                </DrawerHeader>
                <DrawerBody>
                    <Stack divider={<Divider />} spacing={3}>
                        <Stack spacing={3}>
                            <Icon as={BiSolidUserCircle} w={16} h={16} color="brand.500" />

                            <Flex align="center">
                                <Heading fontWeight="semibold" size="lg" color="brand.500">ข้อมูลสมาชิก</Heading>
                                <Link textDecor="underline" flex={1} textAlign="right" color="gray.400" as={RouterLink} to="/profile/edit">แก้ไขข้อมูล</Link>
                            </Flex>
                            <Stack divider={<Divider />} bgColor="brand.100" p={3} borderRadius="lg" w="full" spacing={3} fontFamily="prompt" fontSize="sm">
                                <Flex w="full" justifyContent="flex-end">
                                    <Text color="slate.500">ชื่อ</Text>
                                    <Text flex={1} textAlign="right">{firstName}</Text>
                                </Flex>
                                <Flex w="full" justifyContent="flex-end">
                                    <Text color="slate.500">สกุล</Text>
                                    <Text flex={1} textAlign="right">{lastName}</Text>
                                </Flex>
                            </Stack>
                            <Stack divider={<Divider />} bgColor="brand.100" p={3} borderRadius="lg" w="full" spacing={3} fontFamily="prompt" fontSize="sm">
                                <Flex w="full" justifyContent="flex-end">
                                    <Text color="slate.500">อีเมล</Text>
                                    <Text flex={1} textAlign="right">{email}</Text>
                                </Flex>
                                {!emailVerified && email && (
                                    <Flex w="full" justifyContent="flex-end">
                                        <Text flex={1} color="slate.500">ยืนยันอีเมล</Text>
                                        {loading ? (
                                            <Spinner color="brand.500" />
                                        ) : (
                                            <Link flex={1} textAlign="right" color="brand.500" onClick={handleEmailVerification}>ส่งลิงก์ยืนยันอีเมล</Link>
                                        )}
                                    </Flex>
                                )}
                                <Flex w="full" justifyContent="flex-end">
                                    <Text flex={1} color="slate.500">รหัสผ่าน</Text>
                                    {loading ? (
                                        <Spinner color="brand.500" />
                                    ) : (
                                        <Link flex={1} textAlign="right" color="brand.500" onClick={handlePasswordReset}>เปลี่ยนรหัสผ่าน</Link>
                                    )}
                                </Flex>
                            </Stack>
                        </Stack>

                        <Stack>
                            <Heading fontWeight="semibold" size="lg" color="brand.500">ตั้งค่า</Heading>
                            <List spacing={3}>
                                <ListItem alignItems="center" display="flex">
                                    <ListIcon as={FaStar} />
                                    <RouterLink to="/favorites">สถานที่โปรด</RouterLink>
                                </ListItem>
                            </List>
                        </Stack>
                    </Stack>
                </DrawerBody>
                <DrawerFooter>
                    <Button onClick={handleSignOut} bgColor="brand.500" color="white">ออกจากระบบ</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default SideDrawerContent