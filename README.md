# Porsche Connect

[![npm](https://badgen.net/npm/v/porsche-connect)](https://www.npmjs.com/package/porsche-connect)

A nodejs package which allows reading values from Porsche Connect enabled vehicles like:

- Taycan
- 911 (from 992)
- Cayenne (from 2017, E3)
- Panamera (from 2021, G2 PA)

An active Porsche Connect subscription is required!

:warning: This work is not officially supported by Porsche and functionality can stop working at any time without warning

## Install

`npm i --save porsche-connect`

## Example

```javascript
import PorscheConnect from 'porsche-connect';

const porsche = new PorscheConnect({ username: 'YOUR USERNAME', password: 'YOUR PASSWORD' });
const vehicles = await porsche.getVehicles();

const taycan = vehicles[0];
const tripInfo = await taycan.getTripInfo();
```

## Vehicle info
```javascript
{
    vin: 'WPXXXXYYYYYZZZZ00',
    modelDescription: 'Taycan 4S',
    modelType: 'Y1ADB1',
    modelYear: 2020,
    carModel: 'J1',
    engineType: 'BEV',
    exteriorColor: 'Gentiaanblauw metallic/Gentiaanblauw metallic',
    exteriorColorHex: '#3b322c',
    steeringWheelPosition: 'LEFT',
    pictures: [],
    nickname: 'My Precious',
    remoteCapabilities: {
        hasRDK: true,
        hasHonkAndFlash: false,
        heating: {
            hasFrontSeatHeating: true,
            hasRearSeatHeating: true
        }
    },
    permissions: { 
        userIsActive: true,
        userRoleStatus: 'ENABLED'
    }
}
```

## Vehicle Methods
:information_source: Not all methods are available on all vehicles.

* **getPosition()**

  Retrieves GPS coordinates
* **getEmobilityInfo()**

  Retrieves a detailed battery & charging status for Battery Electric Vehicles & Plugin Hybrids
* **enableDirectCharge()** and **disableDirectCharge()**

  Enables or Disables the 'Direct Charge' setting on Electric Vehicles
* **enableClimate()** and **disableClimate()**

  Enables or Disables the climate control to pre-heat/cool the vehicle
* **honkAndFlash()** and **flash()**
* **lock()** and **unlock()**
* **getStoredOverview()**

  Retrieves the cached overall status of the vehicle
* **getCurrentOverview()**

  Retrieves the up-to-date overall status of the vehicle. (Could take a while...)
* **getMaintenanceInfo()**
* **getTripInfo()**
  
  Lists recent trips or an overview including distance & fuel consumption


:zap: Use a proper code editor like Visual Studio Code which will help you with **IntelliSense & inline documentation**.

## Credits

Thanks to the guys at [Driven App](https://github.com/driven-app/porsche-connect) and [pyporscheconnectapi](https://github.com/CJNE/pyporscheconnectapi) for their work in Swift/Python, on which this repo is based.

Thanks to [jasper-seinhorst](https://github.com/jasper-seinhorst) and [bigkraig](https://github.com/bigkraig) for their contributions.

This package is provided as a small hobby project. Once everything is up and running in my setup at home, my motivation to maintain this repo might drop, so contributions are very welcome!
