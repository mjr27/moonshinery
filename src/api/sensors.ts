import {apiFetchGet, apiFetchPost} from "./_urls";

export interface ISensorInfo {
    temperature: number[]
    leakage: number[];
}

export async function apiSensorsList(): Promise<ISensorInfo> {
    return apiFetchGet<ISensorInfo>("/sys/sensors");
}

export async function apiTemperatureSensorsRescan(): Promise<ISensorInfo> {
    return apiFetchPost<ISensorInfo>("/sys/sensors/rescan");
}

export async function apiTemperatureSensorsRotate(): Promise<ISensorInfo> {
    return apiFetchPost<ISensorInfo>("/sys/sensors/rotate");
}
