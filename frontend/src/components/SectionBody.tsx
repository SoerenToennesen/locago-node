import React, {} from "react";

export const ReportRowCustom: React.FC<{
    title: JSX.Element,
    value?: JSX.Element,
    marginFromTop?: string,
}> = ({title, value, marginFromTop}) => {
    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: marginFromTop}}>
            {title}
            {value}
        </div>
    );
}

export const ReportRowSimple: React.FC<{
    title: string,
    titleSize?: string,
    value: string,
    secondaryValue?: string,
    titleColor?: string,
    marginFromTop?: string,
}> = ({title, titleSize, value, secondaryValue, titleColor, marginFromTop}) => {
    return (
        <ReportRowCustom title={<h4 style={{color: titleColor, fontSize: titleSize}}>{title}</h4>} value={
            <h6>
                {value} <span style={{color: '#4c5c60'}}>{secondaryValue}</span>
            </h6>
        }
        marginFromTop={marginFromTop}
        />
    );
}

export const ReportRowSimpleWithColor: React.FC<{
    title: string,
    value: string,
    valueColor: string,
}> = ({title, value, valueColor}) => {
    return (
        <ReportRowCustom title={<h4>{title}</h4>} value={
            <h6 style={{color: valueColor}}>
                {value}
            </h6>
        }/>
    );
}

export const InfoFeature: React.FC<{
    logo: string,
    logoColor: string,
    percent: string,
    title: string,
    value: string,
}> = ({logo, logoColor, percent, title, value}) => {
    return (

        <div style={{display: 'flex'}}>
            <div style={{width: '70px', height: '70px', borderRadius: '25px', backgroundColor: logoColor}}>
                <div
                    className="donut-container"
                    style={{textAlign: 'center', marginTop: "15px"}}
                >
                    <i className={logo} style={{color: '#ffffff', fontSize: '200%'}}/>
                </div>
            </div>
            <div style={{display: 'inline', marginLeft: '15px'}}>
                <div style={{color: parseInt(percent) < 0 ? '#a078b3' : '#7daab5'}}>
                    {parseInt(percent) < 0 ? '- ' + percent.substring(1) : '+ ' + percent}
                </div>
                <h4>
                    {title}
                </h4>
                <div style={{fontWeight: 'bold', marginTop: '0px'}}>
                    {value}
                </div>
            </div>
        </div>
    );
}