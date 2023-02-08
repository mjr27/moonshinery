import {apiFetchDelete, apiFetchGet, apiFetchPost} from "./_urls";
import React from "react";

interface IUnknownProgram {
    program: 'unknown';
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

export type IApiProgramDto = IUnknownProgram | IMenuProgramInfo | IPotStillProgramInfo;


export async function apiGetCurrentProgram(): Promise<IApiProgramDto> {
    return apiFetchGet<IApiProgramDto>("/program");
}
export async function apiStopCurrentProgram(): Promise<void> {
    return apiFetchDelete('/program');
}

export async function apiStartPotStillProgram(): Promise<void> {
    return apiFetchPost<void>('/program/pot-still');
}

export const ProgramStateContext = React.createContext<IApiProgramDto>({
    'program': 'unknown'
});
