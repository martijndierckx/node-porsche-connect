import type { PorscheConnect } from './PorscheConnect';
import { Application } from './Application';
import type { Moment } from 'moment';

export class WrongPinError extends Error {}

export type VehicleConfig = {
  vin: string;
  modelDescription: string;
  modelType: string;
  modelYear: number;
  carModel: string;
  engineType: EngineType;
  relationship: string;
  exteriorColor: string;
  exteriorColorHex: string;
  steeringWheelPosition: SteeringWheelPosition;
  pictures?: VehiclePicture[];
  nickName: string | null;
  remoteCapabilities: VehicleCapabilities;
  permissions: {
    userIsActive: boolean;
    userRoleStatus: 'ENABLED' | string;
  };
};

export type VehicleCapabilities = {
  hasRDK?: boolean;
  hasHonkAndFlash?: boolean;
  heating?: {
    hasFrontSeatHeating?: boolean;
    hasRearSeatHeating?: boolean;
  };
};

export type VehiclePicture = {
  width: number;
  height: number;
  url: string;
  view: string;
  transparent: boolean;
};

export type VehicleEMobility = {
  batteryChargeStatus: {
    plugState: PlugState;
    lockState: LockState;
    chargingState: ChargingState;
    chargingReason: string; // 'INVALID'
    externalPowerSupplyState: string; // 'UNAVAILABLE'
    chargingMode: ChargingMode;
    stateOfChargeInPercentage: number;
    remainingChargeTimeUntil100PercentInMinutes: number | null;
    remainingERange: {
      value: number;
      unit: 'KILOMETER' | string;
      originalValue: number;
      originalUnit: 'KILOMETER' | string;
      valueInKilometers: number;
    };
    remainingCRange: null;
    chargingTargetDateTime: Moment;
    status: null;
    chargeRate: {
      value: number;
      unit: 'KM_PER_MIN' | string;
      valueInKmPerHour: number;
    };
    chargingPower: number; // kW
    chargingTargetDateTimeOplEnforced: null;
    chargingInDCMode: boolean;
  };
  directCharge: {
    disabled: boolean;
    isActive: boolean;
  };
  directClimatisation: {
    climatisationState: ClimatisationState;
    remainingClimatisationTime: number | null;
  };
  chargingStatus: ChargingStatus;
  timers: ChargingTimer[];
  climateTimer: null;
  chargingProfiles: {
    currentProfileId: number;
    profiles: ChargingProfile[];
  };
};

export type ChargingTimer = {
  timerID: string; // '1'
  departureDateTime: Moment;
  preferredChargingTimeEnabled: boolean;
  preferredChargingStartTime: null;
  preferredChargingEndTime: null;
  frequency: ChargeTimerFrequency;
  climatised: boolean;
  weekDays: {
    MONDAY: boolean;
    TUESDAY: boolean;
    WEDNESDAY: boolean;
    THURSDAY: boolean;
    FRIDAY: boolean;
    SATURDAY: boolean;
    SUNDAY: boolean;
  } | null;
  active: boolean;
  chargeOption: boolean;
  targetChargeLevel: number;
  e3_CLIMATISATION_TIMER_ID: string; // '1'
  climatisationTimer: boolean;
};

export type ChargingProfile = {
  chargingOptions: {
    minimumChargeLevel: number;
    preferredChargingEnabled: boolean;
    preferredChargingTimeEnd: string; // '07:15'
    preferredChargingTimeStart: string; // '07:00'
    smartChargingEnabled: boolean;
  };
  position: {
    latitude: number;
    longitude: number;
  };
  profileActive: boolean;
  profileId: number;
  profileName: string;
};

export enum PlugState {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED'
}

export enum LockState {
  Locked = 'LOCKED',
  Unlocked = 'UNLOCKED'
}

export enum ChargingState {
  On = 'ON',
  Off = 'OFF'
}

export enum ChargingStatus {
  NotCharging = 'NOT_CHARGING',
  Charging = 'CHARGING'
}

export enum ChargingMode {
  On = 'ON',
  Off = 'OFF'
}

export enum ClimatisationState {
  On = 'ON',
  Off = 'OFF'
}

export enum ChargeTimerFrequency {
  Cyclic = 'CYCLIC',
  Single = 'SINGLE'
}

export type VehiclePosition = {
  carCoordinate: {
    latitude: number;
    longitude: number;
  };
  heading: number;
};

