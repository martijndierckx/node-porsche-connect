import { Application, ApplicationRedirectUrl, Country, Language, PorscheConnectConfig } from './Enums';
import { Routes } from './Routes';
import axios, { Axios } from 'axios';
import * as PersistentAxios from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import type { ApiAuthorization } from './ApiAuthorization';

export class PorscheConnectBase {
  protected country: Country;
  protected language: Language;
  protected routes: Routes;
  protected client: Axios;

  protected username: string;
  protected password: string;
  protected auths: { [app: string]: ApiAuthorization } = {};

  public constructor(opts: PorscheConnectConfig) {
    this.username = opts.username;
    this.password = opts.password;

    this.country = opts.environment ?? Country.Germany;
    const key = Object.entries(Country).find(([_key, val]) => val === this.country)?.[0];
    this.language = Language[key];

    this.routes = new Routes(this.country, this.language);

    this.client = PersistentAxios.wrapper(axios.create({ jar: new CookieJar() }));
  }

  protected buildApiRequestHeaders(opts: { accessToken: string; apiKey: string }) {
    return {
      Authorization: `Bearer ${opts.accessToken}`,
      apikey: opts.apiKey,
      'x-vrs-url-country': this.country,
      'x-vrs-url-language': `${this.language}_${this.country.toUpperCase()}`
    };
  }

  protected buildPostFormBody(data: { [key: string]: string | number }): URLSearchParams {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(data)) {
      params.append(key, val.toString());
    }

    return params;
  }

  protected getRedirectUrlForApp(app: Application): string {
    const key = Object.entries(Application).find(([_key, val]) => val === app)?.[0];
    return ApplicationRedirectUrl[key];
  }
}
