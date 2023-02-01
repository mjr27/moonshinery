import urlJoin from 'url-join';

export const ROOT_URI = "http://" + process.env.REACT_APP_ESP32_HOSTNAME;
export const getUri = (path: string): string => urlJoin(ROOT_URI, path);

