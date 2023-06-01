"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorscheConnectVehicle = exports.WrongPinError = void 0;
const PorscheConnectBase_1 = require("./PorscheConnectBase");
class WrongPinError extends Error {
}
exports.WrongPinError = WrongPinError;
class PorscheConnectVehicle extends PorscheConnectBase_1.PorscheConnectBase {
    async getVehiclePosition(vin) {
        const res = await this.getFromApi(this.routes.vehiclePositionURL(vin));
        return res.data;
    }
    async getVehicleEmobilityInfo(vin, carModel) {
        const res = await this.getFromApi(this.routes.vehicleEmobilityURL(vin, carModel));
        return res.data;
    }
    async toggleVehicleDirectCharge(vin, carModel, on, waitForConfirmation = false) {
        const res = await this.postToApi(this.routes.vehicleToggleDirectChargingURL(vin, carModel, on));
        if (waitForConfirmation) {
            await this.getStatusFromApi(this.routes.vehicleToggleDirectChargingStatusURL(vin, carModel, res.data.requestId));
        }
    }
    async enableVehicleDirectCharge(vin, carModel, waitForConfirmation = false) {
        await this.toggleVehicleDirectCharge(vin, carModel, true, waitForConfirmation);
    }
    async disableVehicleDirectCharge(vin, carModel, waitForConfirmation = false) {
        await this.toggleVehicleDirectCharge(vin, carModel, false, waitForConfirmation);
    }
    async toggleVehicleClimate(vin, on, waitForConfirmation = false) {
        const res = await this.postToApi(this.routes.vehicleToggleClimateURL(vin, on));
        if (waitForConfirmation) {
            await this.getStatusFromApi(this.routes.vehicleToggleClimateStatusURL(vin, res.data.requestId));
        }
    }
    async enableVehicleClimate(vin, waitForConfirmation = false) {
        await this.toggleVehicleClimate(vin, true, waitForConfirmation);
    }
    async disableVehicleClimate(vin, waitForConfirmation = false) {
        await this.toggleVehicleClimate(vin, false, waitForConfirmation);
    }
    async honkAndOrFlashVehicle(vin, honkAlso, waitForConfirmation = false) {
        const res = await this.postToApi(this.routes.vehicleHonkAndOrFlashURL(vin, honkAlso));
        if (waitForConfirmation) {
            await this.getStatusFromApi(this.routes.vehicleHonkAndOrFlashStatusURL(vin, res.data.id));
        }
    }
    async honkAndFlashVehicle(vin, waitForConfirmation = false) {
        await this.honkAndOrFlashVehicle(vin, waitForConfirmation);
    }
    async flashVehicle(vin, waitForConfirmation = false) {
        await this.honkAndOrFlashVehicle(vin, false, waitForConfirmation);
    }
    async toggleVehicleLocked(vin, lock, pin, waitForConfirmation = false) {
        const res = await this.postToApi(this.routes.vehicleToggleLockedURL(vin, lock), {
            pin
        });
        if (res.data.pcckErrorKey == 'INCORRECT')
            throw new WrongPinError(`PIN code was incorrect`);
        if (res.data.pcckErrorKey == 'LOCKED_60_MINUTES')
            throw new WrongPinError(`Too many failed attempts, locked 60 minutes`);
        if (waitForConfirmation) {
            await this.getStatusFromApi(this.routes.vehicleToggleLockedStatusURL(vin, res.data.requestId));
        }
    }
    async lockVehicle(vin, pin, waitForConfirmation = false) {
        await this.toggleVehicleLocked(vin, true, pin, waitForConfirmation);
    }
    async unlockVehicle(vin, pin, waitForConfirmation = false) {
        await this.toggleVehicleLocked(vin, false, pin, waitForConfirmation);
    }
    async getVehicleStoredOverview(vin) {
        const res = await this.getFromApi(this.routes.vehicleStoredOverviewURL(vin));
        return res.data;
    }
    async getVehicleCurrentOverview(vin) {
        const req = await this.postToApi(this.routes.vehicleCurrentOverviewInvokeURL(vin));
        await this.getStatusFromApi(this.routes.vehicleCurrentOverviewStatusURL(vin, req.data.requestId), 60);
        const res = await this.getFromApi(this.routes.vehicleCurrentOverviewDataURL(vin, req.data.requestId));
        return res.data;
    }
    async getVehicleMaintenanceInfo(vin) {
        const res = await this.getFromApi(this.routes.vehicleMaintenanceInfoURL(vin));
        return res.data;
    }
    async getVehicleTripInfo(vin, longTermOverview = false) {
        const res = await this.getFromApi(this.routes.vehicleTripsUrl(vin, longTermOverview));
        return res.data;
    }
    async getVehicleServices(vin) {
        const res = await this.getFromApi(this.routes.vehicleServicesURL(vin));
        return res.data;
    }
    async isVehicleInPrivacyMode(vin) {
        const services = await this.getVehicleServices(vin);
        return services.vehicleServiceEnabledMap['VSR'] == 'DISABLED';
    }
}
exports.PorscheConnectVehicle = PorscheConnectVehicle;
//# sourceMappingURL=PorscheConnect+Vehicle.js.map