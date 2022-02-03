import axios, { AxiosResponse } from 'axios';
import { PorscheConnectBase } from './PorscheConnectBase';
import { PorscheConnectAuth } from './PorscheConnect+Auth';
import { Vehicle, VehicleConfig } from './Vehicle';
import { Application } from './Application';

export class PorscheError extends Error {}
export class PorscheActionFailedError extends Error {}

export class PorscheConnect extends PorscheConnectBase {
  public async getVehicles(): Promise<Vehicle[]> {
    const res = await this.getFromApi(Application.Portal, this.routes.vehiclesURL);

    const vehicles: Vehicle[] = [];
    if (Array.isArray(res.data)) {
      await Promise.allSettled(
        res.data.map(async (v) => {
          const data = await Promise.allSettled([
            await this.getFromApi(Application.CarControl, this.routes.vehicleCapabilitiesURL(v.vin)),
            await this.getFromApi(Application.CarControl, this.routes.vehicleSummaryURL(v.vin)),
            await this.getFromApi(Application.Portal, this.routes.vehiclePermissionsURL(v.vin))
          ]);

          const capabilities = data[0].status == 'fulfilled' ? data[0].value.data : {};
          const summary = data[1].status == 'fulfilled' ? data[1].value.data : {};
          const permissions = data[2].status == 'fulfilled' ? data[2].value.data : {};

          const vehicleConfig: VehicleConfig = {
            vin: v.vin,
            modelDescription: v.modelDescription,
            modelType: v.modelType,
            modelYear: parseInt(v.modelYear),
            carModel: capabilities.carModel,
            engineType: capabilities.engineType,
            relationship: v.relationship,
            exteriorColor: v.exteriorColor,
            exteriorColorHex: v.exteriorColorHex,
            steeringWheelPosition: capabilities.steeringWheelPosition,
            nickName: summary.nickName,
            remoteCapabilities: {
              hasRDK: capabilities.hasRDK,
              hasHonkAndFlash: capabilities.hasHonkAndFlash,
              heating: {
                hasFrontSeatHeating: capabilities.heatingCapabilities.frontSeatHeatingAvailable,
                hasRearSeatHeating: capabilities.heatingCapabilities.rearSeatHeatingAvailable
              }
            },
            permissions: {
              userIsActive: permissions.userIsActive,
              userRoleStatus: permissions.userRoleStatus
            }
          };

          if (Array.isArray(v.pictures)) {
            vehicleConfig.pictures = [];
            for (const picture of v.pictures) {
              vehicleConfig.pictures.push({
                width: picture.width,
                height: picture.height,
                url: picture.url,
                view: picture.view,
                transparent: picture.transparent
              });
            }
          }

          vehicles.push(new Vehicle(this, vehicleConfig));
        })
      );
    }

    return vehicles;
  }

  public async getFromApi(app: Application, url: string): Promise<AxiosResponse> {
    const auth = await this.authIfRequired(app);
    const headers = {
      Authorization: `Bearer ${auth.accessToken}`,
      apikey: auth.apiKey,
      'x-vrs-url-country': this.env.country,
      'x-vrs-url-language': this.env.locale
    };

    try {
      let result = await axios.get(url, { headers });
      return result;
    } catch (e) {
      throw new PorscheError();
    }
  }

  public async getStatusFromApi(app: Application, url: string, retries = 10) {
    // Limit retries
    for (let i = 0; i < retries; i++) {
      const res = await this.getFromApi(app, url);

      if ((res.data.status && res.data.status == 'IN_PROGRESS') || (res.data.actionState && res.data.actionState == 'IN_PROGRESS')) {
        // Wait 1 second before polling again
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      } else {
        if (res.data.status != 'SUCCESS' && res.data.actionState != 'SUCCES') {
          throw new PorscheActionFailedError(`Non SUCCESS status returned: ${res.data.status ?? res.data.actionState}`);
        }

        return;
      }
    }

    return;
  }

  public async postToApi(app: Application, url: string, body: any = undefined): Promise<AxiosResponse> {
    const auth = await this.authIfRequired(app);
    const headers = {
      Authorization: `Bearer ${auth.accessToken}`,
      apikey: auth.apiKey,
      'x-vrs-url-country': this.env.country,
      'x-vrs-url-language': this.env.locale
    };

    try {
      let result = await axios.post(url, body, { headers });
      return result;
    } catch (e) {
      throw new PorscheError();
    }
  }
}

export interface PorscheConnect extends PorscheConnectAuth {}
applyMixins(PorscheConnect, [PorscheConnectAuth]);
function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null));
    });
  });
}