import useGetFavoritePlaces from "@/hooks/useGetFavoritePlaces";
import { favoritePlacesGroupByCategory } from "@/utils/favorite";
import { Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import FavoritePlaceItemLoading from "./FavoritePlaceItem.loading";

const FavoritePlace = () => {

    const { favoritePlaces, isLoading, error } = useGetFavoritePlaces();
    const favoritePlaceByCategory = favoritePlacesGroupByCategory(favoritePlaces);

    if (error) return <div>Error</div>

    return (
        <Stack spacing={10}>
            <Stack divider={<Divider />}>
                <Heading size="md" fontWeight="semibold">🏠 บ้าน</Heading>
                {isLoading && (<FavoritePlaceItemLoading noItems={2} />)}
                {favoritePlaceByCategory.HOME && favoritePlaceByCategory.HOME.map((favoritePlace, idx) => {
                    const { name } = favoritePlace;

                    return (
                        <Flex key={idx} justifyContent="space-between" alignItems="center">
                            <Heading size="sm" fontWeight="medium">{name}</Heading>
                        </Flex>
                    )
                })}
            </Stack>
            <Stack divider={<Divider />}>
                <Heading size="md" fontWeight="semibold">💼 ที่ทำงาน</Heading>
                {isLoading && (<FavoritePlaceItemLoading noItems={1} />)}
                {favoritePlaceByCategory.WORK && favoritePlaceByCategory.WORK.map((favoritePlace, idx) => {
                    const { name } = favoritePlace;

                    return (
                        <Flex key={idx} justifyContent="space-between" alignItems="center">
                            <Heading size="sm" fontWeight="medium">{name}</Heading>
                        </Flex>
                    )
                })}
            </Stack>
            <Stack divider={<Divider />}>
                <Heading size="md" fontWeight="semibold">⭐️ ที่โปรด</Heading>
                {isLoading && (<FavoritePlaceItemLoading noItems={1} />)}
                {favoritePlaceByCategory.OTHER && favoritePlaceByCategory.OTHER.map((favoritePlace, idx) => {
                    const { name } = favoritePlace;

                    return (
                        <Flex key={idx} justifyContent="space-between" alignItems="center">
                            <Heading size="sm" fontWeight="medium">{name}</Heading>
                        </Flex>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default FavoritePlace