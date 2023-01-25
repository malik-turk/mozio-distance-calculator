import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

// Types
import { Distances } from "@/types/common";

export const useCalculateDistance = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [distancesData, setDistancesData] = useState<Distances[]>([]);
    const { query } = useRouter();

    useEffect(() => {
        axios.get('/api/distance', { params: query }).then(({ data }: { data: Distances[]}) => {
            setIsLoading(false);
            setDistancesData(data)
        });
    }, [query]);

    return {
        isLoading,
        distances: distancesData
    };
};
