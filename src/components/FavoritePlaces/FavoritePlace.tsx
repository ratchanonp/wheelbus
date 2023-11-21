import { SearchContext, SearchDispatchContext } from "@/contexts/SearchContext";
import useGetFavoritePlaces from "@/hooks/useGetFavoritePlaces";
import { favoritePlacesGroupByCategory } from "@/utils/favorite";
import { Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import FavoritePlaceItemLoading from "./FavoritePlaceItem.loading";

const FavoritePlace = () => {

    const { favoritePlaces, isLoading, error } = useGetFavoritePlaces();
    const favoritePlaceByCategory = favoritePlacesGroupByCategory(favoritePlaces);

    const search = useContext(SearchContext);
    const searchDispatch = useContext(SearchDispatchContext);

    const { focusedInput } = search;

    const handleSelectFavoritePlace = (name: string, placeId: string) => {

        const customName = "สถานที่โปรด - " + name;

        if (focusedInput === "from") {
            searchDispatch({ type: "SET_FROM", payload: { from: customName } })
            searchDispatch({ type: "SET_FROM_PLACE_ID", payload: { fromPlaceId: placeId } })
        }
        if (focusedInput === "to") {
            searchDispatch({ type: "SET_TO", payload: { to: customName } })
            searchDispatch({ type: "SET_TO_PLACE_ID", payload: { toPlaceId: placeId } })
        }

        searchDispatch({ type: "CLEAR_FOCUSED_INPUT" })
    }

    if (error) return <div>Error</div>

    return (
        <Stack spacing={10}>
            <Stack divider={<Divider />}>
                <Heading size="md" fontWeight="semibold">🏠 บ้าน</Heading>
                {isLoading && (<FavoritePlaceItemLoading noItems={2} />)}
                {favoritePlaceByCategory.HOME && favoritePlaceByCategory.HOME.map((favoritePlace, idx) => {
                    const { name, placeId } = favoritePlace;

                    return (
                        <Flex key={idx} justifyContent="space-between" alignItems="center" onClick={() => handleSelectFavoritePlace(name, placeId)}>
                            <Heading size="sm" fontWeight="medium">{name}</Heading>
                        </Flex>
                    )
                })}
            </Stack>
            <Stack divider={<Divider />}>
                <Heading size="md" fontWeight="semibold">💼 ที่ทำงาน</Heading>
                {isLoading && (<FavoritePlaceItemLoading noItems={1} />)}
                {favoritePlaceByCategory.WORK && favoritePlaceByCategory.WORK.map((favoritePlace, idx) => {
                    const { name, placeId } = favoritePlace;

                    return (
                        <Flex key={idx} justifyContent="space-between" alignItems="center" onClick={() => handleSelectFavoritePlace(name, placeId)}>
                            <Heading size="sm" fontWeight="medium">{name}</Heading>
                        </Flex>
                    )
                })}
            </Stack>
            <Stack divider={<Divider />}>
                <Heading size="md" fontWeight="semibold">⭐️ ที่โปรด</Heading>
                {isLoading && (<FavoritePlaceItemLoading noItems={1} />)}
                {favoritePlaceByCategory.OTHER && favoritePlaceByCategory.OTHER.map((favoritePlace, idx) => {
                    const { name, placeId } = favoritePlace;

                    return (
                        <Flex key={idx} justifyContent="space-between" alignItems="center" onClick={() => handleSelectFavoritePlace(name, placeId)}>
                            <Heading size="sm" fontWeight="medium">{name}</Heading>
                        </Flex>
                    )
                })}
            </Stack>
        </Stack >
    )
}

export default FavoritePlace