import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Card} from "../components/Card";
import {IPlanData} from "../interfaces/IPlanData";
import {IRoute} from "../interfaces/IRoute";
import {SectionTitle} from "../components/SectionTitle";
import {GridComponent} from "../components/Grid";
import {RouteRow, RouteRowMultiple} from "../components/RouteRow";
import {IOperatorBucketedRoutes} from "../interfaces/IOperatorBucketedRoutes";
const title_img =  require("../assets/report_image.png");

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

const Circle = styled.div`
    background: var(--momstertech-grey-bg-theme);
    border-radius: 1000px;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 50px;
`;

export interface IHash {
    operator : IRoute[];
}

export function Plan(props: any) {
    const {
        routes: routes,
        setOperatorOpen: setOperatorOpen,
    } = props;
    const randNum: number = Math.random();
    const completed: number = randNum < 0.33 ? 0 : randNum < 0.66 ? 1 : 2;
    const [searchText, setSearchText] = useState("");

    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"Plan"}
                subtitle={<h6>The routes of each operator</h6>}
            />
        );
    };

    const Search = (props: any) => {
        const {
            setSearch: setSearch,
            searchValue: searchValue
        } = props;
        return (
            <div style={{gridColumn: "1 / span 8", gridRow: "3", marginTop: '-35px'}}>
                <input
                    className="form-control m-2"
                    style={{maxWidth: "300px"}}
                    placeholder="Search keyword"
                    value={searchValue}
                    onChange={(e) => {
                        setSearch(e.currentTarget.value)
                    }}
                />
            </div>
        );
    };

    function getFilteredRoutes() {
        return routes.filter((route: IRoute) => {
                route.operator.name.toString().toLowerCase().includes(searchText.toString().trim().toLowerCase()) ||
                route.operator.id.toString().toLowerCase().includes(searchText.toString().trim().toLowerCase())
            }
        );
    }

    const RoutePlan = (props: any) => {
        const {
            searchRoutes: searchRoutes,
        } = props;
        const [operaterBucketedRoutes, setOperatorBucketedRoutes] = useState<{[key: string] : IRoute[]}>({});

        useEffect(() => {
            let myHash: {[key: string] : IRoute[]} = {};
            for (let i = 0; i < searchRoutes.length; i++) {
                const route: IRoute = searchRoutes[i];
                if (myHash[route.operator.id]) {
                    myHash[route.operator.id].push(searchRoutes[i]);
                } else {
                    myHash[route.operator.id] = [searchRoutes[i]];
                }
            }
            setOperatorBucketedRoutes(myHash);
        }, [searchRoutes])

        const SectionTitle = styled.div`
            text-align: center;
            font-size: 1.2em;
            font-weight: bold;
            color: var(--text-blue);
            margin-top: 10px;
            margin-bottom: 15px;
        `;

        const completedRoutes = searchRoutes.filter((route: IRoute) => false);
        const notCompletedRoutes = searchRoutes.filter((route: IRoute) => true);

        return (
            <div style={{gridColumn: "1 / span 8", gridRow: "4", marginTop: "-20px"}}>
                {Object.keys(operaterBucketedRoutes).map((operatorId: string, idx: any) =>
                    <RouteRowMultiple
                        key={idx}
                        operator={operaterBucketedRoutes[operatorId][0].operator}
                        routes={operaterBucketedRoutes[operatorId]}
                        setOperatorOpen={setOperatorOpen}
                    />
                )}
                {/*{notCompletedRoutes?.length > 0 ? (<SectionTitle>In progress</SectionTitle>) : null}*/}
                {/*{notCompletedRoutes.map((route: IRoute, idx: any) => <RouteRow key={idx} route={route} />)}*/}
                {/*{completedRoutes.length > 0 ? (<div style={{marginTop: '50px'}}><SectionTitle>Completed</SectionTitle></div>) : null}*/}
                {/*{completedRoutes.map((route: IRoute, idx: any) => <RouteRow key={idx} route={route} />)}*/}
            </div>
        );
    };

    return (
        <div style={{
            display: "flex",
            flex: '1',
            alignItems: 'stretch',
            flexFlow: 'column',
        }}>
            <GridComponent>
                <Header/>
                <Search setSearch={setSearchText} searchValue={searchText}/>
                <RoutePlan
                    searchRoutes={routes}
                />
            </GridComponent>
        </div>
    )
}
