"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
class Application {
    constructor(key, clientId, redirectUrl, prefix) {
        this.key = key;
        this.clientId = clientId;
        this.redirectUrl = redirectUrl;
        this.prefix = prefix;
    }
    toString() {
        return this.key;
    }
    static getFromUrl(url) {
        const list = [Application.API, Application.Auth, Application.CarControl];
        return list.find((app) => {
            return url.startsWith(app.prefix);
        });
    }
}
exports.Application = Application;
Application.API = new Application('API', '4mPO3OE5Srjb1iaUGWsbqKBvvesya8oA', 'https://my.porsche.com/core/de/de_DE', 'https://api.porsche.com/core/api/');
Application.Auth = new Application('Auth', '4mPO3OE5Srjb1iaUGWsbqKBvvesya8oA', 'https://my.porsche.com/core/de/de_DE/', 'https://login.porsche.com');
Application.CarControl = new Application('CarControl', 'Ux8WmyzsOAGGmvmWnW7GLEjIILHEztAs', 'https://my.porsche.com/myservices/auth/auth.html', 'https://api.porsche.com/');
//# sourceMappingURL=Application.js.map