import { Divider, Flex, HStack, Heading, Icon, IconButton, Stack } from "@chakra-ui/react"
import { FaArrowLeft, FaPen, FaTrashCan } from "react-icons/fa6"
import { HiOutlineViewGridAdd } from "react-icons/hi"
import { Link as RouterLink } from "react-router-dom"

const FavoritePage = () => {



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
                <Flex justify="space-between" w="full">
                    <Heading flex={1} as="h1" fontWeight="semibold" size="lg" color="slate">สถานที่โปรด</Heading>
                    <IconButton icon={<Icon as={HiOutlineViewGridAdd} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />

                </Flex>
            </Stack>
            <Stack p={5} spacing={10}>
                <Stack divider={<Divider />}>
                    <Heading size="md" fontWeight="semibold">🏠 บ้าน</Heading>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" fontWeight="medium">กรมปศุสัตว์</Heading>
                        <HStack>
                            <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                            <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                        </HStack>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" fontWeight="medium">ครัวกรุงเทพ</Heading>
                        <HStack>
                            <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                            <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                        </HStack>
                    </Flex>
                </Stack>
                <Stack divider={<Divider />}>
                    <Heading size="md" fontWeight="semibold">💼 ที่ทำงาน</Heading>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" fontWeight="medium">จุฬา (คณะวิทยาศาสตร์)</Heading>
                        <HStack>
                            <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                            <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                        </HStack>
                    </Flex>
                </Stack>
                <Stack divider={<Divider />}>
                    <Heading size="md" fontWeight="semibold">⭐️ ที่โปรด</Heading>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" fontWeight="medium">จตุจักร</Heading>
                        <HStack>
                            <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                            <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                        </HStack>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading size="sm" fontWeight="medium">สามย่านมิตรทาว</Heading>
                        <HStack>
                            <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                            <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />
                        </HStack>
                    </Flex>
                </Stack>
            </Stack>

        </Flex>
    )
}

export default FavoritePage