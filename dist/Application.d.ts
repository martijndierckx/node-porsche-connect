export declare class Application {
    private readonly key;
    readonly clientId: string;
    readonly redirectUrl: string;
    readonly prefix: string;
    readonly apiKey?: string;
    static readonly API: Application;
    static readonly Profile: Application;
    static readonly Auth: Application;
    static readonly CarControl: Application;
    private constructor();
    toString(): string;
    static getFromUrl(url: string): Application;
}
