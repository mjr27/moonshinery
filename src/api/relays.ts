import {apiFetchGet, apiFetchPost, ApiResponse} from "./_urls";

export interface IRelayInfo {
    status: number[]
}

export async function apiRelayList(): Promise<ApiResponse<IRelayInfo>> {
    return apiFetchGet<IRelayInfo>("/sys/relays");
}

export async function apiRelaySet(relayId: number, on: boolean): Promise<ApiResponse<IRelayInfo>> {
    return apiFetchPost<IRelayInfo>('/sys/relays', {
        id: relayId,
        status: on ? 1 : 0
    });
}
