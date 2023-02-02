import {getUri} from "./config";

export interface ISensor {
    temperature: number[];
    leakage: number[];
}

export async function rotateTemperatureSensors() {
    const response = await fetch(getUri('/config/sensors/rotate'), {
        method: 'post'
    });
    const data = await response.json();
    return data as ISensor;
}

export async function scanTemperatureSensors() {
    const response = await fetch(getUri('/config/sensors/rescan'), {
        method: 'post'
    });
    const data = await response.json();
    return data as ISensor;
}

export async function readRelaysStatus() {
    const response = await fetch(getUri('/config/relays'));
    const data = await response.json();
    const status = data.status as number[];
    return status.map(r => r === 1);
}


export async function setRelayStatus(relay: number, enabled: boolean) {
    const body = {
        id: relay,
        status: enabled ? 1 : 0
    }
    const response = await fetch(getUri('/config/relays'), {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const data = await response.json();
    const status = data.status as number[];
    return status.map(r => r === 1);
}

