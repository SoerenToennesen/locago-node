import {IOperator} from "./IOperator";
import {IVehicle} from "./IVehicle";
import {IDemandArea} from "./IDemandArea";
import {ITask} from "./ITask";

export interface IRoute {
    operator: IOperator,
    vehicles: IVehicle[],
    demandArea: IDemandArea,
    order: ITask[],
}