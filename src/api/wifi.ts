import {apiFetchGet, apiFetchPost, apiFetchPut, ApiResponse} from "./_urls";

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
    return apiFetchGet<ISsidPassword[]>("/wifi/saved");
}

export async function apiWifiScanNetworks(): Promise<ApiResponse<IWifiNetwork[]>> {
    return apiFetchGet<IWifiNetwork[]>("/wifi/scan");
}

export async function apiWifiForgetConnection(ssid: string): Promise<ApiResponse<void>> {
    const request: { ssid: string, password?: string } = {ssid};
    return apiFetchPost<void>("/wifi/forget", request);
}

export async function apiWifiConnectToNetwork(ssid: string, password?: string): Promise<ApiResponse<void>> {
    const request: { ssid: string, password?: string } = {ssid};
    if (password) {
        request.password = password;
    }
    return apiFetchPost<void>("/wifi/connect", request);
}


export async function apiWifiGetApDetails(): Promise<ApiResponse<ISsidPassword>> {
    return apiFetchGet<ISsidPassword>("/wifi/ap");
}

export async function apiWifiCreateApi(): Promise<ApiResponse<void>> {
    return apiFetchPost<void>("/wifi/ap");
}

export async function apiWifiSetApiDetails(ssid: string, password?: string): Promise<ApiResponse<void>> {
    const request: { ssid: string, password?: string } = {ssid};
    if (password) {
        request.password = password;
    }
    return apiFetchPut<void>("/wifi/ap", request);
}