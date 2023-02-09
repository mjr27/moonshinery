import {apiFetchGet, apiFetchPost, ApiResponse} from "./_urls";

export interface ISensorInfo {
    temperature: number[]
    leakage: number[];
}

export async function apiSensorsList(): Promise<ApiResponse<ISensorInfo>> {
    return apiFetchGet<ISensorInfo>("/sys/sensors");
}

export async function apiTemperatureSensorsRescan(): Promise<ApiResponse<ISensorInfo>> {
    return apiFetchPost<ISensorInfo>("/sys/sensors/rescan");
}

export async function apiTemperatureSensorsRotate(): Promise<ApiResponse<ISensorInfo>> {
    return apiFetchPost<ISensorInfo>("/sys/sensors/rotate");
}
