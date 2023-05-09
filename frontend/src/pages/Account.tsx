import React, {} from 'react';
import {SectionTitle} from "../components/SectionTitle";
import {GridComponent} from "../components/Grid";
import {MainpageCard} from "../components/Card";
import {ReportRowCustom, ReportRowSimple} from "../components/SectionBody";
const title_img =  require("../assets/account_image.png");

export function Account () {
    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"Account"}
                subtitle={<h6>Last updated &nbsp;&nbsp; 09.05.2023</h6>}
            />
        );
    }

    function Profile() {
        return (
            <MainpageCard style={{gridColumn: "1 / span 8", gridRow: "2"}}>
                <ReportRowCustom
                    title={<h3>{'Profile'}</h3>}
                    value={
                        <div style={{
                            fontSize: "1.1em",
                            fontWeight: "bold",
                            color: "#7596a1",
                            cursor: "pointer"
                        }}>
                            <i className="bi bi-pencil-square"/>
                            &nbsp;&nbsp;Edit information
                        </div>
                    }
                />
                <ReportRowSimple title={'Navn'} value={"Soren Toennesen"}/>
                <ReportRowSimple title={'Telefonnummer'} value={"+45 12 34 56 78"}/>
                <ReportRowSimple title={'Mail'} value={"sorentoennesen@gmail.com"}/>
            </MainpageCard>
        );
    }

    function Password() {
        return (
            <MainpageCard style={{gridColumn: "1 / span 8", gridRow: "3"}}>
                <ReportRowCustom title={<h3>{'Password'}</h3>} value={
                    <div style={{
                        fontSize: "1.1em",
                        fontWeight: "bold",
                        color: "#7596a1",
                        cursor: "pointer"
                    }}>
                        <i className="bi bi-pencil-square"/>
                        &nbsp;&nbsp;Edit information
                    </div>
                }/>

                <ReportRowSimple title={'Current password'} value={'****************'}/>
            </MainpageCard>
        );
    }

    function ProfileType() {
        return (
            <MainpageCard style={{gridColumn: "1 / span 8", gridRow: "4", marginBottom: "30px"}}>
                <ReportRowCustom title={<h3>{'Profile type'}</h3>} value={<></>}/>
                <ReportRowSimple title={'Profile'} value={'Administrator'}/>
                <ReportRowSimple title={'Active since'} value={'01-03-2023'}/>
                <ReportRowSimple title={'Abbonement'} value={'Active'}/>
            </MainpageCard>
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
                <Profile/>
                <Password/>
                <ProfileType/>
            </GridComponent>
        </div>
    )
}
