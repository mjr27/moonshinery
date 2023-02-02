import {getUri} from "./config";

export interface ISensor {
    temperature: number[];
    leakage: number[];
}

export async function rotateTemperatureSensors() {
    const response = await fetch(getUri('/config/sensors/rotate'), {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{}'
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

export async function readTemperatureSensors() {
    const response = await fetch(getUri('/config/sensors'));
    const data = await response.json();
    return data as ISensor;
}

