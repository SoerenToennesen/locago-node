import React, {useState} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {MapContainer, TileLayer, Marker, Popup, Circle, Polyline} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {endpointRebalancing, endpointRouting} from "../index";
import {ICoordinate} from "../interfaces/ICoordinate";
import {IRegion} from "../interfaces/IRegion";
import {IVehicle} from "../interfaces/IVehicle";
import {IOperator} from "../interfaces/IOperator";
import {IGenerateRandomInstance} from "../interfaces/IGenerateRandomInstance";
import {IDemandArea} from "../interfaces/IDemandArea";
import {IRoute} from "../interfaces/IRoute";
import {ITask} from "../interfaces/ITask";
import styled from "styled-components";
import {IHub} from "../interfaces/IHub";

export const SimpleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 5px;
    cursor: pointer;
    border: 1px solid var(--sidebar);
    border-radius: 5px;
    color: var(--sidebar);
    &:hover {
        background-color: var(--sidebar-accent);
        color: white;
    }
`

const iconWorker = renderToStaticMarkup(<div style={{fontSize: "25px", color: "blue"}}><i className="bi bi-person-fill" /></div>);
const markerIconOperator: any = L.divIcon({
    html: iconWorker,
    iconAnchor: [10, 10],
    className: 'dummy',
})
const iconVehicle = renderToStaticMarkup(<div style={{fontSize: "15px", color: "black"}}><i className="bi bi-car-front-fill" /></div>);
const markerIconVehicle: any = L.divIcon({
    html: iconVehicle,
    iconAnchor: [10, 10],
    className: 'dummy',
});

const colors = ["green", "purple", "yellow", "darkcyan", "aqua", "orange", "limegreen", "mediumturquoise", "slateblue"]

function redGreenGradientFunction(val: number): string {
    if (val == 0.0) {
        return "rgb(239,8,0)";
    } else if (val < 0.25) {
        return "rgb(241,121,3)";
    } else if (val < 0.5) {
        return "rgb(242,219,0)";
    } else if (val < 0.75) {
        return "rgb(214,241,1)";
    } else if (val < 1.0) {
        return "rgb(161,242,6)";
    } else if (val == 1.0) {
        return "rgb(19,242,3)";
    }
    return "rgb(0,0,247)"; // It's overflown
}

export function Map(props: any) {
    const {
        operators: operators, setOperators: setOperators,
        vehicles: vehicles, setVehicles: setVehicles,
        demandAreas: demandAreas, setDemandAreas: setDemandAreas,
        routes: routes, setRoutes: setRoutes,
        hubs: hubs, setHubs: setHubs,
        operatorOpen: operatorOpen, setOperatorOpen: setOperatorOpen,
    } = props;
    const [center, setCenter] = useState({lat: 45.4642, lng: 9.1900})
    const zoom = 13;

    async function handleMapData() {
        const coordinate: ICoordinate = {
            latitude: 45.4642,
            longitude: 9.1900
        };
        const region: IRegion = {
            coordinate: coordinate,
            radius: 5000
        };
        const numVehicles: number = 200;
        const numOperators: number = 5;
        const generateRandomInstanceRequest: any = {
            numVehicles: numVehicles,
            numOperators: numOperators,
            region: region,
            company: null,
            numDemandAreas: numVehicles / 5,
        };
        await fetch(endpointRouting + "routeplanner/generaterandominstance", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(generateRandomInstanceRequest),
        })
            .then((response) => response.json())
            .then((data: IGenerateRandomInstance) => {
                setRoutes([]);
                setVehicles(data.vehicles);
                setOperators(data.operators);
                setDemandAreas(data.demandAreas);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    async function handleRoutePlan() {
        if (vehicles.length === 0 || operators.length === 0 || demandAreas.length === 0) return;
        const routePlanRequest: any = {
            vehicles: vehicles,
            operators: operators,
            demandAreas: demandAreas,
        };
        await fetch(endpointRouting + "routeplanner/computerouteplan", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routePlanRequest),
        })
            .then((response) => response.json())
            .then((data: IRoute[]) => {
                setRoutes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    async function handleSimulation() {
        if (routes.length === 0) return;
        await fetch(endpointRouting + "routeplanner/simulateoperations", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routes),
        })
            .then((response) => response.json())
            .then((data: IRoute[]) => {
                setRoutes(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    async function handleHubs() {
        await fetch(endpointRebalancing + "rebalancer/hubs", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data: any) => {
                const hubs: IHub[] = JSON.parse(data);
                setHubs(hubs);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    async function handleVehs() {
        await fetch(endpointRebalancing + "rebalancer/vehicles", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data: any) => {
                const vehs: IVehicle[] = JSON.parse(data);
                for (let i = 0; i < vehs.length; i++) {
                    // @ts-ignore
                    vehs[i].coordinate = {latitude: vehs[i].latitude, longitude: vehs[i].longitude};
                }
                setVehicles(vehs);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const Vehicle = (props: any) => {
        const {vehicle: vehicle} = props;
        return (
            <Marker position={[vehicle.coordinate.latitude, vehicle.coordinate.longitude]} icon={markerIconVehicle}>
                <Popup>
                    <div style={{position: "relative"}}>
                        <div>Name: {vehicle.name}</div>
                        <div>Type: {vehicle.type}</div>
                    </div>
                </Popup>
            </Marker>
        )
    }
    const Operator = (props: any) => {
        const {operator: operator} = props;
        return (
            <Marker
                position={[operator.coordinate.latitude, operator.coordinate.longitude]}
                icon={markerIconOperator}
            >
                <Popup>
                    <div style={{position: "relative"}}>
                        <div>Name: {operator.name}</div>
                        <div>Type: {operator.type}</div>
                        <div>Stash (vehicles): 0</div>
                    </div>
                </Popup>
            </Marker>
        )
    }

    const DemandArea = (props: any) => {
        const {demandArea: demandArea} = props;
        return (
            <Circle
                color={`rgb(${((demandArea.demand - demandArea.supply) / demandArea.demand) * 255},${(demandArea.supply / demandArea.demand) * 255},0)`}
                center={[demandArea.region.coordinate.latitude, demandArea.region.coordinate.longitude]}
                radius={demandArea.region.radius}>
                <Popup>
                    <div style={{position: "relative"}}>
                        <div>Supply: {demandArea.supply}</div>
                        <div>Demand: {demandArea.demand}</div>
                    </div>
                </Popup>
            </Circle>
        )
    }
    const Hub = (props: any) => {
        const {hub: hub} = props;
        return (
            <Circle
                color={redGreenGradientFunction(hub.num_bikes_available / hub.maximum_capacity)}
                center={[hub.latitude, hub.longitude]}
                radius={15 + 2 * hub.num_bikes_available}
            >
                <Popup>
                    <div style={{position: "relative"}}>
                        <div>Supply: {hub.num_bikes_available}</div>
                        <div>Demand: N/A</div>
                        <div>Max capacity: {hub.maximum_capacity}</div>
                        <div>Street: {hub.name}</div>
                    </div>
                </Popup>
            </Circle>
        )
    }
    const Route = (props: any) => {
        const {routeNum: routeNum, route: route} = props;
        return (
            <>
                {route.order.map((arrow: ITask, idx: number) => (
                    <Polyline
                        key={idx}
                        positions={[
                            [arrow.coordinateFrom.latitude, arrow.coordinateFrom.longitude],
                            [arrow.coordinateTo.latitude, arrow.coordinateTo.longitude]
                        ]}
                        color={colors[routeNum % colors.length]}
                        weight={3}
                    />
                ))}
            </>
        )
    }
    const Vehicles = (props: any) => {
        const {} = props;
        return (
            <>
                {vehicles.map((vehicle: IVehicle, idx: any) => (
                    <Vehicle
                        key={idx}
                        vehicle={vehicle}
                    />
                ))}
            </>
        )
    }
    const Operators = (props: any) => {
        const {} = props;
        return (
            <>
                {operators.map((operator: IOperator, idx: any) => (
                    <Operator
                        key={idx}
                        operator={operator}
                    />
                ))}
            </>
        )
    }
    const DemandAreas = (props: any) => {
        const {} = props;
        return (
            <>
                {demandAreas.map((demandArea: IDemandArea, idx: any) => (
                    <DemandArea
                        key={idx}
                        demandArea={demandArea}
                    />
                ))}
            </>
        )
    }
    const Hubs = (props: any) => {
        const {} = props;
        return (
            <>
                {hubs.map((hub: IHub, idx: any) => (
                    <Hub
                        key={idx}
                        hub={hub}
                    />
                ))}
            </>
        )
    }
    const Routes = (props: any) => {
        const {} = props;
        return (
            <>
                {routes.map((route: IRoute, idx: number) => (
                    <Route
                        key={idx}
                        routeNum={idx}
                        route={route}
                    />
                ))}
            </>
        )
    }

    return (
        <div style={{height: "100%", width: "100%"}}>
            <div style={{position: "absolute", top: "5px", right: "500px"}} onClick={() => handleVehs()}>
                <SimpleButton>HandleVehs</SimpleButton>
            </div>
            <div style={{position: "absolute", top: "5px", right: "400px"}} onClick={() => handleHubs()}>
                <SimpleButton>HandleHubs</SimpleButton>
            </div>
            <div style={{position: "absolute", top: "5px", right: "10px"}} onClick={() => handleMapData()}>
                <SimpleButton>Generate data</SimpleButton>
            </div>
            {vehicles.length === 0 || operators.length === 0 || demandAreas.length === 0 ? null :
            <div style={{position: "absolute", top: "5px", right: "110px"}} onClick={() => handleRoutePlan()}>
                <SimpleButton>Compute route plan</SimpleButton>
            </div> }
            {routes.length === 0 ? null :
            <div style={{position: "absolute", top: "5px", right: "242px"}} onClick={() => handleSimulation()}>
                <SimpleButton>Simulate operations</SimpleButton>
            </div> }
            <MapContainer
                center={center}
                zoom={zoom}
            >
                {/*// @ts-ignore*/}
                <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=x3JFObp1MFwUtcvKrsz1" />
                <Vehicles />
                <DemandAreas />
                <Operators />
                <Routes />
                <Hubs />
            </MapContainer>
        </div>
    )
}
