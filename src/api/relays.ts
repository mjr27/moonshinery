import {apiFetchGet, apiFetchPost} from "./_urls";

export interface IRelayInfo {
    status: number[]
}

export async function apiRelayList(): Promise<IRelayInfo> {
    return apiFetchGet<IRelayInfo>("/sys/relays");
}

export async function apiRelaySet(relayId: number, on: boolean): Promise<IRelayInfo> {
    return apiFetchPost<IRelayInfo>('/sys/relays', {
        id: relayId,
        status: on ? 1 : 0
    });
}
