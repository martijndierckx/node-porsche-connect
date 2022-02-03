"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.NotSupportedError = exports.WrongPinError = void 0;
const Application_1 = require("./Application");
const VehicleEnums_1 = require("./VehicleEnums");
class WrongPinError extends Error {
}
exports.WrongPinError = WrongPinError;
class NotSupportedError extends Error {
}
exports.NotSupportedError = NotSupportedError;
class Vehicle {
    constructor(porscheConnect, opts) {
        this.porscheConnect = porscheConnect;
        this.vin = opts.vin;
        this.modelDescription = opts.modelDescription;
        this.modelType = opts.modelType;
        this.modelYear = opts.modelYear;
        this.carModel = opts.carModel;
        this.engineType = opts.engineType;
        this.exteriorColor = opts.exteriorColor;
        this.exteriorColorHex = opts.exteriorColorHex;
        this.steeringWheelPosition = opts.steeringWheelPosition;
        this.pictures = opts.pictures;
        this.nickname = opts.nickName;
        this.remoteCapabilities = opts.remoteCapabilities;
        this.permissions = opts.permissions;
    }
    async getPosition() {
        const res = await this.porscheConnect.getFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehiclePositionURL(this));
        return res.data;
    }
    async getEmobilityInfo() {
        if ([VehicleEnums_1.EngineType.BatteryPowered, VehicleEnums_1.EngineType.PluginHybrid].includes(this.engineType)) {
            const res = await this.porscheConnect.getFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleEmobilityURL(this));
            return res.data;
        }
        return null;
    }
    async toggleDirectCharge(on, waitForConfirmation = false) {
        const res = await this.porscheConnect.postToApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleToggleDirectChargingURL(this, on));
        if (waitForConfirmation) {
            await this.porscheConnect.getStatusFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleToggleDirectChargingStatusURL(this, res.data.requestId));
        }
    }
    async enableDirectCharge(waitForConfirmation = false) {
        await this.toggleDirectCharge(true, waitForConfirmation);
    }
    async disableDirectCharge(waitForConfirmation = false) {
        await this.toggleDirectCharge(false, waitForConfirmation);
    }
    async toggleClimate(on, waitForConfirmation = false) {
        const res = await this.porscheConnect.postToApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleToggleClimateURL(this, on));
        if (waitForConfirmation) {
            await this.porscheConnect.getStatusFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleToggleClimateStatusURL(this, res.data.requestId));
        }
    }
    async enableClimate(waitForConfirmation = false) {
        await this.toggleClimate(true, waitForConfirmation);
    }
    async disableClimate(waitForConfirmation = false) {
        await this.toggleClimate(false, waitForConfirmation);
    }
    async honkAndOrFlash(honkAlso, waitForConfirmation = false) {
        if (this.remoteCapabilities.hasHonkAndFlash) {
            const res = await this.porscheConnect.postToApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleHonkAndOrFlashURL(this, honkAlso));
            if (waitForConfirmation) {
                await this.porscheConnect.getStatusFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleHonkAndOrFlashStatusURL(this, res.data.id));
            }
        }
        else {
            throw new NotSupportedError();
        }
    }
    async honkAndFlash(waitForConfirmation = false) {
        await this.honkAndOrFlash(true, waitForConfirmation);
    }
    async flash(waitForConfirmation = false) {
        await this.honkAndOrFlash(false, waitForConfirmation);
    }
    async toggleLocked(lock, pin, waitForConfirmation = false) {
        const res = await this.porscheConnect.postToApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleToggleLockedURL(this, lock), {
            pin
        });
        if (res.data.pcckErrorKey == 'INCORRECT')
            throw new WrongPinError(`PIN code was incorrect`);
        if (res.data.pcckErrorKey == 'LOCKED_60_MINUTES')
            throw new WrongPinError(`Too many failed attempts, locked 60 minutes`);
        if (waitForConfirmation) {
            await this.porscheConnect.getStatusFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleToggleLockedStatusURL(this, res.data.requestId));
        }
    }
    async lock(pin, waitForConfirmation = false) {
        await this.toggleLocked(true, pin, waitForConfirmation);
    }
    async unlock(pin, waitForConfirmation = false) {
        await this.toggleLocked(false, pin, waitForConfirmation);
    }
    async getStoredOverview() {
        const res = await this.porscheConnect.getFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleStoredOverviewURL(this));
        return res.data;
    }
    async getCurrentOverview() {
        const req = await this.porscheConnect.postToApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleCurrentOverviewInvokeURL(this));
        await this.porscheConnect.getStatusFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleCurrentOverviewStatusURL(this, req.data.requestId), 60);
        const res = await this.porscheConnect.getFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleCurrentOverviewDataURL(this, req.data.requestId));
        return res.data;
    }
    async getMaintenanceInfo() {
        const res = await this.porscheConnect.getFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleMaintenanceInfoURL(this));
        return res.data;
    }
    async getTripInfo(longTermOverview = false) {
        const res = await this.porscheConnect.getFromApi(Application_1.Application.CarControl, this.porscheConnect.routes.vehicleTripsUrl(this, longTermOverview));
        return res.data;
    }
}
exports.Vehicle = Vehicle;
//# sourceMappingURL=Vehicle.js.map