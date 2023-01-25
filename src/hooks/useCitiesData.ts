import axios from "axios";
import { useState, useEffect } from "react";

// Types
import { Cities } from "@/types/common";

/**
 * a hook that gets cities data
 * @returns loading indicator and cities data
 */
export const useCitiesData = () => {
    const [citiesData, setCitiesData] = useState<Cities[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('/api/cities').then(({ data }: {data: Cities[] }) => {
            setCitiesData(data);
            setIsLoading(false);
        });
    }, []);

    return {
        citiesData,
        isLoading
    };
};
