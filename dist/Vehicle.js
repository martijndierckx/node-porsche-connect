"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = exports.NotSupportedError = void 0;
const VehicleEnums_1 = require("./VehicleEnums");
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
        return await this.porscheConnect.getVehiclePosition(this.vin);
    }
    async getEmobilityInfo() {
        if ([VehicleEnums_1.EngineType.BatteryPowered, VehicleEnums_1.EngineType.PluginHybrid].includes(this.engineType)) {
            return await this.porscheConnect.getVehicleEmobilityInfo(this.vin, this.carModel);
        }
        else {
            throw new NotSupportedError();
        }
    }
    async enableDirectCharge(waitForConfirmation = false) {
        await this.porscheConnect.enableVehicleDirectCharge(this.vin, this.carModel, this.remoteCapabilities.hasDX1, waitForConfirmation);
    }
    async disableDirectCharge(waitForConfirmation = false) {
        await this.porscheConnect.disableVehicleDirectCharge(this.vin, this.carModel, this.remoteCapabilities.hasDX1, waitForConfirmation);
    }
    async enableClimate(waitForConfirmation = false) {
        await this.porscheConnect.enableVehicleClimate(this.vin, waitForConfirmation);
    }
    async disableClimate(waitForConfirmation = false) {
        await this.porscheConnect.disableVehicleClimate(this.vin, waitForConfirmation);
    }
    async honkAndFlash(waitForConfirmation = false) {
        if (this.remoteCapabilities.hasHonkAndFlash) {
            await this.porscheConnect.honkAndFlashVehicle(this.vin, waitForConfirmation);
        }
        else {
            throw new NotSupportedError();
        }
    }
    async flash(waitForConfirmation = false) {
        if (this.remoteCapabilities.hasHonkAndFlash) {
            await this.porscheConnect.flashVehicle(this.vin, waitForConfirmation);
        }
        else {
            throw new NotSupportedError();
        }
    }
    async lock(pin, waitForConfirmation = false) {
        await await this.porscheConnect.lockVehicle(this.vin, pin, waitForConfirmation);
    }
    async unlock(pin, waitForConfirmation = false) {
        await await this.porscheConnect.unlockVehicle(this.vin, pin, waitForConfirmation);
    }
    async getStoredOverview() {
        return await this.porscheConnect.getVehicleStoredOverview(this.vin);
    }
    async getCurrentOverview() {
        return await this.porscheConnect.getVehicleCurrentOverview(this.vin);
    }
    async getMaintenanceInfo() {
        return await this.porscheConnect.getVehicleMaintenanceInfo(this.vin);
    }
    async getTripInfo(longTermOverview = false) {
        return await this.porscheConnect.getVehicleTripInfo(this.vin, longTermOverview);
    }
    async getServices() {
        return await this.porscheConnect.getVehicleServices(this.vin);
    }
    async isInPrivacyMode() {
        return await this.porscheConnect.isVehicleInPrivacyMode(this.vin);
    }
}
exports.Vehicle = Vehicle;
//# sourceMappingURL=Vehicle.js.map