import { PorscheConnectBase } from './PorscheConnectBase';
import type { VehiclePosition, VehicleEMobility, VehicleOverview, TripInfo } from './VehicleTypes';
export declare class WrongPinError extends Error {
}
export declare abstract class PorscheConnectVehicle extends PorscheConnectBase {
    getVehiclePosition(vin: string): Promise<VehiclePosition>;
    getVehicleEmobilityInfo(vin: string, carModel: string): Promise<VehicleEMobility>;
    private toggleVehicleDirectCharge;
    enableVehicleDirectCharge(vin: string, carModel: string, waitForConfirmation?: boolean): Promise<void>;
    disableVehicleDirectCharge(vin: string, carModel: string, waitForConfirmation?: boolean): Promise<void>;
    private toggleVehicleClimate;
    enableVehicleClimate(vin: string, waitForConfirmation?: boolean): Promise<void>;
    disableVehicleClimate(vin: string, waitForConfirmation?: boolean): Promise<void>;
    private honkAndOrFlashVehicle;
    honkAndFlashVehicle(vin: string, waitForConfirmation?: boolean): Promise<void>;
    flashVehicle(vin: string, waitForConfirmation?: boolean): Promise<void>;
    private toggleVehicleLocked;
    lockVehicle(vin: string, pin: string, waitForConfirmation?: boolean): Promise<void>;
    unlockVehicle(vin: string, pin: string, waitForConfirmation?: boolean): Promise<void>;
    getVehicleStoredOverview(vin: string): Promise<VehicleOverview>;
    getVehicleCurrentOverview(vin: string): Promise<VehicleOverview>;
    getVehicleMaintenanceInfo(vin: string): Promise<any>;
    getVehicleTripInfo(vin: string, longTermOverview?: boolean): Promise<TripInfo[]>;
}
