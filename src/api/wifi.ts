import {apiFetchGet, apiFetchPost, ApiResponse} from "./_urls";

// http://esp32.local

export interface ISsidPassword {
    ssid: string
    password: string
}

export interface IWifiNetwork {
    ssid: string
    rssi: number
    known: boolean
}

export async function apiWifiKnownList(): Promise<ApiResponse<ISsidPassword[]>> {
    return apiFetchGet<ISsidPassword[]>("/wifi/networks/saved");
}

export async function apiWifiScanNetworks(): Promise<ApiResponse<IWifiNetwork[]>> {
    return apiFetchGet<IWifiNetwork[]>("/wifi/networks");
}

export async function apiWifiForgetConnection(ssid: string): Promise<ApiResponse<void>> {
    const request: { ssid: string, password?: string } = {ssid};
    return apiFetchPost<void>("/wifi/networks/forget", request);
}

export async function apiWifiConnectToNetwork(ssid: string, password?: string): Promise<ApiResponse<void>> {
    const request: { ssid: string, password?: string } = {ssid};
    if (password) {
        request.password = password;
    }
    return apiFetchPost<void>("/wifi/networks", request);
}
