export type FavoriteCategory = 'HOME' | 'WORK' | 'OTHER';

export interface FavoritePlace {
    id: string;
    name: string;
    category: FavoriteCategory;
    placeId: string;
    authorId: string;
}

export interface FavoritePlaceInput {
    name: string;
    category: FavoriteCategory;
    placeId: string;
}

export interface PlaceData {
    formatted_address: string;
    place_id: string;
}