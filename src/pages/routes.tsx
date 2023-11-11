import { Box, Circle, Divider, Flex, Heading, Icon, IconButton, Input, InputGroup, InputLeftAddon, Link, Stack, Text } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { MdSwapVert } from "react-icons/md";

const RouteSearchPage = () => {

    return (
        <Stack>
            <Stack bgColor="brand.500" p={3} pb={6} rowGap={3}>
                <Flex w="full" align="center">
                    <IconButton
                        icon={<Icon
                            as={FaArrowLeft}
                            color="white"
                            w={4}
                            h={4}
                        />}
                        aria-label="back"
                        size="sm"
                        variant="ghost"
                    />
                    <Heading textAlign="center" flex={1} as="h1" fontWeight="medium" size="md" color="white">ค้นหาเส้นทาง</Heading>
                    <Box w={8} h={8} />
                </Flex>
                <Flex w="full" gap={2} pl={3}>
                    <Stack flex={1}>
                        <Flex align="center" gap={3}>
                            <Circle size={3} bgColor="blue.500" shadow="xl" />
                            <InputGroup>
                                <InputLeftAddon children="จาก" w={12} textAlign="right" fontFamily="prompt" justifyContent="end" bgColor="white" fontSize="smaller" textColor="gray" pr={3} />
                                <Input bgColor="white" type="text" borderLeft="none" placeholder="เริ่มจากที่ไหน" fontFamily="prompt" color="gray" pl={0} _focusVisible={{ border: "none" }} />
                            </InputGroup>
                        </Flex>
                        <Flex align="center" gap={3}>
                            <Box w={3} h={3} bgColor="red.500" borderRadius="2px" shadow="xl" />
                            <InputGroup>
                                <InputLeftAddon children="ถึง" w={12} textAlign="right" fontFamily="prompt" justifyContent="end" bgColor="white" fontSize="smaller" textColor="gray" pr={3} />
                                <Input bgColor="white" type="text" borderLeft="none" placeholder="ไปที่ไหนดี" fontFamily="prompt" color="gray" pl={0} _focusVisible={{ border: "none" }} />
                            </InputGroup>
                        </Flex>
                    </Stack>
                    <Flex align="center">
                        <IconButton
                            icon={<Icon
                                as={MdSwapVert}
                                color="white"
                                w={6} h={6}
                            />}
                            aria-label="swap"
                            size="md"
                            variant="ghost"
                        />
                    </Flex>
                </Flex>
            </Stack>
            <Stack px={3} divider={<Divider />} fontFamily="prompt">
                <Flex>
                    <Text>เลือกบนแผนที่</Text>
                </Flex>
                <Stack>
                    <Flex justify="space-between">
                        <Heading fontSize="xs">ที่โปรด</Heading>
                        <Link fontSize="xs">ดูทั้งหมด</Link>
                    </Flex>
                </Stack>
                <Stack divider={<Divider />}>
                    <Flex>บ้าน</Flex>
                    <Flex>ที่ทำงาน</Flex>
                    <Flex>โรงเรียน</Flex>
                    <Flex>โรงพยาบาล</Flex>
                </Stack>
            </Stack >
        </Stack >
    )
}

export default RouteSearchPage