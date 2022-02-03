"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorscheConnectBase = void 0;
const tslib_1 = require("tslib");
const Routes_1 = require("./Routes");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const PersistentAxios = (0, tslib_1.__importStar)(require("axios-cookiejar-support"));
const tough_cookie_1 = require("tough-cookie");
const Locale_1 = require("./Locale");
class PorscheConnectBase {
    constructor(opts) {
        this.auths = {};
        this.username = opts.username;
        this.password = opts.password;
        this.env = opts.env ?? Locale_1.Environment.de_DE;
        this.routes = new Routes_1.Routes(this.env);
        this.client = PersistentAxios.wrapper(axios_1.default.create({ jar: new tough_cookie_1.CookieJar() }));
    }
    buildPostFormBody(data) {
        const params = new URLSearchParams();
        for (const [key, val] of Object.entries(data)) {
            params.append(key, val.toString());
        }
        return params;
    }
}
exports.PorscheConnectBase = PorscheConnectBase;
//# sourceMappingURL=PorscheConnectBase.js.map