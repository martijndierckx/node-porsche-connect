"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const CLIENT_ID = 'UYsK00My6bCqJdbQhTQ0PbWmcSdIAMig';
const REDIRECT_URI = 'https://my.porsche.com/';
class Application {
    constructor(key, clientId, redirectUrl, prefix, apiKey) {
        this.key = key;
        this.clientId = clientId;
        this.redirectUrl = redirectUrl;
        this.prefix = prefix;
        this.apiKey = apiKey;
    }
    toString() {
        return this.key;
    }
    static getFromUrl(url) {
        const list = [Application.API, Application.Auth, Application.Profile, Application.CarControl];
        return list.find((app) => {
            return url.startsWith(app.prefix);
        });
    }
}
exports.Application = Application;
Application.API = new Application('API', CLIENT_ID, REDIRECT_URI, 'https://api.porsche.com/core/api/');
Application.Profile = new Application('Profile', CLIENT_ID, REDIRECT_URI, 'https://api.porsche.com/profiles', 'QPw3VOLAMfI7r0nmRY8ELq4RzZpZeXEE');
Application.Auth = new Application('Auth', CLIENT_ID, REDIRECT_URI, 'https://identity.porsche.com/');
Application.CarControl = new Application('CarControl', CLIENT_ID, 'https://my.porsche.com/myservices/auth/auth.html', 'https://api.porsche.com/');
//# sourceMappingURL=Application.js.map