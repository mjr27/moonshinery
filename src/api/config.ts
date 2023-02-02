import urlJoin from 'url-join';

// export const ROOT_URI: string = process.env.REACT_APP_ESP32_HOST ?? "https://esp32.local";
export const ROOT_URI: string = "http://192.168.3.13";
export const getUri = (path: string): string => urlJoin(ROOT_URI, path);

