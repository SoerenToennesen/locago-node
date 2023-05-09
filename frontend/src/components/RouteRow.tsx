import React, {useEffect} from "react";
import styled from "styled-components";
import {IRoute} from "../interfaces/IRoute";
import {Card} from "./Card";
import {LightButton} from "./LightButton";
import {ICoordinate} from "../interfaces/ICoordinate";
import {IVehicle} from "../interfaces/IVehicle";
import {IOperator} from "../interfaces/IOperator";
import {ITask} from "../interfaces/ITask";
import {Link} from "react-router-dom";

const Column = styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
`;

const Row = styled.div`
    display: flex;
    flex-flow: row;
    align-items: baseline;
    
    & h4 {
        min-width: 90px;
    }
`;

const DottedLine = styled.div<{width: number, height: number, marginLeft?: number, marginRight?: number}>`
    border: none;
    border-top: ${props => props.height}px dotted var(--sidebar-accent);
    width: ${props => props.width}px;
    margin-left: ${props => props.marginLeft? props.marginLeft : 0}px;
    margin-right: ${props => props.marginRight? props.marginRight : 0}px;
`

const Circle = styled.div<{textSize: string, background?: string}>`
    background: ${props => props.background ? props.background : "var(--sidebar)"};
    border-radius: 1000px;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-white);
    font-size: ${props => props.textSize ? props.textSize : "50px"};
`;

const statusToColorMap: any = {
    0: "var(--status-complete)",
    1: "var(--status-active)",
    2: "var(--status-inactive)",
}
const statusToSymbolMap: any = {
    0: "bi bi-check-lg",
    1: "bi bi-gear-fill",
    2: "bi bi-exclamation-lg",
}

export const RouteRow: React.FC<{
    route: IRoute, withOperator?: boolean, renderFirst?: boolean,
}> = ({route, withOperator, renderFirst}) => {
    return <div style={{gap: '20px', marginBottom: '10px'}}>
        {!withOperator ? null :
            <Card style={{
                flex: '0.2',
                flexFlow: 'column',
                alignItems: 'center',
                padding: '20px',
                width: '180px',
                minWidth: '180px',
                maxWidth: '180px',
                marginBottom: '10px',
                background: '#ffffff'
            }}>
                <h3 style={{marginBottom: "10px"}}>{route.operator.name}</h3>
                <LightButton onClick={() => console.log("Clicked route")}>
                    Show on map
                </LightButton>
            </Card>
        }
        <Card style={{
            flex: '0.9',
            gap: '0px',
            alignItems: 'center',
            padding: '20px',
            marginBottom: '0px',
            background: 'var(--text-white)',
        }}>
            {route.vehicles.map((vehicle: IVehicle, idx: number) => (
                <Column key={idx}>
                    <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                        <DottedLine height={3} width={100} marginRight={15} />
                        {route.order[idx].current && renderFirst ?
                            <div style={{position: "absolute", marginLeft: "40px", marginTop: "-35px", fontSize: "150%", color: "var(--sidebar)"}}>
                                <i className="bi bi-person-fill" />
                            </div>
                        : null}
                        <Circle textSize={"14px"} background={
                            route.order[idx].current ? "var(--status-active)" : route.order[idx].complete ? "var(--status-complete)" : "var(--status-inactive)"
                        }>
                            {vehicle.name}
                        </Circle>
                    </div>
                </Column>
            ))}
            <Column>
                <div style={{position: "relative", display: "flex", alignItems: "center"}}>
                    <DottedLine height={3} width={100} marginRight={10} />
                    {route.order[route.order.length - 1].current ?
                        <div style={{position: "absolute", marginLeft: "40px", marginTop: "-35px", fontSize: "150%", color: "var(--sidebar)"}}>
                            <i className="bi bi-person-fill" />
                        </div>
                    : null}
                    <Circle textSize={"15px"} style={{position: "relative"}} background={
                        route.order[route.order.length - 1].current ? "var(--status-active)" : route.order[route.order.length - 1].complete ? "var(--status-complete)" : "var(--status-inactive)"
                    }>
                        <div>{"Goal"}</div>
                    </Circle>
                </div>
            </Column>
        </Card>
    </div>
}

export const RouteRowMultiple: React.FC<{
    operator: IOperator,
    routes: IRoute[],
    setOperatorOpen: any,
}> = ({operator, routes, setOperatorOpen}) => {
    var completed = 0;
    var tasksLeft = 0;
    for (let i = 0; i < routes.length; i++) {
        for (let j = 0; j < routes[i].order.length; j++) {
            if (routes[i].order[j].complete) completed++;
            else tasksLeft++;
        }
    }

    return <div style={{display: 'flex', gap: '20px', marginBottom: '10px'}}>
        <Card style={{
            flex: '0.2',
            flexFlow: 'column',
            alignItems: 'center',
            padding: '20px',
            width: '180px',
            minWidth: '180px',
            maxWidth: '180px',
            marginBottom: '10px',
            background: '#ffffff',
            position: "relative",
        }}>
            <h3 style={{marginBottom: "10px"}}>{operator.name}</h3>
            <h4 style={{marginTop: "10px"}}>Working hrs:</h4><h5>13.00 - 17.00</h5>
            <h4 style={{marginTop: "10px"}}>Completed:</h4><h5>{completed}</h5>
            <h4 style={{marginTop: "10px"}}>Tasks left:</h4><h5 style={{marginBottom: "20px"}}>{tasksLeft}</h5>
            <Link to="/map" style={{position: "absolute", bottom: "10px"}}>
                <LightButton onClick={() =>  console.log("Clicked show on map")}>
                    Show on map
                </LightButton>
            </Link>
        </Card>
        <div style={{width: "100%"}}>
            {routes.map((route: IRoute, idx: number) =>
                <RouteRow
                    key={idx}
                    route={route}
                    withOperator={false}
                    renderFirst={idx === 0}
                />
            )}
        </div>
    </div>
}