import {IRegion} from "./IRegion";

export interface IDemandArea {
    region: IRegion,
    supply: number,
    demand: number,
}