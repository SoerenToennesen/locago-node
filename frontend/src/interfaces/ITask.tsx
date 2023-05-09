import {ICoordinate} from "./ICoordinate";

export interface ITask {
    coordinateFrom: ICoordinate,
    coordinateTo: ICoordinate,
    current: boolean,
    complete: boolean,
}