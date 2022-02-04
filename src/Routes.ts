import type { Environment } from './Locale';
import type { Vehicle } from './Vehicle';

export class Routes {
  private env: Environment;

  public constructor(locale: Environment) {
    this.env = locale;
  }

  public get loginAuthURL(): string {
    return `https://login.porsche.com/auth/api/v1/${this.env.country}/${this.env.locale}/public/login`;
  }

  public get apiAuthURL(): string {
    return 'https://login.porsche.com/as/authorization.oauth2';
  }

  public get apiTokenURL(): string {
    return 'https://login.porsche.com/as/token.oauth2';
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

  public vehicleCapabilitiesURL(vin: string): string {
    return `https://api.porsche.com/service-vehicle/vcs/capabilities/${vin}`;
  }

  public vehiclePositionURL(vehicle: Vehicle): string {
    return `https://api.porsche.com/service-vehicle/car-finder/${vehicle.vin}/position`;
  }

  public vehicleEmobilityURL(vehicle: Vehicle): string {
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.carModel}/${vehicle.vin}?timezone=${this.env.timeZone}`;
  }

  public vehicleToggleDirectChargingURL(vehicle: Vehicle, on: boolean): string {
    const action = on ? 'true' : 'false';
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.carModel}/${vehicle.vin}/toggle-direct-charging/${action}`;
  }

  public vehicleToggleDirectChargingStatusURL(vehicle: Vehicle, requestId: string): string {
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.carModel}/${vehicle.vin}/toggle-direct-charging/status/${requestId}`;
  }

  public vehicleToggleClimateURL(vehicle: Vehicle, on: boolean): string {
    const action = on ? 'true' : 'false';
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.vin}/toggle-direct-climatisation/${action}`;
  }

  public vehicleToggleClimateStatusURL(vehicle: Vehicle, requestId: string): string {
    return `https://api.porsche.com/e-mobility/${this.env.country}/${this.env.locale}/${vehicle.vin}/toggle-direct-climatisation/status/${requestId}`;
  }

  public vehicleToggleLockedURL(vehicle: Vehicle, lock: boolean): string {
    const action = lock ? 'lock' : 'unlock';
    return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vehicle.vin}/${action}`;
  }

  public vehicleToggleLockedStatusURL(vehicle: Vehicle, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/remote-lock-unlock/${vehicle.vin}/${requestId}/status`;
  }

  public vehicleHonkAndOrFlashURL(vehicle: Vehicle, honkAlso: boolean): string {
    const action = honkAlso ? 'honk-and-flash' : 'flash';
    return `https://api.porsche.com/service-vehicle/honk-and-flash/${vehicle.vin}/${action}`;
  }

  public vehicleHonkAndOrFlashStatusURL(vehicle: Vehicle, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/honk-and-flash/${vehicle.vin}/${requestId}/status`;
  }

  public vehicleStoredOverviewURL(vehicle: Vehicle): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/stored`;
  }

  public vehicleCurrentOverviewInvokeURL(vehicle: Vehicle): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/current/request`;
  }

  public vehicleCurrentOverviewStatusURL(vehicle: Vehicle, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/current/request/${requestId}/status`
  }

  public vehicleCurrentOverviewDataURL(vehicle: Vehicle, requestId: string): string {
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/vehicle-data/${vehicle.vin}/current/request/${requestId}`;
  }

  public vehicleMaintenanceInfoURL(vehicle: Vehicle): string {
    return `https://api.porsche.com/predictive-maintenance/information/${vehicle.vin}`;
  }

  public vehicleTripsUrl(vehicle: Vehicle, longTerm: boolean): string {
    const term = longTerm ? 'LONG_TERM/newest' : 'SHORT_TERM';
    return `https://api.porsche.com/service-vehicle/${this.env.country}/${this.env.locale}/trips/${vehicle.vin}/${term}`;
  }
}
