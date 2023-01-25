export interface Cities {
    country: string;
    name: string;
    lat: string;
    lng: string;
}

export interface ApiError {
    code?: number;
    error?: string;
}

export interface Distances {
    name?: string;
    distance?: number;
}
