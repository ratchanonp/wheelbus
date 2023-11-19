import DeleteFavoriteDrawer from "@/components/Favorite/DeleteFavoriteDrawer"
import EditFavoriteDrawer from "@/components/Favorite/EditFavoriteDrawer"
import useGetFavoritePlaces from "@/hooks/useGetFavoritePlaces"
import { FavoriteCategory, FavoritePlace } from "@/interfaces/favorite.interface"
import { Divider, Flex, HStack, Heading, Icon, IconButton, Skeleton, Stack, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { FaArrowLeft, FaPen, FaTrashCan } from "react-icons/fa6"
import { HiOutlineViewGridAdd } from "react-icons/hi"
import { Link as RouterLink } from "react-router-dom"

const FavoritePage = () => {

    const { favoritePlaces, isLoading, error, reFetch } = useGetFavoritePlaces();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

    const [favoritePlace, setFavoritePlace] = useState<FavoritePlace | undefined>(undefined);

    if (error) return <div>Error</div>

    const favoritePlacesGroupByCategory = favoritePlaces.reduce((acc, favoritePlace) => {
        const category = favoritePlace.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(favoritePlace);
        return acc;
    }, {} as { [key in FavoriteCategory]: FavoritePlace[] })

    const handleEditFavoritePlace = (favoritePlace: FavoritePlace) => {
        setFavoritePlace(favoritePlace);
        onEditOpen();
    }

    const handleDeleteFavoritePlace = (favoritePlace: FavoritePlace) => {
        setFavoritePlace(favoritePlace);
        onDeleteOpen();
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
                <Flex justify="space-between" w="full">
                    <Heading flex={1} as="h1" fontWeight="semibold" size="lg" color="slate">สถานที่โปรด</Heading>
                    <IconButton icon={<Icon as={HiOutlineViewGridAdd} color="slate" w={4} h={4} />} as={RouterLink} to="/favorites/add" aria-label="back" size="sm" />

                </Flex>
            </Stack>
            <Stack p={5} spacing={10}>
                <Stack divider={<Divider />}>
                    <Heading size="md" fontWeight="semibold">🏠 บ้าน</Heading>
                    {isLoading && [...Array(5)].map((_, idx) => {
                        return (
                            <Skeleton key={idx} height="20px" />
                        )
                    })}
                    {favoritePlacesGroupByCategory.HOME && favoritePlacesGroupByCategory.HOME.map((favoritePlace, idx) => {
                        const { name } = favoritePlace;

                        return (
                            <Flex key={idx} justifyContent="space-between" alignItems="center">
                                <Heading size="sm" fontWeight="medium">{name}</Heading>
                                <HStack>
                                    <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} aria-label="back" size="sm" onClick={() => handleEditFavoritePlace(favoritePlace)} />
                                    < IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} aria-label="back" size="sm" onClick={() => handleDeleteFavoritePlace(favoritePlace)} />
                                </HStack>
                            </Flex>
                        )
                    })}
                </Stack>
                <Stack divider={<Divider />}>
                    <Heading size="md" fontWeight="semibold">💼 ที่ทำงาน</Heading>
                    {isLoading && [...Array(3)].map((_, idx) => {
                        return (
                            <Skeleton key={idx} height="20px" />
                        )
                    })}
                    {favoritePlacesGroupByCategory.WORK && favoritePlacesGroupByCategory.WORK.map((favoritePlace, idx) => {
                        const { name } = favoritePlace;

                        return (
                            <Flex key={idx} justifyContent="space-between" alignItems="center">
                                <Heading size="sm" fontWeight="medium">{name}</Heading>
                                <HStack>
                                    <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} aria-label="back" size="sm" onClick={() => handleEditFavoritePlace(favoritePlace)} />
                                    <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} aria-label="back" size="sm" onClick={() => handleDeleteFavoritePlace(favoritePlace)} />
                                </HStack>
                            </Flex>
                        )
                    })}
                </Stack>
                <Stack divider={<Divider />}>
                    <Heading size="md" fontWeight="semibold">⭐️ ที่โปรด</Heading>
                    {isLoading && [...Array(2)].map((_, idx) => {
                        return (
                            <Skeleton key={idx} height="20px" />
                        )
                    })}
                    {favoritePlacesGroupByCategory.OTHER && favoritePlacesGroupByCategory.OTHER.map((favoritePlace, idx) => {
                        const { name } = favoritePlace;

                        return (
                            <Flex key={idx} justifyContent="space-between" alignItems="center">
                                <Heading size="sm" fontWeight="medium">{name}</Heading>
                                <HStack>
                                    <IconButton icon={<Icon as={FaPen} color="slate" w={4} h={4} />} aria-label="back" size="sm" onClick={() => handleEditFavoritePlace(favoritePlace)} />
                                    <IconButton icon={<Icon as={FaTrashCan} color="slate" w={4} h={4} />} aria-label="back" size="sm" onClick={() => handleDeleteFavoritePlace(favoritePlace)} />
                                </HStack>
                            </Flex>
                        )
                    })}
                </Stack>
            </Stack>
            <EditFavoriteDrawer isOpen={isEditOpen} onClose={onEditClose} favoritePlace={favoritePlace} reFetch={reFetch} />
            <DeleteFavoriteDrawer isOpen={isDeleteOpen} onClose={onDeleteClose} favoritePlace={favoritePlace} reFetch={reFetch} />
        </Flex >
    )
}

export default FavoritePage