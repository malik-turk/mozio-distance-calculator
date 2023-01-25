export interface IntermediateCites {
    id: string;
}

export interface FormData {
    originCity?: boolean;
    destinationCity?: boolean;
    date?: Date|Dayjs;
    passengers?: boolean;
    [key: string]: boolean;
}
