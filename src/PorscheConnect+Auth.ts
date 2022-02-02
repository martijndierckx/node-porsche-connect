import axios from 'axios';
import type { Application, Auth } from './Enums';
import { PorscheConnectBase } from './PorscheConnectBase';

export class PorscheConnectAuth extends PorscheConnectBase {
  protected isAuthorized(app: Application): boolean {
    if (this.auths[app] === undefined) return false;
    if (this.auths[app].expired) return false;

    return true;
  }

  protected async authIfRequired(app: Application): Promise<Auth> {
    if (!this.isAuthorized(app)) {
      // TODO: auth
      this.auth(app);
    }

    return this.auths[app];
  }

  private async auth(app: Application) {
    const loginToRetrieveCookiesResponse = await this.loginToRetrieveCookies();
    const apiAuthCodeResult = await this.getApiAuthCode(app);
    const apiTokenResult = await getApiToken(app, apiAuthCodeResult.codeVerifier, apiAuthCodeResult.code);
    this.auths[app] = apiTokenResult.data;
  }

  private async loginToRetrieveCookies() {
    const loginBody = { username: this.username, password: this.password, keeploggedin: 'false', sec: '', resume: '', thirdPartyId: '', state: '' };
    const formBody = this.buildPostFormBody(loginBody);
    try {
      const result = await axios.post(this.routes.loginAuthUrl, loginBody, { maxRedirects: 0 });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
}
