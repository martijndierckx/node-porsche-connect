"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
class Routes {
    constructor(locale) {
        this.env = locale;
    }
    loginAuthorizeURL(clientId, redirectUri) {
        return `https://identity.porsche.com/authorize?response_type=code&client_id=${clientId}&code_challenge_method=S256&redirect_uri=${redirectUri}&ui_locales=${this.env.hyphenatedLocale}&audience=https://api.porsche.com&scope=openid%20profile%20email%20pid:user_profile.addresses:read%20pid:user_profile.birthdate:read%20pid:user_profile.dealers:read%20pid:user_profile.emails:read%20pid:user_profile.locale:read%20pid:user_profile.name:read%20pid:user_profile.phones:read%20pid:user_profile.porscheid:read%20pid:user_profile.vehicles:read%20pid:user_profile.vehicles:register`;
    }
    loginIdentifier(state) {
        return `https://identity.porsche.com/u/login/identifier?state=${state}`;
    }
    loginPassword(state) {
        return `https://identity.porsche.com/u/login/password?state=${state}`;
    }
    get resumeAuthURL() {
        return `https://identity.porsche.com/`;
    }
    get accessTokenURL() {
        return 'https://identity.porsche.com/oauth/token';
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
    vehicleServicesURL(vin) {
        return `https://api.porsche.com/service-vehicle/service-access/${vin}/details`;
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
    vehicleToggleDirectChargingURL(vin, carModel, on, hasDX1) {
        const action = on ? 'true' : 'false';
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/${action}?hasDX1=${hasDX1}`;
    }
    vehicleToggleDirectChargingStatusURL(vin, carModel, on, requestId) {
        const action = on ? 'true' : 'false';
        return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/status/${requestId}?toggledOn=${action}`;
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