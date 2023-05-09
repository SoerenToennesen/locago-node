import {IVehicle} from "./IVehicle";
import {IOperator} from "./IOperator";
import {IDemandArea} from "./IDemandArea";

export interface IGenerateRandomInstance {
    vehicles: IVehicle[],
    operators: IOperator[],
    demandAreas: IDemandArea[],
}