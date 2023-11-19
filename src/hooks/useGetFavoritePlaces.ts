import { FavoritePlace } from "@/interfaces/favorite.interface";
import { getFavoritePlaces } from "@/utils/favorite";
import { useEffect, useState } from "react";

const useGetFavoritePlaces = () => {
    const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getFavorites = async () => {
            setIsLoading(true);
            try {
                const favoritePlaces = await getFavoritePlaces();
                setFavoritePlaces(favoritePlaces);
            } catch (error: unknown) {
                setError("Error getting favorite places");
            }

            setIsLoading(false);
        }

        getFavorites();

    }, []);

    const reFetch = async () => {
        try {
            const favoritePlaces = await getFavoritePlaces();
            setFavoritePlaces(favoritePlaces);
        } catch (error: unknown) {
            setError("Error getting favorite places");
        }

    }

    return { favoritePlaces, isLoading, error, reFetch };
}

export default useGetFavoritePlaces;