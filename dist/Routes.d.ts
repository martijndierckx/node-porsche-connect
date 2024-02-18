import type { Environment } from './Environment';
export declare class Routes {
    private env;
    constructor(locale: Environment);
    loginAuthorizeURL(clientId: string, redirectUri: string): string;
    loginIdentifier(state: string): string;
    loginPassword(state: string): string;
    get resumeAuthURL(): string;
    get accessTokenURL(): string;
    get vehiclesURL(): string;
    vehiclePermissionsURL(vin: string): string;
    vehicleSummaryURL(vin: string): string;
    vehicleServicesURL(vin: string): string;
    vehicleCapabilitiesURL(vin: string): string;
    vehiclePositionURL(vin: string): string;
    vehicleEmobilityURL(vin: string, carModel: string): string;
    vehicleToggleDirectChargingURL(vin: string, carModel: string, hasDX1: boolean, on: boolean): string;
    vehicleToggleDirectChargingStatusURL(vin: string, carModel: string, hasDX1: any, requestId: string): string;
    vehicleToggleClimateURL(vin: string, on: boolean): string;
    vehicleToggleClimateStatusURL(vin: string, requestId: string): string;
    vehicleToggleLockedURL(vin: string, lock: boolean): string;
    vehicleToggleLockedStatusURL(vin: string, requestId: string): string;
    vehicleHonkAndOrFlashURL(vin: string, honkAlso: boolean): string;
    vehicleHonkAndOrFlashStatusURL(vin: string, requestId: string): string;
    vehicleStoredOverviewURL(vin: string): string;
    vehicleCurrentOverviewInvokeURL(vin: string): string;
    vehicleCurrentOverviewStatusURL(vin: string, requestId: string): string;
    vehicleCurrentOverviewDataURL(vin: string, requestId: string): string;
    vehicleMaintenanceInfoURL(vin: string): string;
    vehicleTripsUrl(vin: string, longTerm: boolean): string;
}
