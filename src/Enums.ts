import type { URL } from 'url';

export enum Country {
  Ireland = 'ie',
  Germany = 'de'
}

export enum Language {
  Ireland = 'en',
  Germany = 'de'
}

export type PorscheConnectConfig = {
  username: string;
  password: string;
  environment?: Country;
};

export enum Application {
  Portal = 'TZ4Vf5wnKeipJxvatJ60lPHYEzqZ4WNp',
  CarControl = 'gZLSI7ThXFB4d2ld9t8Cx2DBRvGr1zN2'
}

export enum ApplicationRedirectUrl {
  Portal = 'https://my-static02.porsche.com/static/cms/auth.html',
  CarControl = 'https://connect-portal.porsche.com/myservices/auth/auth.html'
}

export type VehicleAttribute = {
  name: string;
  value: string;
};

export type VehiclePicture = {
  url: URL;
  view: string;
  size: number;
  width: number;
  height: number;
  transparent: boolean;
  placeholder: string;
};

export type VehicleCapabilities = {
  displayParkingBrake: boolean;
  needsSPIN: boolean;
  hasRDK: boolean;
  engineType: string;
  carModel: string;
  onlineRemoteUpdateStatus: {
    editableByUser: boolean;
    active: boolean;
  };
  heatingCapabilities: {
    frontSeatHeatingAvailable: boolean;
    rearSeatHeatingAvailable: boolean;
  };
  steeringWheelPosition: string;
  hasHonkAndFlash: boolean;
};

export type VehicleEmobility = {
  batteryChargeStatus: {
    plugState: string;
    lockState: string;
    chargingState: string;
    chargingReason: string;
    externalPowerSupplyState: string;
    ledColor: string;
    ledState: string;
    chargingMode: string;
    stateOfChargeInPercentage: number;
    remainingChargeTimeUntil100PercentInMinutes?: number;
    remainingERange: {
      value: number;
      unit: string;
      originalValue: number;
      originalUnit: string;
      valueInKilometers: number;
      unitTranslationKey: string;
    };
    remainingCRange?: string; // TBD while charging
    chargingTargetDateTime: string; //2021-02-19T01:09
    status?: string; // TBD while charging
    chargeRate: {
      value: number;
      unit: string;
      valueInKmPerHour: number;
      unitTranslationKey: string; // "EC.COMMON.UNIT.KM_PER_MIN"
    };
    chargingPower: number;
    chargingInDCMode: boolean;
  };
  directCharge: {
    disabled: boolean;
    isActive: boolean;
  };
  directClimatisation: {
    climatisationState: string;
    remainingClimatisationTime?: string; // TBD when set
  };
  chargingStatus: string;
  chargingProfiles: {
    currentProfileId: number;
    profiles: {
      rofileId: number;
      profileName: string;
      profileActive: boolean;
      chargingOptions: {
        minimumChargeLevel: number;
        smartChargingEnabled: boolean;
        preferredChargingEnabled: boolean;
        preferredChargingTimeStart: string;
        preferredChargingTimeEnd: string;
      };
      position: {
        latitude: CLLocationDegrees;
        longitude: CLLocationDegrees;
      };
    }[];
  };
  climateTimer?: string; // TBD when set
  timers?: {
    timerID: string;
    departureDateTime: string;
    preferredChargingTimeEnabled: boolean;
    preferredChargingStartTime?: string;
    preferredChargingEndTime?: string;
    frequency: string;
    climatised: boolean;
    weekDays: {
      Sunday: boolean;
      Monday: boolean;
      Tuesday: boolean;
      Wednesday: boolean;
      Thursday: boolean;
      Friday: boolean;
      Saturday: boolean;
    };
    active: boolean;
    chargeOption: boolean;
    targetChargeLevel: number;
    climatisationTimer: boolean;
  }[];
};
