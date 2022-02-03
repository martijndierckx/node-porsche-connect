"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorscheConnect = exports.PorscheActionFailedError = exports.PorscheError = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const PorscheConnectBase_1 = require("./PorscheConnectBase");
const PorscheConnect_Auth_1 = require("./PorscheConnect+Auth");
const Vehicle_1 = require("./Vehicle");
const Application_1 = require("./Application");
class PorscheError extends Error {
}
exports.PorscheError = PorscheError;
class PorscheActionFailedError extends Error {
}
exports.PorscheActionFailedError = PorscheActionFailedError;
class PorscheConnect extends PorscheConnectBase_1.PorscheConnectBase {
    async getVehicles() {
        const res = await this.getFromApi(Application_1.Application.Portal, this.routes.vehiclesURL);
        const vehicles = [];
        if (Array.isArray(res.data)) {
            await Promise.allSettled(res.data.map(async (v) => {
                const data = await Promise.allSettled([
                    await this.getFromApi(Application_1.Application.CarControl, this.routes.vehicleCapabilitiesURL(v.vin)),
                    await this.getFromApi(Application_1.Application.CarControl, this.routes.vehicleSummaryURL(v.vin)),
                    await this.getFromApi(Application_1.Application.Portal, this.routes.vehiclePermissionsURL(v.vin))
                ]);
                const capabilities = data[0].status == 'fulfilled' ? data[0].value.data : {};
                const summary = data[1].status == 'fulfilled' ? data[1].value.data : {};
                const permissions = data[2].status == 'fulfilled' ? data[2].value.data : {};
                const vehicleConfig = {
                    vin: v.vin,
                    modelDescription: v.modelDescription,
                    modelType: v.modelType,
                    modelYear: parseInt(v.modelYear),
                    carModel: capabilities.carModel,
                    engineType: capabilities.engineType,
                    relationship: v.relationship,
                    exteriorColor: v.exteriorColor,
                    exteriorColorHex: v.exteriorColorHex,
                    steeringWheelPosition: capabilities.steeringWheelPosition,
                    nickName: summary.nickName,
                    remoteCapabilities: {
                        hasRDK: capabilities.hasRDK,
                        hasHonkAndFlash: capabilities.hasHonkAndFlash,
                        heating: {
                            hasFrontSeatHeating: capabilities.heatingCapabilities.frontSeatHeatingAvailable,
                            hasRearSeatHeating: capabilities.heatingCapabilities.rearSeatHeatingAvailable
                        }
                    },
                    permissions: {
                        userIsActive: permissions.userIsActive,
                        userRoleStatus: permissions.userRoleStatus
                    }
                };
                if (Array.isArray(v.pictures)) {
                    vehicleConfig.pictures = [];
                    for (const picture of v.pictures) {
                        vehicleConfig.pictures.push({
                            width: picture.width,
                            height: picture.height,
                            url: picture.url,
                            view: picture.view,
                            transparent: picture.transparent
                        });
                    }
                }
                vehicles.push(new Vehicle_1.Vehicle(this, vehicleConfig));
            }));
        }
        return vehicles;
    }
    async getFromApi(app, url) {
        const auth = await this.authIfRequired(app);
        const headers = {
            Authorization: `Bearer ${auth.accessToken}`,
            apikey: auth.apiKey,
            'x-vrs-url-country': this.env.country,
            'x-vrs-url-language': this.env.locale
        };
        try {
            let result = await axios_1.default.get(url, { headers });
            return result;
        }
        catch (e) {
            throw new PorscheError();
        }
    }
    async getStatusFromApi(app, url, retries = 10) {
        // Limit retries
        for (let i = 0; i < retries; i++) {
            const res = await this.getFromApi(app, url);
            if ((res.data.status && res.data.status == 'IN_PROGRESS') || (res.data.actionState && res.data.actionState == 'IN_PROGRESS')) {
                // Wait 1 second before polling again
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 1000);
                });
            }
            else {
                const successStates = ['SUCCESS', 'SUCCESSFUL'];
                if (!successStates.includes(res.data.status) && !successStates.includes(res.data.actionState)) {
                    throw new PorscheActionFailedError(`Non SUCCESS status returned: ${res.data.status ?? res.data.actionState}`);
                }
                return;
            }
        }
        return;
    }
    async postToApi(app, url, body = undefined) {
        const auth = await this.authIfRequired(app);
        const headers = {
            Authorization: `Bearer ${auth.accessToken}`,
            apikey: auth.apiKey,
            'x-vrs-url-country': this.env.country,
            'x-vrs-url-language': this.env.locale
        };
        try {
            let result = await axios_1.default.post(url, body, { headers });
            return result;
        }
        catch (e) {
            throw new PorscheError();
        }
    }
}
exports.PorscheConnect = PorscheConnect;
applyMixins(PorscheConnect, [PorscheConnect_Auth_1.PorscheConnectAuth]);
function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
        });
    });
}
//# sourceMappingURL=PorscheConnect.js.map