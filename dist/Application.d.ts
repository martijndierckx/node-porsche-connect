export declare class Application {
    private readonly key;
    readonly clientId: string;
    readonly redirectUrl: string;
    readonly prefix: string;
    static readonly API: Application;
    static readonly Auth: Application;
    static readonly CarControl: Application;
    private constructor();
    toString(): string;
    static getFromUrl(url: string): Application;
}
