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
    vehiclePositionURL(vin) {
        return `https://api.porsche.com/service-vehicle/car-finder/${vin}/position`;
    }
    vehicleEmobilityURL(vin, carModel) {
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}?timezone=${this.env.timeZone}`;
    }
    vehicleToggleDirectChargingURL(vin, carModel, on) {
        const action = on ? 'true' : 'false';
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/${action}`;
    }
    vehicleToggleDirectChargingStatusURL(vin, carModel, requestId) {
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/status/${requestId}`;
    }
    vehicleToggleClimateURL(vin, on) {
        const action = on ? 'true' : 'false';
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vin}/toggle-direct-climatisation/${action}`;
    }
    vehicleToggleClimateStatusURL(vin, requestId) {
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vin}/toggle-direct-climatisation/status/${requestId}`;
    }
    vehicleToggleLockedURL(vin, lock) {
        const action = lock ? 'lock' : 'unlock';
        return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vin}/${action}`;
    }
    vehicleToggleLockedStatusURL(vin, requestId) {
        return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vin}/${requestId}/status`;
    }
    vehicleHonkAndOrFlashURL(vin, honkAlso) {
        const action = honkAlso ? 'honk-and-flash' : 'flash';
        return `https://api.porsche.com/service-vehicle/honk-and-flash/${vin}/${action}`;
    }
    vehicleHonkAndOrFlashStatusURL(vin, requestId) {
        return `https://api.porsche.com/service-vehicle/honk-and-flash/${vin}/${requestId}/status`;
    }
    vehicleStoredOverviewURL(vin) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/stored`;
    }
    vehicleCurrentOverviewInvokeURL(vin) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/current/request`;
    }
    vehicleCurrentOverviewStatusURL(vin, requestId) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/current/request/${requestId}/status`;
    }
    vehicleCurrentOverviewDataURL(vin, requestId) {
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/current/request/${requestId}`;
    }
    vehicleMaintenanceInfoURL(vin) {
        return `https://api.porsche.com/predictive-maintenance/information/${vin}`;
    }
    vehicleTripsUrl(vin, longTerm) {
        const term = longTerm ? 'LONG_TERM/newest' : 'SHORT_TERM';
        return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/trips/${vin}/${term}`;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map