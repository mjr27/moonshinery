import {apiFetchDelete, apiFetchGet, apiFetchPost, ApiResponse} from "./_urls";
import React from "react";

interface IUnknownProgram {
    program: 'unknown';
}

interface IDisconnected {
    program: 'disconnected';
}

interface IMenuProgramInfo {
    program: 'menu'
    temp: number[]
    leak: number[]
    relay: number[]
}

type IPotStillProgramInfo = {
    program: 'pot-still'
    temp: number[]
    leak: number[]
    relay: number[]
    config: {
        leak_level: number;
        cool_temp: number;
        off_temp: number;
    }
} & ({
    status: 'running'
} | { status: 'error' | 'success', statusmsg: string })

export type IApiProgramDto = IUnknownProgram | IMenuProgramInfo | IDisconnected | IPotStillProgramInfo;


export async function apiGetCurrentProgram(): Promise<ApiResponse<IApiProgramDto>> {
    return apiFetchGet<IApiProgramDto>("/program");
}

export async function apiStopCurrentProgram(): Promise<ApiResponse<void>> {
    return apiFetchDelete('/program');
}

export async function apiStartPotStillProgram(): Promise<ApiResponse<void>> {
    return apiFetchPost<void>('/program/pot-still');
}

export const ProgramStateContext = React.createContext<IApiProgramDto>({
    'program': 'disconnected'
});
