import {apiFetchGet, apiFetchPost} from "./_urls";

export interface ILeakageConfiguration {
    window: number;
    threshold: number;
}

export interface IPotStillConfiguration {
    window: number;
    cool_threshold: number;
    off_threshold: number;
}

export function apiConfigGetLeak(): Promise<ILeakageConfiguration> {
    return apiFetchGet<ILeakageConfiguration>("/config/leak");
}

export function apiConfigSetLeak(configuration: ILeakageConfiguration): Promise<ILeakageConfiguration> {
    return apiFetchPost<ILeakageConfiguration>("/config/leak", configuration);
}


export function apiConfigGetPotStill(): Promise<IPotStillConfiguration> {
    return apiFetchGet<IPotStillConfiguration>("/config/pot-still");
}

export function apiConfigSetPotStill(configuration: IPotStillConfiguration): Promise<IPotStillConfiguration> {
    return apiFetchPost<IPotStillConfiguration>("/config/pot-still", configuration);
}