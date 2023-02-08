// TODO take from local storage  / cookies

// export const ROOT_URI: string = process.env.REACT_APP_ESP32_HOST ?? "https://esp32.local";
import urlJoin from "url-join";

const ROOT_URI: string = "http://10.0.0.227";

// const WS_URL = "ws://10.0.0.227/ws";

export function getApiUri(relativeUri: string) {
    return urlJoin(ROOT_URI, relativeUri);
}

export async function apiFetchGet<T>(relativeUri: string): Promise<T> {
    const response = await fetch(getApiUri(relativeUri));
    return await response.json() as T;
}

export async function apiFetchDelete(relativeUri: string): Promise<void> {
    await fetch(getApiUri(relativeUri), {
        method: 'delete'
    });
}


export async function apiFetchPost<T>(relativeUri: string, value?: any): Promise<T> {
    const init: RequestInit = {
        method: 'post',

    }
    if (value !== null && value !== undefined) {

        init.headers = {"Content-Type": "application/json"}
        init.body = JSON.stringify(value);
    }
    const response = await fetch(getApiUri(relativeUri), init);
    return await response.json() as T;
}