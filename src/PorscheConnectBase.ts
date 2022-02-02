import FormData from 'form-data';
import { Auth, Environment, EnvironmentLanguage, PorscheConnectConfig } from './Enums';
import { Routes } from './Routes';

export class PorscheConnectBase {
  protected environment: Environment;
  protected environmentLanguage: EnvironmentLanguage;
  protected routes: Routes;

  protected username: string;
  protected password: string;
  protected auths: { [app: string]: Auth } = {};

  public constructor(opts: PorscheConnectConfig) {
    this.username = opts.username;
    this.password = opts.password;
    this.environment = opts.environment ?? Environment.Ireland;
    const key = Object.entries(Environment).find(([_key, val]) => val === this.environment)?.[0];
    this.environmentLanguage = EnvironmentLanguage[key];
    this.routes = new Routes(this.environment);
  }

  protected buildRequestHeaders(opts: { accessToken: string; apiKey: string }) {
    return {
      Authorization: `Bearer ${opts.accessToken}`,
      apikey: opts.apiKey,
      'x-vrs-url-country': this.environment,
      'x-vrs-url-language': `${this.environmentLanguage}_${this.environment.toUpperCase()}`
    };
  }

  protected buildPostFormBody(data: { [key: string]: string | number }): FormData {
    var bodyFormData = new FormData();
    for (const [key, val] of Object.entries(data)) {
      bodyFormData.append(key, val);
    }

    return bodyFormData;
  }
}
