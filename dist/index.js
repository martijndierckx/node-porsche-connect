"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportedError = exports.WrongPinError = exports.Vehicle = exports.WrongCredentialsError = exports.PorscheAuthError = exports.PorscheError = void 0;
const tslib_1 = require("tslib");
const PorscheConnect_1 = require("./PorscheConnect");
exports.default = PorscheConnect_1.PorscheConnect;
var PorscheConnectBase_1 = require("./PorscheConnectBase");
var PorscheConnect_2 = require("./PorscheConnect");
Object.defineProperty(exports, "PorscheError", { enumerable: true, get: function () { return PorscheConnect_2.PorscheError; } });
var PorscheConnect_Auth_1 = require("./PorscheConnect+Auth");
Object.defineProperty(exports, "PorscheAuthError", { enumerable: true, get: function () { return PorscheConnect_Auth_1.PorscheAuthError; } });
Object.defineProperty(exports, "WrongCredentialsError", { enumerable: true, get: function () { return PorscheConnect_Auth_1.WrongCredentialsError; } });
var Vehicle_1 = require("./Vehicle");
Object.defineProperty(exports, "Vehicle", { enumerable: true, get: function () { return Vehicle_1.Vehicle; } });
Object.defineProperty(exports, "WrongPinError", { enumerable: true, get: function () { return Vehicle_1.WrongPinError; } });
Object.defineProperty(exports, "NotSupportedError", { enumerable: true, get: function () { return Vehicle_1.NotSupportedError; } });
(0, tslib_1.__exportStar)(require("./VehicleEnums"), exports);
//# sourceMappingURL=index.js.map