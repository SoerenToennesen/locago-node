import React, {} from 'react';
import {SectionTitle} from "../components/SectionTitle";
const title_img =  require("../assets/account_image.png");

export function Account () {
    const Header = (props: any) => {
        return (
            <SectionTitle
                style={{gridColumn: "1 / span 8", width: "100%"}}
                img={title_img}
                title={"Account"}
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
