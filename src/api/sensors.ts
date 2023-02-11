import {apiFetchGet, apiFetchPost, ApiResponse} from "./_urls";

export interface ITemperatureSensor {
    id: string
    value: number
}

export interface ISensorInfo {
    temp: ITemperatureSensor[]
    leak: number[];
}

export async function apiSensorsList(): Promise<ApiResponse<ISensorInfo>> {
    return apiFetchGet<ISensorInfo>("/sys/sensors");
}

export async function apiTemperatureSensorsRescan(): Promise<ApiResponse<ISensorInfo>> {
    return apiFetchPost<ISensorInfo>("/sys/sensors/rescan");
}

export async function apiTemperatureSensorMoveUp(index: number): Promise<ApiResponse<ISensorInfo>> {
    return apiFetchPost<ISensorInfo>("/sys/sensors/up", {id: index});
}
