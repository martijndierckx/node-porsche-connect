import axios from 'axios';
import { PorscheConnectBase } from './PorscheConnectBase';
import { PorscheConnectAuth } from './PorscheConnect+Auth';
import type { Vehicle } from './Vehicle';
import { Application } from './Enums';

export class PorscheConnect extends PorscheConnectBase {
  public async getVehicles(): Promise<Vehicle[]> {
    const app = Application.Portal;
    const auth = await this.authIfRequired(app);

    const headers = this.buildApiRequestHeaders({
      accessToken: auth.accessToken,
      apiKey: auth.apiKey
    });

    try {
      let result = await axios.get(this.routes.vehiclesURL, { headers: headers });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
    return null;
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
