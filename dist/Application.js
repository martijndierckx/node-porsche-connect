"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
class Application {
    constructor(key, clientId, redirectUrl) {
        this.key = key;
        this.clientId = clientId;
        this.redirectUrl = redirectUrl;
    }
    toString() {
        return this.key;
    }
}
exports.Application = Application;
Application.Portal = new Application('Portal', 'TZ4Vf5wnKeipJxvatJ60lPHYEzqZ4WNp', 'https://my-static02.porsche.com/static/cms/auth.html');
Application.CarControl = new Application('CarControl', 'Ux8WmyzsOAGGmvmWnW7GLEjIILHEztAs', 'https://my.porsche.com/myservices/auth/auth.html');
//# sourceMappingURL=Application.js.map