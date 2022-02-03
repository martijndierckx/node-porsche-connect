export class Application {
  public static readonly Portal = new Application(
    'Portal',
    'TZ4Vf5wnKeipJxvatJ60lPHYEzqZ4WNp',
    'https://my-static02.porsche.com/static/cms/auth.html'
  );
  public static readonly CarControl = new Application(
    'CarControl',
    'Ux8WmyzsOAGGmvmWnW7GLEjIILHEztAs',
    'https://my.porsche.com/myservices/auth/auth.html'
  );

  private constructor(private readonly key: string, public readonly clientId: string, public readonly redirectUrl: string) {}

  public toString(): string {
    return this.key;
  }
}
