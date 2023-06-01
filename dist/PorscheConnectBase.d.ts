/// <reference types="node" />
import { Routes } from './Routes';
import { Axios, AxiosResponse } from 'axios';
import type { ApiAuthorization } from './ApiAuthorization';
import { Environment } from './Environment';
export type PorscheConnectConfig = {
    username: string;
    password: string;
    env?: Environment;
};
export declare abstract class PorscheConnectBase {
    protected readonly env: Environment;
    protected readonly routes: Routes;
    protected client: Axios;
    protected readonly username: string;
    protected readonly password: string;
    protected auths: {
        [app: string]: ApiAuthorization;
    };
    constructor(opts: PorscheConnectConfig);
    protected buildPostFormBody(data: {
        [key: string]: string | number;
    }): URLSearchParams;
    protected abstract postToApi(url: string, body?: any): Promise<AxiosResponse>;
    protected abstract getFromApi(url: string): Promise<AxiosResponse>;
    protected abstract getStatusFromApi(url: string, retries?: number): Promise<void>;
}
