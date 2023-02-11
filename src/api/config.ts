import {apiFetchGet, apiFetchPut, ApiResponse} from "./_urls";

export interface ILeakageConfiguration {
    window: number;
    threshold: number;
}

export interface IPotStillConfiguration {
    window: number;
    cool_threshold: number;
    off_threshold: number;
}

export interface IFirmwareInfo {
    name: string
    date: string
    time: string
    idf_ver: string
    ver: string
}

export async function apiGetFirmwareInfo(): Promise<ApiResponse<IFirmwareInfo>> {
    return apiFetchGet<IFirmwareInfo>('/info');
}

export function apiConfigGetLeak(): Promise<ApiResponse<ILeakageConfiguration>> {
    return apiFetchGet<ILeakageConfiguration>("/config/leak");
}

export async function apiConfigSetLeak(configuration: ILeakageConfiguration): Promise<ApiResponse<ILeakageConfiguration>> {
    return await apiFetchPut<ILeakageConfiguration>("/config/leak", configuration);
}


export function apiConfigGetPotStill(): Promise<ApiResponse<IPotStillConfiguration>> {
    return apiFetchGet<IPotStillConfiguration>("/config/pot-still");
}

export function apiConfigSetPotStill(configuration: IPotStillConfiguration): Promise<ApiResponse<IPotStillConfiguration>> {
    return apiFetchPut<IPotStillConfiguration>("/config/pot-still", configuration);
}