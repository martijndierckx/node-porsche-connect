import { EngineType, SteeringWheelPosition } from './VehicleEnums';
import type { VehiclePicture, VehicleCapabilities, VehicleConfig, VehiclePosition, VehicleEMobility, VehicleOverview, TripInfo } from './VehicleTypes';
export declare class NotSupportedError extends Error {
}
export declare class Vehicle {
    private readonly porscheConnect;
    readonly vin: string;
    readonly modelDescription: string;
    readonly modelType: string;
    readonly modelYear: number;
    readonly carModel: string;
    readonly engineType: EngineType;
    readonly exteriorColor: string;
    readonly exteriorColorHex: string;
    readonly steeringWheelPosition: SteeringWheelPosition;
    readonly pictures: VehiclePicture[];
    readonly nickname: string | null;
    readonly remoteCapabilities: VehicleCapabilities;
    readonly permissions: {
        userIsActive: boolean;
        userRoleStatus: 'ENABLED' | string;
    };
    constructor(porscheConnect: any, opts: VehicleConfig);
    getPosition(): Promise<VehiclePosition>;
    getEmobilityInfo(): Promise<VehicleEMobility>;
    enableDirectCharge(waitForConfirmation?: boolean): Promise<void>;
    disableDirectCharge(waitForConfirmation?: boolean): Promise<void>;
    enableClimate(waitForConfirmation?: boolean): Promise<void>;
    disableClimate(waitForConfirmation?: boolean): Promise<void>;
    honkAndFlash(waitForConfirmation?: boolean): Promise<void>;
    flash(waitForConfirmation?: boolean): Promise<void>;
    lock(pin: string, waitForConfirmation?: boolean): Promise<void>;
    unlock(pin: string, waitForConfirmation?: boolean): Promise<void>;
    getStoredOverview(): Promise<VehicleOverview>;
    getCurrentOverview(): Promise<VehicleOverview>;
    getMaintenanceInfo(): Promise<any>;
    getTripInfo(longTermOverview?: boolean): Promise<TripInfo[]>;
}
