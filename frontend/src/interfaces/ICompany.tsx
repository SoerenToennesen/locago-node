import {IVehicle} from "./IVehicle";
import {IOperator} from "./IOperator";

export interface ICompany {
    id: string,
    name: string,
    vehicles: IVehicle[],
    operators: IOperator[],
}