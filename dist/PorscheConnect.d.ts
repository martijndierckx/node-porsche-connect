import { AxiosResponse } from 'axios';
import { PorscheConnectBase } from './PorscheConnectBase';
import { PorscheConnectAuth } from './PorscheConnect+Auth';
import { Vehicle } from './Vehicle';
import { Application } from './Application';
export declare class PorscheError extends Error {
}
export declare class PorscheActionFailedError extends Error {
}
export declare class PorscheConnect extends PorscheConnectBase {
    getVehicles(): Promise<Vehicle[]>;
    getFromApi(app: Application, url: string): Promise<AxiosResponse>;
    getStatusFromApi(app: Application, url: string, retries?: number): Promise<void>;
    postToApi(app: Application, url: string, body?: any): Promise<AxiosResponse>;
}
export interface PorscheConnect extends PorscheConnectAuth {
}
