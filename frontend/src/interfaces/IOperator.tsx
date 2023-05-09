import {ICompany} from "./ICompany";
import {ICoordinate} from "./ICoordinate";

export interface IOperator {
    id: string,
    name: string,
    type: string,
    company: ICompany,
    coordinate: ICoordinate,
}