// TODO take from local storage  / cookies

// export const ROOT_URI: string = process.env.REACT_APP_ESP32_HOST ?? "https://esp32.local";
import urlJoin from "url-join";

const ROOT_URI: string = "http://10.0.0.227";

export const DEFAULT_REFRESH_INTERVAL = 1000;

// const WS_URL = "ws://10.0.0.227/ws";
export type ApiResponse<T> = {
    success: true
    result?: T
} | {
    success: false
    error: string;
}

export function getApiUri(relativeUri: string) {
    return urlJoin(ROOT_URI, relativeUri);
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
    try {
        if (response.status === 200) {
            return {
                success: true,
                result: await response.json() as T
            };
        }
        if (response.status >= 400) {
            return {
                success: false,
                error: await response.text()
            }
        }
        return {
            success: true
        }

    } catch (error) {
        let message = 'Unknown Error'
        if (error instanceof Error) message = error.message
        return {
            success: false,
            error: message
        }
    }


}

export async function apiFetchGet<T>(relativeUri: string): Promise<ApiResponse<T>> {
    return await parseResponse<T>(await fetch(getApiUri(relativeUri)));
}

export async function apiFetchDelete(relativeUri: string): Promise<ApiResponse<void>> {
    return await parseResponse<void>(await fetch(getApiUri(relativeUri), {
        method: 'delete'
    }));
}


export async function apiFetchPost<T>(relativeUri: string, value?: any): Promise<ApiResponse<T>> {
    const init: RequestInit = {
        method: 'post',
    }
    if (value !== null && value !== undefined) {
        init.headers = {"Content-Type": "application/json"}
        init.body = JSON.stringify(value);
    }
    return await parseResponse<T>(await fetch(getApiUri(relativeUri), init));

}