export type VehiclePermissions = {};

export enum SteeringWheelPosition {
  Left = 'LEFT',
  Right = 'RIGHT'
}

export enum EngineType {
  Combustion = 'COMBUSTION',
  BatteryPowered = 'BEV',
  PluginHybrid = 'PHEV'
}

export class Vehicle {
  private readonly porscheConnect: PorscheConnect;
  public readonly vin: string;
  public readonly modelDescription: string;
  public readonly modelType: string;
  public readonly modelYear: number;
  public readonly carModel: string;
  public readonly engineType: EngineType;
  public readonly exteriorColor: string;
  public readonly exteriorColorHex: string;
  public readonly steeringWheelPosition: SteeringWheelPosition;
  public readonly pictures: VehiclePicture[];
  public readonly nickname: string | null;
  public readonly remoteCapabilities: VehicleCapabilities;
  public readonly permissions: {
    userIsActive: boolean;
    userRoleStatus: 'ENABLED' | string;
  };

  public constructor(porscheConnect, opts: VehicleConfig) {
    this.porscheConnect = porscheConnect;
    this.vin = opts.vin;
    this.modelDescription = opts.modelDescription;
    this.modelType = opts.modelType;
    this.modelYear = opts.modelYear;
    this.carModel = opts.carModel;
    this.engineType = opts.engineType;
    this.exteriorColor = opts.exteriorColor;
    this.exteriorColorHex = opts.exteriorColorHex;
    this.steeringWheelPosition = opts.steeringWheelPosition;
    this.pictures = opts.pictures;
    this.nickname = opts.nickName;
    this.remoteCapabilities = opts.remoteCapabilities;
    this.permissions = opts.permissions;
  }

  public async getPosition(): Promise<VehiclePosition> {
    const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehiclePositionURL(this));
    return res.data;
  }

  public async getEmobility(): Promise<VehicleEMobility> {
    if ([EngineType.BatteryPowered, EngineType.PluginHybrid].includes(this.engineType)) {
      const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehicleEmobilityURL(this));
      return res.data;
    }

    return null;
  }

  public async toggleDirectCharge(on: boolean, waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleToggleDirectChargingURL(this, on));

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(
        Application.CarControl,
        this.porscheConnect.routes.vehicleToggleDirectChargingStatusURL(this, res.data.requestId)
      );
    }
  }

  public async toggleClimate(on: boolean, waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleToggleClimateURL(this, on));

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(
        Application.CarControl,
        this.porscheConnect.routes.vehicleToggleClimateStatusURL(this, res.data.requestId)
      );
    }
  }

  public async honkAndFlash(waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleHonkAndFlashURL(this));

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(Application.CarControl, this.porscheConnect.routes.vehicleHonkAndFlashStatusURL(this, res.data.id));
    }
  }

  public async flash(waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleFlashURL(this));

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(Application.CarControl, this.porscheConnect.routes.vehicleFlashStatusURL(this, res.data.id));
    }
  }

  public async toggleLocked(lock: boolean, pin: string, waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleToggleLockedURL(this, lock), {
      pin
    });

    if (res.data.pcckErrorKey == 'INCORRECT') throw new WrongPinError(`PIN code was incorrect`);
    if (res.data.pcckErrorKey == 'LOCKED_60_MINUTES') throw new WrongPinError(`Too many failed attempts, locked 60 minutes`);

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(
        Application.CarControl,
        this.porscheConnect.routes.vehicleToggleLockedStatusURL(this, res.data.requestId)
      );
    }
  }

  public async getStoredOverview(): Promise<any> {
    const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehicleStoredOverviewURL(this));
    return res.data;
  }

  public async getCurrentOverview(): Promise<any> {
    const req = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleCurrentOverviewInvokeURL(this));
    await this.porscheConnect.getStatusFromApi(
      Application.CarControl,
      this.porscheConnect.routes.vehicleCurrentOverviewStatusURL(this, req.data.requestId)
    );
    const res = await this.porscheConnect.postToApi(
      Application.CarControl,
      this.porscheConnect.routes.vehicleCurrentOverviewDataURL(this, req.data.requestId)
    );
    return res.data;
  }

  public async getMaintenanceInfo(): Promise<any> {
    const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehicleMaintenanceInfoURL(this));
    return res.data;
  }
}
