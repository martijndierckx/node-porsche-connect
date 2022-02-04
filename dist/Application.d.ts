export declare class Application {
    private readonly key;
    readonly clientId: string;
    readonly redirectUrl: string;
    readonly prefix: string;
    static readonly Portal: Application;
    static readonly Auth: Application;
    static readonly CarControl: Application;
    private constructor();
    toString(): string;
    static getFromUrl(url: string): Application;
}
