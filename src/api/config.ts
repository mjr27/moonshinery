import {apiFetchGet, apiFetchPost, ApiResponse} from "./_urls";

export interface ILeakageConfiguration {
    window: number;
    threshold: number;
}

export interface IPotStillConfiguration {
    window: number;
    cool_threshold: number;
    off_threshold: number;
}

export function apiConfigGetLeak(): Promise<ApiResponse<ILeakageConfiguration>> {
    return apiFetchGet<ILeakageConfiguration>("/config/leak");
}

export async function apiConfigSetLeak(configuration: ILeakageConfiguration): Promise<ApiResponse<ILeakageConfiguration>> {
    return await apiFetchPost<ILeakageConfiguration>("/config/leak", configuration);
}


export function apiConfigGetPotStill(): Promise<ApiResponse<IPotStillConfiguration>> {
    return apiFetchGet<IPotStillConfiguration>("/config/pot-still");
}

export function apiConfigSetPotStill(configuration: IPotStillConfiguration): Promise<ApiResponse<IPotStillConfiguration>> {
    return apiFetchPost<IPotStillConfiguration>("/config/pot-still", configuration);
}