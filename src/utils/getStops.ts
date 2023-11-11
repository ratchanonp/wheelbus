import { db } from "@/firebase/firebase";
import { Stop } from "@/interfaces/stop.interface";
import { collection, getDocs } from "firebase/firestore";

const stopCollection = collection(db, "stop");

/**
 * Get all stops from firestore
 * @returns array of stops
 */
async function getStops(): Promise<Stop[]> {


    const querySnapshot = await getDocs(stopCollection);

    const stops: Stop[] = [];

    querySnapshot.forEach((doc) => {
        stops.push({
            id: doc.id,
            ...doc.data()
        } as Stop);
    });

    return stops;

}

/**
 * Get stop by id
 * @param id id of stop
 * @returns stop
 */
async function getStopById(id: string): Promise<Stop> {

    const querySnapshot = await getDocs(stopCollection);

    let stop: Stop = {
        id: "",
        lat: 0,
        lng: 0,
        name: ""
    };

    querySnapshot.forEach((doc) => {
        if (doc.id === id) {
            stop = {
                id: doc.id,
                ...doc.data()
            } as Stop;
        }
    });

    return stop;
}


/**
 * Function to search for stops by name
 * @param keyword keyword to search for stops name
 * @returns array of stops that match the keyword
 */

async function serchStops(keyword: string): Promise<Stop[]> {

    const stops: Stop[] = await getStops();

    // Filter stops by name
    const filteredStops = stops.filter((stop) => {
        return stop.name.toLowerCase().includes(keyword.toLowerCase());
    });

    return filteredStops;
}

export {
    getStopById, getStops, serchStops
};

