import type { Environment } from './Environment';

export class Routes {
  private env: Environment;

  public constructor(locale: Environment) {
    this.env = locale;
  }

  public loginAuthorizeURL(clientId: string, redirectUri: string): string {
    return `https://identity.porsche.com/authorize?response_type=code&client_id=${clientId}&code_challenge_method=S256&redirect_uri=${redirectUri}&ui_locales=${this.env.hyphenatedLocale}&audience=https://api.porsche.com&scope=openid%20profile%20email%20pid:user_profile.addresses:read%20pid:user_profile.birthdate:read%20pid:user_profile.dealers:read%20pid:user_profile.emails:read%20pid:user_profile.locale:read%20pid:user_profile.name:read%20pid:user_profile.phones:read%20pid:user_profile.porscheid:read%20pid:user_profile.vehicles:read%20pid:user_profile.vehicles:register`
  }

  public loginIdentifier(state: string): string {
    return `https://identity.porsche.com/u/login/identifier?state=${state}`;
  }

  public loginPassword(state: string): string{
    return `https://identity.porsche.com/u/login/password?state=${state}`;
  }

  public get resumeAuthURL(): string {
    return `https://identity.porsche.com/`;
  }

  public get accessTokenURL(): string {
    return 'https://identity.porsche.com/oauth/token';
  }

  public get vehiclesURL(): string {
    return `https://api.porsche.com/core/api/v3/${this.env.country}/${this.env.locale}/vehicles`;
  }

  public vehiclePermissionsURL(vin: string): string {
    return `https://api.porsche.com/core/api/v2/${this.env.country}/${this.env.locale}/vehicles/${vin}/permissions`;
  }

  public vehicleSummaryURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/vehicle-summary/${vin}`;
  }

  public vehicleServicesURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/service-access/${vin}/details`;
  }

  public vehicleCapabilitiesURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/vcs/capabilities/${vin}`;
  }

  public vehiclePositionURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/car-finder/${vin}/position`;
  }

  public vehicleEmobilityURL(vin: string, carModel: string): string {
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}?timezone=${this.env.timeZone}`;
  }

  public vehicleToggleDirectChargingURL(vin: string, carModel: string, on: boolean, hasDX1: boolean): string {
    const action = on ? 'true' : 'false';
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/${action}?hasDX1=${hasDX1}`;
  }

  public vehicleToggleDirectChargingStatusURL(vin: string, carModel: string, on: boolean, requestId: string): string {
    const action = on ? 'true' : 'false';
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/status/${requestId}?toggledOn=${action}`;
  }

  public vehicleToggleClimateURL(vin: string, on: boolean): string {
    const action = on ? 'true' : 'false';
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vin}/toggle-direct-climatisation/${action}`;
  }

  public vehicleToggleClimateStatusURL(vin: string, requestId: string): string {
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vin}/toggle-direct-climatisation/status/${requestId}`;
  }

  public vehicleToggleLockedURL(vin: string, lock: boolean): string {
    const action = lock ? 'lock' : 'unlock';
    return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vin}/${action}`;
  }

  public vehicleToggleLockedStatusURL(vin: string, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vin}/${requestId}/status`;
  }

  public vehicleHonkAndOrFlashURL(vin: string, honkAlso: boolean): string {
    const action = honkAlso ? 'honk-and-flash' : 'flash';
    return `https://api.porsche.com/service-vehicle/honk-and-flash/${vin}/${action}`;
  }

  public vehicleHonkAndOrFlashStatusURL(vin: string, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/honk-and-flash/${vin}/${requestId}/status`;
  }

  public vehicleStoredOverviewURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/stored`;
  }

  public vehicleCurrentOverviewInvokeURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/current/request`;
  }

  public vehicleCurrentOverviewStatusURL(vin: string, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/current/request/${requestId}/status`;
  }

  public vehicleCurrentOverviewDataURL(vin: string, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vin}/current/request/${requestId}`;
  }

  public vehicleMaintenanceInfoURL(vin: string): string {
    return `https://api.porsche.com/predictive-maintenance/information/${vin}`;
  }

  public vehicleTripsUrl(vin: string, longTerm: boolean): string {
    const term = longTerm ? 'LONG_TERM/newest' : 'SHORT_TERM';
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/trips/${vin}/${term}`;
  }
}
