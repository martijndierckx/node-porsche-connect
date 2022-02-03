import type { Environment } from './Locale';
import type { Vehicle } from './Vehicle';
export declare class Routes {
    private env;
    constructor(locale: Environment);
    get loginAuthURL(): string;
    get apiAuthURL(): string;
    get apiTokenURL(): string;
    get vehiclesURL(): string;
    vehiclePermissionsURL(vin: string): string;
    vehicleSummaryURL(vin: string): string;
    vehicleCapabilitiesURL(vin: string): string;
    vehiclePositionURL(vehicle: Vehicle): string;
    vehicleEmobilityURL(vehicle: Vehicle): string;
    vehicleToggleDirectChargingURL(vehicle: Vehicle, on: boolean): string;
    vehicleToggleDirectChargingStatusURL(vehicle: Vehicle, requestId: string): string;
    vehicleToggleClimateURL(vehicle: Vehicle, on: boolean): string;
    vehicleToggleClimateStatusURL(vehicle: Vehicle, requestId: string): string;
    vehicleToggleLockedURL(vehicle: Vehicle, lock: boolean): string;
    vehicleToggleLockedStatusURL(vehicle: Vehicle, requestId: string): string;
    vehicleHonkAndOrFlashURL(vehicle: Vehicle, honkAlso: boolean): string;
    vehicleHonkAndOrFlashStatusURL(vehicle: Vehicle, requestId: string): string;
    vehicleStoredOverviewURL(vehicle: Vehicle): string;
    vehicleCurrentOverviewInvokeURL(vehicle: Vehicle): string;
    vehicleCurrentOverviewStatusURL(vehicle: Vehicle, requestId: string): string;
    vehicleCurrentOverviewDataURL(vehicle: Vehicle, requestId: string): string;
    vehicleMaintenanceInfoURL(vehicle: Vehicle): string;
    vehicleTripsUrl(vehicle: Vehicle, longTerm: boolean): string;
}
