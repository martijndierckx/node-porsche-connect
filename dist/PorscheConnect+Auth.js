"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorscheConnectAuth = exports.PorscheAuthError = exports.WrongCredentialsError = void 0;
const tslib_1 = require("tslib");
const Crypto = (0, tslib_1.__importStar)(require("crypto"));
const ApiAuthorization_1 = require("./ApiAuthorization");
const PorscheConnectBase_1 = require("./PorscheConnectBase");
class WrongCredentialsError extends Error {
}
exports.WrongCredentialsError = WrongCredentialsError;
class PorscheAuthError extends Error {
}
exports.PorscheAuthError = PorscheAuthError;
class PorscheConnectAuth extends PorscheConnectBase_1.PorscheConnectBase {
    isAuthorized(app) {
        if (this.auths[app.toString()] === undefined)
            return false;
        if (this.auths[app.toString()].isExpired)
            return false;
        return true;
    }
    async authIfRequired(app) {
        if (!this.isAuthorized(app)) {
            await this.auth(app);
        }
        return this.auths[app.toString()];
    }
    async auth(app) {
        await this.loginToRetrieveCookies();
        const { apiAuthCode, codeVerifier } = await this.getApiAuthCode(app);
        this.auths[app.toString()] = await this.getApiToken(app, apiAuthCode, codeVerifier);
    }
    async loginToRetrieveCookies() {
        const loginBody = { username: this.username, password: this.password, keeploggedin: 'false', sec: '', resume: '', thirdPartyId: '', state: '' };
        const formBody = this.buildPostFormBody(loginBody);
        try {
            const result = await this.client.post(this.routes.loginAuthURL, formBody, { maxRedirects: 30 });
            if (result.headers['cdn-original-uri'] && result.headers['cdn-original-uri'].includes('state=WRONG_CREDENTIALS')) {
                throw new WrongCredentialsError();
            }
        }
        catch (e) {
            throw new PorscheAuthError();
        }
    }
    async getApiAuthCode(app) {
        const codeVerifier = Crypto.randomBytes(32).toString('hex');
        const codeVerifierSha = Crypto.createHash('sha256').update(codeVerifier).digest('base64');
        const codeChallenge = codeVerifierSha.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
        try {
            const result = await this.client.get(this.routes.apiAuthURL, {
                params: {
                    client_id: app.clientId,
                    redirect_uri: app.redirectUrl,
                    code_challenge: codeChallenge,
                    scope: 'openid',
                    response_type: 'code',
                    access_type: 'offline',
                    prompt: 'none',
                    code_challenge_method: 'S256'
                }
            });
            const url = new URL(result.headers['cdn-original-uri'], 'http://127.0.0.1');
            const apiAuthCode = url.searchParams.get('code');
            return { apiAuthCode, codeVerifier };
        }
        catch (e) {
            throw new PorscheAuthError();
        }
    }
    async getApiToken(app, code, codeVerifier) {
        const apiTokenBody = {
            client_id: app.clientId,
            redirect_uri: app.redirectUrl,
            code: code,
            code_verifier: codeVerifier,
            prompt: 'none',
            grant_type: 'authorization_code'
        };
        const formBody = this.buildPostFormBody(apiTokenBody);
        try {
            const result = await this.client.post(this.routes.apiTokenURL, formBody);
            if (result.data.access_token && result.data.id_token && result.data.expires_in) {
                const auth = new ApiAuthorization_1.ApiAuthorization(result.data.access_token, result.data.id_token, parseInt(result.data.expires_in));
                return auth;
            }
            else {
                throw new PorscheAuthError();
            }
        }
        catch (e) {
            throw new PorscheAuthError();
        }
    }
}
exports.PorscheConnectAuth = PorscheConnectAuth;
//# sourceMappingURL=PorscheConnect+Auth.js.map