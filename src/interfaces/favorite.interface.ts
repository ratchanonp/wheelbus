export type FavoriteCategory = 'HOME' | 'WORK' | 'OTHER';

export interface FavoritePlace {
    id: string;
    name: string;
    category: FavoriteCategory;
    position: google.maps.LatLngLiteral;
}

export interface FavoritePlaceInput {
    name: string;
    category: FavoriteCategory;
    position: google.maps.LatLngLiteral;
}