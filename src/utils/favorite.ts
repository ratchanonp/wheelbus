import { auth, db } from "@/firebase/firebase";
import { FavoritePlace, FavoritePlaceInput } from "@/interfaces/favorite.interface";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const getFavoritePlaces = async () => {

    if (!auth.currentUser) throw new Error("User is not logged in")

    const currentUserID = auth.currentUser.uid;

    const favoriteCollection = collection(db, "favorites");
    const q = query(favoriteCollection, where("authorId", "==", currentUserID));
    const querySnapshot = await getDocs(q);

    const favorites: FavoritePlace[] = [];

    if (querySnapshot.empty) return favorites;
    querySnapshot.forEach((doc) => {
        const favorite: FavoritePlace = {
            id: doc.id,
            ...doc.data() as Omit<FavoritePlace, "id">
        }

        favorites.push(favorite);
    });

    return favorites;
}

const addFavoritePlace = async (favorite: FavoritePlaceInput) => {

    if (!auth.currentUser) throw new Error("User is not logged in")

    const currentUserID = auth.currentUser.uid;

    const favoriteCollection = collection(db, "favorites");
    const docRef = await addDoc(favoriteCollection, {
        ...favorite,
        authorId: currentUserID
    });

    return docRef.id;
}

const editFavoritePlace = async (id: string, favorite: FavoritePlaceInput): Promise<void> => {

    if (!auth.currentUser) throw new Error("User is not logged in")

    const favoriteCollection = collection(db, "favorites");
    const favoriteRef = doc(favoriteCollection, id);
    await updateDoc(favoriteRef, {
        name: favorite.name,
        category: favorite.category,
    });
}

const deleteFavoritePlace = async (id: string): Promise<void> => {

    if (!auth.currentUser) throw new Error("User is not logged in")

    const favoriteCollection = collection(db, "favorites");
    const favoriteRef = doc(favoriteCollection, id);
    await deleteDoc(favoriteRef);
}




export {
    addFavoritePlace, deleteFavoritePlace, editFavoritePlace, getFavoritePlaces
};

