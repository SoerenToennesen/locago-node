import React, {CSSProperties} from "react";
import {Card} from "./Card";

export const SectionTitle: React.FC<{
    img: string,
    title: string,
    subtitle: JSX.Element,
    style?: CSSProperties
}> = (props) => {
    return <Card
        style={{
            ...{
                flexFlow: 'row',
                justifyContent: 'space-between',
                gridRow: "1",
                height: '200px'
            },
            ...props.style
        }
        }>
        <div style={{
            flex: '1',
            background: `url(${props.img}) no-repeat`,
            backgroundSize: 'contain',
            backgroundPosition: 'right',
        }}>
            <h2 style={{marginBottom: "10px"}}>
                {props.title}
            </h2>
            {props.subtitle}
        </div>
    </Card>
}