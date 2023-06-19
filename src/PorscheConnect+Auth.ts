import axios from 'axios';
import { parse } from 'node-html-parser';
import { ApiAuthorization } from './ApiAuthorization';
import { Application } from './Application';
import { PorscheServerError } from './PorscheConnect';
import { PorscheConnectBase } from './PorscheConnectBase';

export class WrongCredentialsError extends Error {}
export class AccountTemporarilyLocked extends Error {}
export class PorscheAuthError extends Error {}

export abstract class PorscheConnectAuth extends PorscheConnectBase {
  protected isAuthorized(app: Application): boolean {
    if (this.auths[app.toString()] === undefined) return false;
    if (this.auths[app.toString()].isExpired) return false;

    return true;
  }

  protected async authIfRequired(app: Application): Promise<ApiAuthorization> {
    if (!this.isAuthorized(app)) {
      await this.auth(app);
    }

    return this.auths[app.toString()];
  }

  private async auth(app: Application) {
    const apiAuthCode = await this.login();
    this.auths[app.toString()] = await this.getAccessToken(app, apiAuthCode);
  }

  private async attemptLogin(): Promise<{ code: string; state: string }> {
    const app = Application.Auth;
    const loginUrl = this.routes.loginAuthorizeURL(app.clientId, app.redirectUrl);

    try {
      const result = await this.client.get(loginUrl, { maxRedirects: 0, validateStatus: null });
      const authUrl = new URL(result.headers['location'], 'http://127.0.0.1');

      const code = authUrl.searchParams.get('code');
      const state = authUrl.searchParams.get('state');

      return { code, state };
    } catch (e) {
      if (axios.isAxiosError(e) && e.response && e.response.status && e.response.status >= 500 && e.response.status <= 503) {
        throw new PorscheServerError();
      }
      throw new PorscheAuthError();
    }
  }

  private async login(): Promise<string> {
    const app = Application.Auth;

    // Initiate login, and capture state
    let { code, state } = await this.attemptLogin();

    // Already have a code, so skip login
    if (code) {
      return code;
    }

    // State received?
    if (!state || state.length <= 0) {
      throw new PorscheAuthError('No state returned when trying to login');
    }

    // Authenticate
    const callbackBody = {};
    try {
      const loginBody = {
        sec: 'high',
        username: this.username,
        password: this.password,
        code_challenge_method: 'S256',
        redirect_uri: 'https://my.porsche.com/',
        ui_locales: 'de-DE',
        audience: 'https://api.porsche.com',
        client_id: app.clientId,
        connection: 'Username-Password-Authentication',
        state: state,
        tenant: 'porsche-production',
        response_type: 'code'
      };
      const formBody = this.buildPostFormBody(loginBody);
      const result = await this.client.post(this.routes.loginUsernamePasswordURL, formBody, { maxRedirects: 30 });

      // Parse HTML
      const html = parse(result.data);
      const hiddenInputs = html.querySelectorAll('input[type=hidden]');

      // Capture data from hidden input fields
      for (const hiddenInput of hiddenInputs) {
        callbackBody[hiddenInput.attrs.name] = hiddenInput.attrs.value;
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response && e.response.status == 401) {
        throw new WrongCredentialsError();
      } else if (axios.isAxiosError(e) && e.response && e.response.status && e.response.status >= 500 && e.response.status <= 503) {
        throw new PorscheServerError();
      }
      throw new PorscheAuthError();
    }

    // Callback key-values received?
    if (Object.keys(callbackBody).length <= 0) {
      throw new PorscheAuthError('No callback key values received');
    }

    // Wait 2 seconds
    await new Promise((resolve) => {
      setTimeout(resolve, 2500);
    });

    // Callback
    let resumeUrl: string;
    try {
      const result = await this.client.post(this.routes.loginCallbackURL, callbackBody, { maxRedirects: 0, validateStatus: null });
      resumeUrl = result.headers['location'];
    } catch (e) {
      if (axios.isAxiosError(e) && e.response && e.response.status && e.response.status >= 500 && e.response.status <= 503) {
        throw new PorscheServerError();
      }
      throw new PorscheAuthError();
    }

    // Did we receive a resume URL?
    if (!resumeUrl) {
      throw new PorscheAuthError('No Auth Resume URL recieved');
    }

    // Wait 2 seconds
    await new Promise((resolve) => {
      setTimeout(resolve, 2500);
    });

    // Get Code
    const res = await this.attemptLogin();

    // Already have a code, so skip login
    if (!res.code) {
      throw new PorscheAuthError('No code received');
    }

    return res.code;
  }

  private async getAccessToken(app: Application, code: string): Promise<ApiAuthorization> {
    const apiTokenBody = {
      client_id: app.clientId,
      redirect_uri: app.redirectUrl,
      code: code,
      grant_type: 'authorization_code'
    };
    const formBody = this.buildPostFormBody(apiTokenBody);

    try {
      const result = await this.client.post(this.routes.accessTokenURL, formBody);
      if (result.data.access_token && result.data.id_token && result.data.expires_in) {
        const auth = new ApiAuthorization(result.data.access_token, result.data.id_token, parseInt(result.data.expires_in));
        return auth;
      } else {
        throw new PorscheAuthError();
      }
    } catch (e) {
      throw new PorscheAuthError();
    }
  }
}
