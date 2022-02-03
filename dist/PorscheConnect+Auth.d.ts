import { ApiAuthorization } from './ApiAuthorization';
import type { Application } from './Application';
import { PorscheConnectBase } from './PorscheConnectBase';
export declare class WrongCredentialsError extends Error {
}
export declare class PorscheAuthError extends Error {
}
export declare class PorscheConnectAuth extends PorscheConnectBase {
    protected isAuthorized(app: Application): boolean;
    protected authIfRequired(app: Application): Promise<ApiAuthorization>;
    private auth;
    private loginToRetrieveCookies;
    private getApiAuthCode;
    private getApiToken;
}
