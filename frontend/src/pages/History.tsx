import React, {} from 'react';
import {SectionTitle} from "../components/SectionTitle";
const title_img =  require("../assets/history_image.png");

export function History () {
    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"History"}
                subtitle={<h6>Operational history for 2023</h6>}
            />
        );
    }

    return (
        <>
            <Header />
        </>
    )
}
