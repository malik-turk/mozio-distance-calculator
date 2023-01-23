import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

// Types
import { Cities } from "@/types/common";

export const useCitiesData = () => {
    const [citiesData, setCitiesData] = useState<Cities[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('/api/cities').then(({ data }: {data: Cities[] }) => {
            setCitiesData(data);
            setIsLoading(false);
        });
    }, [])

    return {
        citiesData,
        isLoading
    };
};
