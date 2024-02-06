"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
class Environment {
    constructor(country, locale, timeZone) {
        this.country = country;
        this.locale = locale;
        this.timeZone = timeZone;
    }
}
exports.Environment = Environment;
//public static readonly ie_EN = new Environment('ie', 'en_IE', 'Europe/Dublin');
Environment.nl_BE = new Environment('be', 'nl_NL', 'Europe/Brussels');
Environment.nl_NL = new Environment('nl', 'nl_NL', 'Europe/Amsterdam');
Environment.de_DE = new Environment('de', 'de_DE', 'Europe/Berlin');
//# sourceMappingURL=Environment.js.map