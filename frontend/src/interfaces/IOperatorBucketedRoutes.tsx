import {IRoute} from "./IRoute";
import {IOperator} from "./IOperator";
import {ITask} from "./ITask";

export interface IOperatorBucketedRoutes {
    operator: IOperator,
    routes: IRoute[],
}