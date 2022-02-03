/// <reference types="node" />
import { Routes } from './Routes';
import { Axios } from 'axios';
import type { ApiAuthorization } from './ApiAuthorization';
import { Environment } from './Locale';
export declare type PorscheConnectConfig = {
    username: string;
    password: string;
    env?: Environment;
};
export declare class PorscheConnectBase {
    protected readonly env: Environment;
    readonly routes: Routes;
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
}
