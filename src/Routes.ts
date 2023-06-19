import type { Environment } from './Environment';

export class Routes {
  private env: Environment;

  public constructor(locale: Environment) {
    this.env = locale;
  }

  public loginAuthorizeURL(clientId: string, redirectUri: string): string {
    return `https://identity.porsche.com/authorize?response_type=code&client_id=${clientId}&code_challenge_method=S256&redirect_uri=${redirectUri}&ui_locales=de-DE&audience=https://api.porsche.com&scope=openid`;
  }

  public get loginUsernamePasswordURL(): string {
    return `https://identity.porsche.com/usernamepassword/login`;
  }

  public get loginCallbackURL(): string {
    return `https://identity.porsche.com/login/callback`;
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

  public vehicleToggleDirectChargingURL(vin: string, carModel: string, on: boolean): string {
    const action = on ? 'true' : 'false';
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/${action}`;
  }

  public vehicleToggleDirectChargingStatusURL(vin: string, carModel: string, requestId: string): string {
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${carModel}/${vin}/toggle-direct-charging/status/${requestId}`;
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
