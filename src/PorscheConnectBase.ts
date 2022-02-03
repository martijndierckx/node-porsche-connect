import { Routes } from './Routes';
import axios, { Axios } from 'axios';
import * as PersistentAxios from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import type { ApiAuthorization } from './ApiAuthorization';
import { Environment } from './Locale';

export type PorscheConnectConfig = {
  username: string;
  password: string;
  env?: Environment;
};

export class PorscheConnectBase {
  protected readonly env: Environment;
  public readonly routes: Routes;
  protected client: Axios;

  protected readonly username: string;
  protected readonly password: string;
  protected auths: { [app: string]: ApiAuthorization } = {};

  public constructor(opts: PorscheConnectConfig) {
    this.username = opts.username;
    this.password = opts.password;
    this.env = opts.env ?? Environment.de_DE;
    this.routes = new Routes(this.env);

    this.client = PersistentAxios.wrapper(axios.create({ jar: new CookieJar() }));
  }

  protected buildPostFormBody(data: { [key: string]: string | number }): URLSearchParams {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(data)) {
      params.append(key, val.toString());
    }

    return params;
  }
}
