import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

// Types
import { ApiError, Distances } from "@/types/common";

/**
 * calculate distance hook
 * @returns loading indicator and distances data
 */
export const useCalculateDistance = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [distancesData, setDistancesData] = useState<Distances[]>([]);
    const [errors, setErrors] = useState<ApiError>({});
    const { query } = useRouter();

    useEffect(() => {
        axios.get('/api/distance', { params: query })
            .then(({ data }: { data: Distances[]}) => {
                setIsLoading(false);
                setDistancesData(data)
            })
            .catch(({ response }) => {
                setErrors(response.data);
            })
    }, [query]);

    return {
        errors,
        isLoading,
        distances: distancesData
    };
};
