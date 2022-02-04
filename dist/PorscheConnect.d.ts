import { AxiosResponse } from 'axios';
import { PorscheConnectBase } from './PorscheConnectBase';
import { PorscheConnectAuth } from './PorscheConnect+Auth';
import { Vehicle } from './Vehicle';
import { PorscheConnectVehicle } from './PorscheConnect+Vehicle';
export declare class PorscheError extends Error {
}
export declare class PorscheActionFailedError extends Error {
}
export declare class PorscheServerError extends Error {
}
export declare class PorscheConnect extends PorscheConnectBase {
    getVehicles(): Promise<Vehicle[]>;
    protected getFromApi(url: string): Promise<AxiosResponse>;
    protected getStatusFromApi(url: string, retries?: number): Promise<void>;
    protected postToApi(url: string, body?: any): Promise<AxiosResponse>;
}
export interface PorscheConnect extends PorscheConnectAuth, PorscheConnectVehicle {
}
