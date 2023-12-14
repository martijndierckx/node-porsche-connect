"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorscheConnectAuth = exports.PorscheAuthError = exports.AccountTemporarilyLocked = exports.WrongCredentialsError = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const ApiAuthorization_1 = require("./ApiAuthorization");
const Application_1 = require("./Application");
const PorscheConnect_1 = require("./PorscheConnect");
const PorscheConnectBase_1 = require("./PorscheConnectBase");
class WrongCredentialsError extends Error {
}
exports.WrongCredentialsError = WrongCredentialsError;
class AccountTemporarilyLocked extends Error {
}
exports.AccountTemporarilyLocked = AccountTemporarilyLocked;
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
        const apiAuthCode = await this.login();
        this.auths[app.toString()] = await this.getAccessToken(app, apiAuthCode);
    }
    async attemptLogin() {
        const app = Application_1.Application.Auth;
        const loginUrl = this.routes.loginAuthorizeURL(app.clientId, app.redirectUrl);
        try {
            const result = await this.client.get(loginUrl, { maxRedirects: 0, validateStatus: null });
            const authUrl = new URL(result.headers['location'], 'http://127.0.0.1');
            const code = authUrl.searchParams.get('code');
            const state = authUrl.searchParams.get('state');
            return { code, state };
        }
        catch (e) {
            if (axios_1.default.isAxiosError(e) && e.response && e.response.status && e.response.status >= 500 && e.response.status <= 503) {
                throw new PorscheConnect_1.PorscheServerError();
            }
            throw new PorscheAuthError();
        }
    }
    async login() {
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
        let resumeUrl;
        // Authenticate
        try {
            const userBody = {
                "state": state,
                "username": this.username,
                "js-available": "true",
                "webauthn-available": "false",
                "is-brave": "false",
                "webauthn-platform-available": "false",
                "action": "default",
            };
            var formBody = this.buildPostFormBody(userBody);
            await this.client.post(this.routes.loginIdentifier(state), formBody, { maxRedirects: 30 });
            const passwordBody = {
                "state": state,
                "username": this.username,
                "password": this.password,
                "action": "default"
            };
            var formBody = this.buildPostFormBody(passwordBody);
            const passwordResult = await this.client.post(this.routes.loginPassword(state), formBody, { maxRedirects: 0, validateStatus: function (status) { return status >= 200 && status <= 302; } });
            resumeUrl = passwordResult.headers.location;
        }
        catch (e) {
            if (axios_1.default.isAxiosError(e) && e.response && e.response.status == 401) {
                throw new WrongCredentialsError();
            }
            else if (axios_1.default.isAxiosError(e) && e.response && e.response.status && e.response.status >= 500 && e.response.status <= 503) {
                throw new PorscheConnect_1.PorscheServerError();
            }
            throw new PorscheAuthError();
        }
        // Wait 2 seconds
        await new Promise((resolve) => {
            setTimeout(resolve, 2500);
        });
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
    async getAccessToken(app, code) {
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