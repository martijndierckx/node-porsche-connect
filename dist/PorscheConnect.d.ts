import { AxiosResponse } from 'axios';
import { PorscheConnectBase } from './PorscheConnectBase';
import { PorscheConnectAuth } from './PorscheConnect+Auth';
import { Vehicle } from './Vehicle';
import { Application } from './Application';
import { PorscheConnectVehicle } from './PorscheConnect+Vehicle';
export declare class PorscheError extends Error {
}
export declare class PorscheActionFailedError extends Error {
}
export declare class PorscheServerError extends Error {
}
export declare class PorscheConnect extends PorscheConnectBase {
    getVehicles(): Promise<Vehicle[]>;
    protected getFromApi(app: Application, url: string): Promise<AxiosResponse>;
    protected getStatusFromApi(app: Application, url: string, retries?: number): Promise<void>;
    protected postToApi(app: Application, url: string, body?: any): Promise<AxiosResponse>;
}
export interface PorscheConnect extends PorscheConnectAuth, PorscheConnectVehicle {
}
