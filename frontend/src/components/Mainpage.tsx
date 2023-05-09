import React, {useRef, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Overview} from "../pages/Overview";
import {Dashboard} from "../pages/Dashboard";
import {Plan} from "../pages/Plan";
import {Map} from "../pages/Map";
import {History} from "../pages/History";
import {Account} from "../pages/Account";
import {DoesntExist} from "../pages/DoesntExist";
import styled from "styled-components";
import {IRoute} from "../interfaces/IRoute";
import {IVehicle} from "../interfaces/IVehicle";
import {IOperator} from "../interfaces/IOperator";
import {IDemandArea} from "../interfaces/IDemandArea";
import {IHub} from "../interfaces/IHub";

export const MainPageContainer = styled.div<{}>`
    border-radius: 30px;
    background: #f2f2f2;
    overflow-y: auto;
    display: flex;
    flex-flow: row;
    flex: 1;
    padding: 50px 50px;
    height: 100%;
`;

export function Mainpage () {
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [operators, setOperators] = useState<IOperator[]>([]);
    const [demandAreas, setDemandAreas] = useState<IDemandArea[]>([]);
    const [routes, setRoutes] = useState<IRoute[]>([]);
    const [hubs, setHubs] = useState<IHub[]>([]);
    const [operatorOpen, setOperatorOpen] = useState("");

    return (
        <div style={{marginTop: '50px', marginRight: '50px', marginBottom: '50px', display: 'flex', flex:'1'}}>
            <MainPageContainer>
                <Routes>
                    <Route path="/" element={<Overview />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/plan" element={
                        <Plan
                            routes={routes}
                            setOperatorOpen={(operatorId: string) => setOperatorOpen(operatorId)}
                        />
                    } />
                    <Route path="/map" element={
                        <Map
                            operators={operators}
                            setOperators={(operators: IOperator[]) => setOperators(operators)}
                            vehicles={vehicles}
                            setVehicles={(vehicles: IVehicle[]) => setVehicles(vehicles)}
                            demandAreas={demandAreas}
                            setDemandAreas={(demandAreas: IDemandArea[]) => setDemandAreas(demandAreas)}
                            routes={routes}
                            setRoutes={(routes: IRoute[]) => setRoutes(routes)}
                            hubs={hubs}
                            setHubs={(hubs: IHub[]) => setHubs(hubs)}
                            operatorOpen={operatorOpen}
                            setOperatorOpen={(operatorId: string) => setOperatorOpen(operatorId)}
                        />
                    } />
                    <Route path="/history" element={<History />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/*" element={<DoesntExist />} />
                </Routes>
            </MainPageContainer>
        </div>
    )
}
