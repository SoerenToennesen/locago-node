import React, {useState} from 'react';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import 'chart.js/auto';
import {Doughnut} from "react-chartjs-2";
import {SectionTitle} from "../components/SectionTitle";
import {GridComponent} from "../components/Grid";
import {MainpageCard} from "../components/Card";
import {ReportRowCustom} from "../components/SectionBody";
import styled from "styled-components";
import {CompanyRow} from "../components/CompanyRow";
const title_img =  require("../assets/overview_image.png");

export function Overview () {
    const [searchText, setSearchText] = useState('');


    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"Overview"}
                subtitle={<h6>198 out of 463 deployed vehicles are currently balanced</h6>}
            />
        );
    }

    const DonutChart: React.FC = () => {
        const data = {
            labels: ['Indberettet', 'Mangler'],
            datasets: [
                {
                    data: [31, 39],
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
                scales: {
                    xAxes: [{
                        barPercentage: 0.4
                    }]
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                },
            },
            maintainAspectRatio: true,
            cutout: 120,
        }
        return (
            <MainpageCard style={{gridColumn: "1 / span 3", gridRow: "2"}}>
                <ReportRowCustom
                    title={<h3>{''}</h3>}
                    value={
                        <div style={{
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            color: "#7596a1",
                            marginRight: "10px",
                        }}>
                            <i className="bi bi-square-fill" style={{color: '#385a5e'}}/>
                            &nbsp;&nbsp;Rebalanced
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <i className="bi bi-square-fill" style={{color: '#7daab5'}}/>
                            &nbsp;&nbsp;Needs rebalancing
                        </div>
                    }
                />
                <div className="donut-container" style={{height: '280px', width: '280px', marginTop: '-20px', marginLeft: '100px'}}>
                    <Doughnut
                        data={data}
                        options={options}
                    />
                    <div
                        className="donut-container"
                        style={{
                            top: '45.9%',
                            left: '25%',
                            position: 'absolute',
                        }}
                    >
                        <div style={{
                            background: '#f2f2f2',
                            height: '170px',
                            width: '170px',
                            borderRadius: '1000px',
                        }}>
                            <div
                                className="donut-container"
                                style={{
                                    top: '40%',
                                    position: 'absolute',
                                    width: '100%',
                                    textAlign: 'center',
                                }}
                            >
                                # deployed vehicles
                                <h3 style={{marginTop: "10px"}}>463</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </MainpageCard>
        );
    }

    const OverviewBarChart: React.FC = () => {
        const data = [
            {x: 'Jan', y: 829},
            {x: 'Feb', y: 923},
            {x: 'Mar', y: 893},
            {x: 'Apr', y: 1032},
            {x: 'May', y: 230},
            {x: 'Jun', y: 0},
            {x: 'Jul', y: 0},
            {x: 'Aug', y: 0},
            {x: 'Sep', y: 0},
            {x: 'Oct', y: 0},
            {x: 'Nov', y: 0},
            {x: 'Dec', y: 0},
        ];

        return (
            <MainpageCard style={{gridColumn: "4 / span 5", gridRow: "2"}}>
                <ReportRowCustom
                    title={<h3>{'Number of rebalance operations this month'}</h3>}
                />
                <div>
                    <ResponsiveContainer width={"100%"} height={300}>
                        <BarChart
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis label={{ value: 'Rebalances', angle: -90, position: 'insideLeft', offset: 0 }}/>
                            <Tooltip />
                            <Bar dataKey="y" fill="#385a5e" barSize={30} radius={[10, 10, 10, 10]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </MainpageCard>
        );
    }

    const Search: React.FC<{
        setSearch: (value: string) => void,
        searchValue: string
    }> = (
        {setSearch, searchValue}
    ) => {
        return (
            <div style={{gridColumn: "1 / span 8", gridRow: "3", marginBottom: '-50px'}}>
                <input
                    className="form-control m-2"
                    style={{maxWidth: "300px"}}
                    placeholder="Search vehicles"
                    value={searchValue}
                    onChange={(e) => {
                        setSearch(e.currentTarget.value)
                    }}
                />
            </div>
        );
    }

    const Companies: React.FC<{ searchCompanies: any[] }> = ({searchCompanies}) => {
        const SectionTitle = styled.div`
      text-align: center;
      font-size: 1.2em;
      font-weight: bold;
      color: var(--momstertech-darkgrey-bg-theme);
      margin-top: 10px;
      margin-bottom: 3px;
    `;

        const completedCompanies = searchCompanies.filter((company) => true)
        const notCompletedCompanies = searchCompanies.filter((company) => true)

        return (
            <div style={{gridColumn: "1 / span 8", gridRow: "4"}}>
                {notCompletedCompanies?.length > 0 ? (
                    <SectionTitle>Afventer indberetning</SectionTitle>
                ) : null}
                {notCompletedCompanies.map((company) => <CompanyRow company={company}/>)}
                {completedCompanies.length > 0 ? (
                    <div style={{marginTop: '50px'}}>
                        <SectionTitle>Gennemført</SectionTitle>
                    </div>
                ) : null}
                {completedCompanies.map((company: any) => <CompanyRow company={company}/>)}
            </div>
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
                <DonutChart/>
                <OverviewBarChart/>
                <Search setSearch={setSearchText} searchValue={searchText}/>
                <Companies searchCompanies={[]}/>
            </GridComponent>
        </div>
    )
}
