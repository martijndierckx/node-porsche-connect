export class Application {
  public static readonly Portal = new Application(
    'Portal',
    'TZ4Vf5wnKeipJxvatJ60lPHYEzqZ4WNp',
    'https://my-static02.porsche.com/static/cms/auth.html',
    'https://api.porsche.com/core/api/v3/'
  );
  public static readonly Auth = new Application(
    'Auth',
    '4mPO3OE5Srjb1iaUGWsbqKBvvesya8oA',
    'https://my.porsche.com/core/de/de_DE/',
    'https://api.porsche.com/core/api/v2/'
  );
  public static readonly CarControl = new Application(
    'CarControl',
    'Ux8WmyzsOAGGmvmWnW7GLEjIILHEztAs',
    'https://my.porsche.com/myservices/auth/auth.html',
    'https://api.porsche.com/'
  );

  private constructor(
    private readonly key: string,
    public readonly clientId: string,
    public readonly redirectUrl: string,
    public readonly prefix: string
  ) {}

  public toString(): string {
    return this.key;
  }

  public static getFromUrl(url: string): Application {
    const list = [Application.Portal, Application.Auth, Application.CarControl];
    return list.find((app) => {
      return url.startsWith(app.prefix);
    });
  }
}
