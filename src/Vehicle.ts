import type { VehicleAttribute, VehicleEmobility, VehiclePicture, VehicleCapabilities } from './Enums';

export class Vehicle {
  public vin: string;
  public modelDescription: string;
  public modelType: string;
  public modelYear: string;
  public exteriorColor: string;
  public attributes: [VehicleAttribute];
  public pictures: [VehiclePicture];
  public capabilities: VehicleCapabilities;
  public emobility: VehicleEmobility;
}
