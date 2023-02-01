import {ROOT_URI} from "./config";

export interface IWifi {
    ssid: string;
    rss: number;
    known: boolean;
}

export async function fetchWifi(): Promise<IWifi[]> {
    const result = await fetch(ROOT_URI + "/wifi/scan");
    return await result.json() as IWifi[];
}