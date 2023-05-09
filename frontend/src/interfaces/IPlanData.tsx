import {ICoordinate} from "./ICoordinate";

export interface IPlanData {
    operator: string,
    location: ICoordinate,
    nextTask: string,
}