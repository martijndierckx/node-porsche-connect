const CLIENT_ID = 'UYsK00My6bCqJdbQhTQ0PbWmcSdIAMig';
const REDIRECT_URI = 'https://my.porsche.com/';

export class Application {
  public static readonly API = new Application('API', CLIENT_ID, REDIRECT_URI, 'https://api.porsche.com/core/api/');
  public static readonly Profile = new Application(
    'Profile',
    CLIENT_ID,
    REDIRECT_URI,
    'https://api.porsche.com/profiles',
    'QPw3VOLAMfI7r0nmRY8ELq4RzZpZeXEE'
  );
  public static readonly Auth = new Application('Auth', CLIENT_ID, REDIRECT_URI, 'https://identity.porsche.com/');
  public static readonly CarControl = new Application(
    'CarControl',
    CLIENT_ID,
    'https://my.porsche.com/myservices/auth/auth.html',
    'https://api.porsche.com/'
  );

  private constructor(
    private readonly key: string,
    public readonly clientId: string,
    public readonly redirectUrl: string,
    public readonly prefix: string,
    public readonly apiKey?: string
  ) {}

  public toString(): string {
    return this.key;
  }

  public static getFromUrl(url: string): Application {
    const list = [Application.API, Application.Auth, Application.Profile, Application.CarControl];
    return list.find((app) => {
      return url.startsWith(app.prefix);
    });
  }
}
