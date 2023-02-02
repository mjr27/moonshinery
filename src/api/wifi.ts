export interface IWifi {
    ssid: string;
    rssi: number;
    pass?: string;
    known: boolean;
}

export async function fetchWifi(): Promise<IWifi[]> {
    return [{"ssid": "mjr@matv-repeat", "pass": "Poiuytrewq1", "rssi": -61, "known": true}, {
        "ssid": "mjr@matv",
        "pass": "Poiuytrewq1",
        "rssi": -82,
        "known": true
    }, {"ssid": "BA11340458", "rssi": -89, "known": false}];
}
