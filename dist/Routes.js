"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    constructor(locale) {
        this.env = locale;
    }
    get loginAuthURL() {
        return `https://login.porsche.com/auth/api/v1/${this.env.country}/${this.env.locale}/public/login`;
    }
    get apiAuthURL() {
        return 'https://login.porsche.com/as/authorization.oauth2';
    }
    get apiTokenURL() {
        return 'https://login.porsche.com/as/token.oauth2';
    }
    get vehiclesURL() {
        return `https://api.porsche.com/core/api/v3/${this.env.country}/${this.env.locale}/vehicles`;
    }
    vehiclePermissionsURL(vin) {
        return `https://api.porsche.com/core/api/v2/${this.env.country}/${this.env.locale}/vehicles/${vin}/permissions`;
    }
    vehicleSummaryURL(vin) {
        return `https://api.porsche.com/service-vehicle/vehicle-summary/${vin}`;
    }
    vehicleCapabilitiesURL(vin) {
        return `https://api.porsche.com/service-vehicle/vcs/capabilities/${vin}`;
    }
    vehiclePositionURL(vehicle) {
        return `https://api.porsche.com/service-vehicle/car-finder/${vehicle.vin}/position`;
    }
    vehicleEmobilityURL(vehicle) {
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.carModel}/${vehicle.vin}?timezone=${this.env.timeZone}`;
    }
    vehicleToggleDirectChargingURL(vehicle, on) {
        const action = on ? 'true' : 'false';
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.carModel}/${vehicle.vin}/toggle-direct-charging/${action}`;
    }
    vehicleToggleDirectChargingStatusURL(vehicle, requestId) {
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.carModel}/${vehicle.vin}/toggle-direct-charging/status/${requestId}`;
    }
    vehicleToggleClimateURL(vehicle, on) {
        const action = on ? 'true' : 'false';
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.vin}/toggle-direct-climatisation/${action}`;
    }
    vehicleToggleClimateStatusURL(vehicle, requestId) {
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.vin}/toggle-direct-climatisation/status/${requestId}`;
    }
    vehicleToggleLockedURL(vehicle, lock) {
        const action = lock ? 'lock' : 'unlock';
        return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vehicle.vin}/${action}`;
    }
    vehicleToggleLockedStatusURL(vehicle, requestId) {
        return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vehicle.vin}/${requestId}/status`;
    }
    vehicleHonkAndOrFlashURL(vehicle, honkAlso) {
        const action = honkAlso ? 'honk-and-flash' : 'flash';
        return `https://api.porsche.com/service-vehicle/honk-and-flash/${vehicle.vin}/${action}`;
    }
    vehicleHonkAndOrFlashStatusURL(vehicle, requestId) {
        return `https://api.porsche.com/service-vehicle/honk-and-flash/${vehicle.vin}/${requestId}/status`;
    }
    vehicleStoredOverviewURL(vehicle) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/stored`;
    }
    vehicleCurrentOverviewInvokeURL(vehicle) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/current/request`;
    }
    vehicleCurrentOverviewStatusURL(vehicle, requestId) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/current/request/${requestId}/status`;
    }
    vehicleCurrentOverviewDataURL(vehicle, requestId) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/current/${requestId}`;
    }
    vehicleMaintenanceInfoURL(vehicle) {
        return `https://api.porsche.com/predictive-maintenance/information/${vehicle.vin}`;
    }
    vehicleTripsUrl(vehicle, longTerm) {
        const term = longTerm ? 'LONG_TERM/newest' : 'SHORT_TERM';
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/trips/${vehicle.vin}/${term}`;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map