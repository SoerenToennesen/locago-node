import React, {} from 'react';
import {SectionTitle} from "../components/SectionTitle";
const title_img =  require("../assets/dashboard_image.png");

export function Dashboard () {
    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"Dashboard"}
                subtitle={<h6>This is a subtitle...</h6>}
            />
        );
    }

    return (
        <>
            <Header />
        </>
    )
}
