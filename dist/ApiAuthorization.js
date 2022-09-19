"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAuthorization = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
class ApiAuthorization {
    constructor(accessToken, idToken, expiresIn) {
        this.accessToken = accessToken;
        this.expiresAt = moment_1.default.unix((0, moment_1.default)().unix() + expiresIn);
        const jwt = jsonwebtoken_1.default.decode(idToken);
        this.apiKey = jwt.aud.toString();
    }
    get isExpired() {
        const now = (0, moment_1.default)();
        return this.expiresAt.isBefore(now.add(60, 'seconds'));
    }
}
exports.ApiAuthorization = ApiAuthorization;
//# sourceMappingURL=ApiAuthorization.js.map