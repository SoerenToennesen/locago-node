import React, {} from 'react';
import {SectionTitle} from "../components/SectionTitle";
import {MainpageCard} from "../components/Card";
import {InfoFeature, ReportRowCustom} from "../components/SectionBody";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Doughnut} from "react-chartjs-2";
import {GridComponent} from "../components/Grid";
const title_img =  require("../assets/dashboard_image.png");

export function Dashboard () {
    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"Dashboard"}
                subtitle={
                    <h6>
                        Predicted revenue gain from rebalancing this month: &nbsp;
                        <span style={{color: "black"}}>4,323 EUR</span>
                    </h6>
                }
            />
        );
    }

    function BarChartComponent() {
        const data = [
            {x: 'Caroline', 'Completed': 14, 'Total': 20},
            {x: 'Ivy', 'Completed': 13, 'Total': 22},
            {x: 'Soren', 'Completed': 9, 'Total': 17},
            {x: 'Danny', 'Completed': 16, 'Total': 25},
            {x: 'Thomas', 'Completed': 25, 'Total': 38},
        ];

        return (
            <MainpageCard style={{gridColumn: "1 / span 5", gridRow: "3"}}>
                <ReportRowCustom
                    title={<h3>{'Operator efficiency'}</h3>}
                    value={
                        <div style={{
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            color: "#7596a1",
                            marginRight: "50px",
                        }}>
                            <i className="bi bi-square-fill" style={{color: '#385a5e'}} />
                            &nbsp;&nbsp;Total
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <i className="bi bi-square-fill" style={{color: '#7daab5'}} />
                            &nbsp;&nbsp;Completed
                        </div>
                    }
                />
                <div>
                    <ResponsiveContainer width={"100%"} height={300}>
                        <BarChart
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis label={{ value: '# of vehicles', angle: -90, position: 'insideLeft', offset: 0 }}/>
                            <Tooltip />
                            <Bar dataKey="Completed" fill="#7daab5" barSize={30} radius={[10, 10, 10, 10]} />
                            <Bar dataKey="Total" fill="#385a5e" barSize={30} radius={[10, 10, 10, 10]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </MainpageCard>
        );
    }

    function DonutChartComponent() {
        const data = {
            labels: ['Completed', 'In progress'],
            datasets: [
                {
                    data: [66120, 82650],
                    backgroundColor: [
                        '#385a5e',
                        '#7daab5',
                    ],
                },
            ],
        };
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                },
            },
            maintainAspectRatio: true,
            cutout: 120,
        }
        return (
            <MainpageCard style={{gridColumn: "6 / span 3", gridRow: "3"}}>
                <ReportRowCustom
                    title={<h3>{'Total operations'}</h3>}
                    value={
                        <div style={{
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            color: "#7596a1",
                            marginRight: "10px",
                        }}>
                            <i className="bi bi-square-fill" style={{color: '#7daab5'}} />
                            &nbsp;&nbsp;In progress
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i className="bi bi-square-fill" style={{color: '#385a5e'}} />
                            &nbsp;&nbsp;Completed
                        </div>
                    }
                />
                <div style={{height: '280px', width: '100%', justifyContent: "center", display: "flex", position: "relative", zIndex: "10"}}>
                    <Doughnut
                        data={data}
                        options={options}
                    />
                    <div style={{
                        background: '#f2f2f2',
                        width: '200px',
                        height: '200px',
                        borderRadius: '1000px',
                        textAlign: 'center',
                        position: "absolute",
                        top: "40px",
                        zIndex: "-10",
                    }}>
                        <div style={{
                            marginTop: "66px"
                        }}>
                            <h3>Time spent vs.</h3>
                            <h3>time left</h3>
                        </div>
                    </div>
                </div>
            </MainpageCard>
        );
    }

    function FeaturedInfo () {
        return (
            <>
                <div style={{gridColumn: "1 / span 8", gridRow: "4", marginBottom: '0px', marginLeft: '30px'}}>
                    <h3 style={{marginBottom: "-30px"}}>KPIs for 2023</h3>
                </div>
                <MainpageCard style={{gridColumn: "1 / span 2", gridRow: "5", marginBottom: '20px'}}>
                    <InfoFeature
                        logo={'bi bi-currency-euro'}
                        logoColor={'#7daab5'}
                        percent={'17.8 %'}
                        title={'Gained revenue'}
                        value={'20,432 EUR'}
                    />
                </MainpageCard>
                <MainpageCard style={{gridColumn: "3 / span 2", gridRow: "5", marginBottom: '20px'}}>
                    <InfoFeature
                        logo={'bi bi-lightning-charge-fill'}
                        logoColor={'#4c5c60'}
                        percent={'-38.6%'}
                        title={'Optimized routing'}
                        value={'- 3,203 km'}
                    />
                </MainpageCard>
                <MainpageCard style={{gridColumn: "5 / span 2", gridRow: "5", marginBottom: '20px'}}>
                    <InfoFeature
                        logo={'bi bi-cone-striped'}
                        logoColor={'#bfbfbf'}
                        percent={'-382.3%'}
                        title={'Operational downtime'}
                        value={'2 hrs, 23 mins'}
                    />
                </MainpageCard>
                <MainpageCard style={{gridColumn: "7 / span 2", gridRow: "5", marginBottom: '20px'}}>
                    <InfoFeature
                        logo={'bi bi-cloud-fill'}
                        logoColor={'#dde1ee'}
                        percent={'-20.3 kg'}
                        title={'CO2 emissions'}
                        value={'5,432 EUR'}
                    />
                </MainpageCard>
            </>
        );
    }

    return (
        <div style={{
            display: "flex",
            flex: '1',
            alignItems: 'stretch',
            flexFlow: 'column'
        }}>
            <GridComponent>
                <Header/>
                <>
                    <div style={{gridColumn: "1 / span 8", gridRow: "2", marginBottom: '0px', marginLeft: '30px'}}>
                        <h3 style={{marginBottom: "-30px"}}>Today's operational analytics</h3>
                    </div>
                    <BarChartComponent/>
                    <DonutChartComponent/>
                </>
                <FeaturedInfo/>
            </GridComponent>
        </div>
    )
}
