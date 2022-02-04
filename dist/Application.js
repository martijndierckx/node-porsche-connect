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
        const list = [Application.Portal, Application.Auth, Application.CarControl];
        return list.find((app) => {
            return url.startsWith(app.prefix);
        });
    }
}
exports.Application = Application;
Application.Portal = new Application('Portal', 'TZ4Vf5wnKeipJxvatJ60lPHYEzqZ4WNp', 'https://my-static02.porsche.com/static/cms/auth.html', 'https://api.porsche.com/core/api/v3/');
Application.Auth = new Application('Auth', '4mPO3OE5Srjb1iaUGWsbqKBvvesya8oA', 'https://my.porsche.com/core/de/de_DE/', 'https://api.porsche.com/core/api/v2/');
Application.CarControl = new Application('CarControl', 'Ux8WmyzsOAGGmvmWnW7GLEjIILHEztAs', 'https://my.porsche.com/myservices/auth/auth.html', 'https://api.porsche.com/');
//# sourceMappingURL=Application.js.map