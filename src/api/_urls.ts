// TODO take from local storage  / cookies

// export const ROOT_URI: string = process.env.REACT_APP_ESP32_HOST ?? "https://esp32.local";
import urlJoin from "url-join";

export const API_HOST_LOCAL_STORAGE_KEY = "API_HOST_LOCAL_STORAGE";
export const API_HOST_LOCAL_DEFAULT_VALUE = "http://esp32.local";

export const DEFAULT_REFRESH_INTERVAL = 1000;
export const DEFAULT_TIMEOUT = 5000;

// const WS_URL = "ws://10.0.0.227/ws";
export type ApiResponse<T> = {
    success: true
    result?: T
} | {
    success: false
    error: string;
} | {
    success: false
    sysError: string;
}

export function getApiUri(relativeUri: string) {
    const root = localStorage.getItem(API_HOST_LOCAL_STORAGE_KEY) ?? API_HOST_LOCAL_DEFAULT_VALUE;
    return urlJoin(root, relativeUri);
}

async function parseResponse<T>(responsePromise: Promise<Response>): Promise<ApiResponse<T>> {
    try {
        const response = await responsePromise;
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
            sysError: message
        }
    }
}

export async function fetchX(input: RequestInfo | URL, init?: RequestInit) {
    const abort = new AbortController();
    const id = setTimeout(() => abort.abort(), DEFAULT_TIMEOUT);
    init ??= {}
    init = {...init, signal: abort.signal};
    const result = await fetch(input, init);
    clearTimeout(id);
    return result;

}

export async function apiFetchGet<T>(relativeUri: string): Promise<ApiResponse<T>> {
    return await parseResponse<T>(fetchX(getApiUri(relativeUri)));
}

export async function apiFetchDelete(relativeUri: string): Promise<ApiResponse<void>> {
    return await parseResponse<void>(fetch(getApiUri(relativeUri), {
        method: 'delete'
    }));
}


export async function apiFetchPost<T>(relativeUri: string, value?: unknown): Promise<ApiResponse<T>> {
    const init: RequestInit = {
        method: 'post',
    }
    if (value !== null && value !== undefined) {
        init.headers = {"Content-Type": "application/json"}
        init.body = JSON.stringify(value);
    }
    return await parseResponse<T>(fetch(getApiUri(relativeUri), init));

}

export async function apiFetchPut<T>(relativeUri: string, value?: unknown): Promise<ApiResponse<T>> {
    const init: RequestInit = {
        method: 'put',
    }
    if (value !== null && value !== undefined) {
        init.headers = {"Content-Type": "application/json"}
        init.body = JSON.stringify(value);
    }
    return await parseResponse<T>(fetch(getApiUri(relativeUri), init));

}