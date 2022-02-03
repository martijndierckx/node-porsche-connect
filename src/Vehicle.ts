import type { PorscheConnect } from './PorscheConnect';
import { Application } from './Application';
import { EngineType, SteeringWheelPosition } from './VehicleEnums';
import type {
  VehiclePicture,
  VehicleCapabilities,
  VehicleConfig,
  VehiclePosition,
  VehicleEMobility,
  VehicleOverview,
  TripInfo
} from './VehicleTypes';

export class WrongPinError extends Error {}
export class NotSupportedError extends Error {}

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

  public async getEmobilityInfo(): Promise<VehicleEMobility> {
    if ([EngineType.BatteryPowered, EngineType.PluginHybrid].includes(this.engineType)) {
      const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehicleEmobilityURL(this));
      return res.data;
    }

    return null;
  }

  private async toggleDirectCharge(on: boolean, waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleToggleDirectChargingURL(this, on));

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(
        Application.CarControl,
        this.porscheConnect.routes.vehicleToggleDirectChargingStatusURL(this, res.data.requestId)
      );
    }
  }

  public async enableDirectCharge(waitForConfirmation = false) {
    await this.toggleDirectCharge(true, waitForConfirmation);
  }

  public async disableDirectCharge(waitForConfirmation = false) {
    await this.toggleDirectCharge(false, waitForConfirmation);
  }

  private async toggleClimate(on: boolean, waitForConfirmation = false) {
    const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleToggleClimateURL(this, on));

    if (waitForConfirmation) {
      await this.porscheConnect.getStatusFromApi(
        Application.CarControl,
        this.porscheConnect.routes.vehicleToggleClimateStatusURL(this, res.data.requestId)
      );
    }
  }

  public async enableClimate(waitForConfirmation = false) {
    await this.toggleClimate(true, waitForConfirmation);
  }

  public async disableClimate(waitForConfirmation = false) {
    await this.toggleClimate(false, waitForConfirmation);
  }

  private async honkAndOrFlash(honkAlso: boolean, waitForConfirmation = false) {
    if (this.remoteCapabilities.hasHonkAndFlash) {
      const res = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleHonkAndOrFlashURL(this, honkAlso));

      if (waitForConfirmation) {
        await this.porscheConnect.getStatusFromApi(
          Application.CarControl,
          this.porscheConnect.routes.vehicleHonkAndOrFlashStatusURL(this, res.data.id)
        );
      }
    } else {
      throw new NotSupportedError();
    }
  }

  public async honkAndFlash(waitForConfirmation = false) {
    await this.honkAndOrFlash(true, waitForConfirmation);
  }

  public async flash(waitForConfirmation = false) {
    await this.honkAndOrFlash(false, waitForConfirmation);
  }

  private async toggleLocked(lock: boolean, pin: string, waitForConfirmation = false) {
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

  public async lock(pin: string, waitForConfirmation = false) {
    await this.toggleLocked(true, pin, waitForConfirmation);
  }

  public async unlock(pin: string, waitForConfirmation = false) {
    await this.toggleLocked(false, pin, waitForConfirmation);
  }

  public async getStoredOverview(): Promise<VehicleOverview> {
    const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehicleStoredOverviewURL(this));
    return res.data;
  }

  public async getCurrentOverview(): Promise<VehicleOverview> {
    const req = await this.porscheConnect.postToApi(Application.CarControl, this.porscheConnect.routes.vehicleCurrentOverviewInvokeURL(this));
    await this.porscheConnect.getStatusFromApi(
      Application.CarControl,
      this.porscheConnect.routes.vehicleCurrentOverviewStatusURL(this, req.data.requestId),
      60
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

  public async getTripInfo(longTermOverview = false): Promise<TripInfo[]> {
    const res = await this.porscheConnect.getFromApi(Application.CarControl, this.porscheConnect.routes.vehicleTripsUrl(this, longTermOverview));
    return res.data;
  }
}
