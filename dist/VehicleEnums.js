"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowStatus = exports.FuelType = exports.PressureUnit = exports.ChargeTimerFrequency = exports.ClimatisationState = exports.ChargingMode = exports.ChargingStatus = exports.ChargingState = exports.LockState = exports.PlugState = exports.EngineType = exports.SteeringWheelPosition = exports.SpeedUnit = exports.DistanceUnit = exports.ParkingLightStatus = exports.ParkingBreakStatus = exports.OpenStatus = exports.DoorStatus = void 0;
var DoorStatus;
(function (DoorStatus) {
    DoorStatus["ClosedUnlocked"] = "CLOSED_UNLOCKED";
    DoorStatus["ClosedLocked"] = "CLOSED_LOCKED";
    DoorStatus["Open"] = "OPEN";
    DoorStatus["Invalid"] = "INVALID";
})(DoorStatus = exports.DoorStatus || (exports.DoorStatus = {}));
var OpenStatus;
(function (OpenStatus) {
    OpenStatus["Closed"] = "CLOSED";
    OpenStatus["Open"] = "Open";
})(OpenStatus = exports.OpenStatus || (exports.OpenStatus = {}));
var ParkingBreakStatus;
(function (ParkingBreakStatus) {
    ParkingBreakStatus["Active"] = "ACTIVE";
    ParkingBreakStatus["Unactive"] = "UNACTIVE";
})(ParkingBreakStatus = exports.ParkingBreakStatus || (exports.ParkingBreakStatus = {}));
var ParkingLightStatus;
(function (ParkingLightStatus) {
    ParkingLightStatus["On"] = "ON";
    ParkingLightStatus["Off"] = "OFF";
})(ParkingLightStatus = exports.ParkingLightStatus || (exports.ParkingLightStatus = {}));
var DistanceUnit;
(function (DistanceUnit) {
    DistanceUnit["Kilometers"] = "KILOMETER";
    DistanceUnit["Miles"] = "MILE";
})(DistanceUnit = exports.DistanceUnit || (exports.DistanceUnit = {}));
var SpeedUnit;
(function (SpeedUnit) {
    SpeedUnit["Kmh"] = "KMH";
    SpeedUnit["Mph"] = "MPH";
})(SpeedUnit = exports.SpeedUnit || (exports.SpeedUnit = {}));
var SteeringWheelPosition;
(function (SteeringWheelPosition) {
    SteeringWheelPosition["Left"] = "LEFT";
    SteeringWheelPosition["Right"] = "RIGHT";
})(SteeringWheelPosition = exports.SteeringWheelPosition || (exports.SteeringWheelPosition = {}));
var EngineType;
(function (EngineType) {
    EngineType["Combustion"] = "COMBUSTION";
    EngineType["BatteryPowered"] = "BEV";
    EngineType["PluginHybrid"] = "PHEV";
})(EngineType = exports.EngineType || (exports.EngineType = {}));
var PlugState;
(function (PlugState) {
    PlugState["Connected"] = "CONNECTED";
    PlugState["Disconnected"] = "DISCONNECTED";
})(PlugState = exports.PlugState || (exports.PlugState = {}));
var LockState;
(function (LockState) {
    LockState["Locked"] = "LOCKED";
    LockState["Unlocked"] = "UNLOCKED";
})(LockState = exports.LockState || (exports.LockState = {}));
var ChargingState;
(function (ChargingState) {
    ChargingState["On"] = "ON";
    ChargingState["Off"] = "OFF";
})(ChargingState = exports.ChargingState || (exports.ChargingState = {}));
var ChargingStatus;
(function (ChargingStatus) {
    ChargingStatus["NotCharging"] = "NOT_CHARGING";
    ChargingStatus["Charging"] = "CHARGING";
})(ChargingStatus = exports.ChargingStatus || (exports.ChargingStatus = {}));
var ChargingMode;
(function (ChargingMode) {
    ChargingMode["On"] = "ON";
    ChargingMode["Off"] = "OFF";
})(ChargingMode = exports.ChargingMode || (exports.ChargingMode = {}));
var ClimatisationState;
(function (ClimatisationState) {
    ClimatisationState["On"] = "ON";
    ClimatisationState["Off"] = "OFF";
})(ClimatisationState = exports.ClimatisationState || (exports.ClimatisationState = {}));
var ChargeTimerFrequency;
(function (ChargeTimerFrequency) {
    ChargeTimerFrequency["Cyclic"] = "CYCLIC";
    ChargeTimerFrequency["Single"] = "SINGLE";
})(ChargeTimerFrequency = exports.ChargeTimerFrequency || (exports.ChargeTimerFrequency = {}));
var PressureUnit;
(function (PressureUnit) {
    PressureUnit["Bar"] = "BAR";
    PressureUnit["Psi"] = "PSI";
})(PressureUnit = exports.PressureUnit || (exports.PressureUnit = {}));
var FuelType;
(function (FuelType) {
    FuelType["Gasoline"] = "GASOLINE";
    FuelType["Diesel"] = "Diesel";
    FuelType["Electric"] = "Electric";
    FuelType["Unsupported"] = "UNSUPPORTED";
})(FuelType = exports.FuelType || (exports.FuelType = {}));
var WindowStatus;
(function (WindowStatus) {
    WindowStatus["Closed"] = "CLOSED";
    WindowStatus["Open"] = "OPEN";
    WindowStatus["Invalid"] = "INVALID";
    WindowStatus["Unsupported"] = "UNSUPPORTED";
})(WindowStatus = exports.WindowStatus || (exports.WindowStatus = {}));
//# sourceMappingURL=VehicleEnums.js.map