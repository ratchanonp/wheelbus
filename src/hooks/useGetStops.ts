// Custom hook to get routes from the Firebase database

import { Stop } from '@/interfaces/stop.interface';
import { getStops } from '@/utils/getStops';
import { useEffect, useState } from 'react';

export default function useGetStops() {

    const [loading, setLoading] = useState(true);
    const [stops, setStops] = useState<Stop[]>([]);

    useEffect(() => {

        const fetchStops = async () => {
            const stops = await getStops();

            setStops(stops);
            setLoading(false);
        }

        fetchStops();

    }, []);

    return { stops, loading };

}
