export declare class ApiAuthorization {
    private expiresAt;
    readonly accessToken: string;
    readonly apiKey: string;
    constructor(accessToken: string, idToken: string, expiresIn: number);
    get isExpired(): boolean;
}
