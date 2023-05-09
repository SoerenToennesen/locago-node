import {ICompany} from "./ICompany";
import {ICoordinate} from "./ICoordinate";

export interface IVehicle {
    id: string,
    name: string,
    type: string,
    company: ICompany,
    coordinate: ICoordinate,
    status: string, //active, picked up, inactive
}