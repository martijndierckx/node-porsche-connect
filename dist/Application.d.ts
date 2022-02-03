export declare class Application {
    private readonly key;
    readonly clientId: string;
    readonly redirectUrl: string;
    static readonly Portal: Application;
    static readonly CarControl: Application;
    private constructor();
    toString(): string;
}
