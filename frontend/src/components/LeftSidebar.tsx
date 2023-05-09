import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";
const logo =  require("../assets/locago_logo.png");

export const LeftSidebarContainer = styled.div<{}>`
    background: white;
    width: 100px;
    height: 100%;
    flex-flow: column;
    box-sizing: border-box;
    padding: 30px 20px;
    transition: width 200ms ease-in;
    min-width: 250px;
`;
export const SidebarMenuItem = styled.div<{selected: boolean}>`
    color: ${props => props.selected ? "white" : "var(--sidebar)"};
    background-color: ${props => props.selected ? "var(--sidebar)" : "rgba(0,0,0,0)"};
    text-decoration: none;
    font-size: 15px;
    display: block;
    cursor: pointer;
    height: 60px;
    margin-top: 40px;
    margin-left: 20px;
    border-radius: 10px;
    &:hover {
        color: white;
        background-color: var(--sidebar-accent);
    }
`;
export const SidebarMenuIconText = styled.div<{selected: boolean}>`
    color: ${props => props.selected ? "white" : "var(--sidebar)"};
    width: 100%;
    height: 100%;
    line-height: 60px;
    margin-left: 20px;
    &:hover {
        color: white;
    }
`;

const menuItems = [
    {name: "Overview", exact: true, to: "/", iconClassName: "bi bi-chat-right-dots-fill"},
    {name: "Dashboard", exact: true, to: "/dashboard", iconClassName: "bi bi-bar-chart-line-fill"},
    {name: "Plan", exact: true, to: "/plan", iconClassName: "bi bi-calculator-fill"},
    {name: "Map", exact: true, to: "/map", iconClassName: "bi bi-pin-map-fill"},
    {name: "History", exact: true, to: "/history", iconClassName: "bi bi-clock-history"},
    {name: "Account", exact: true, to: "/account", iconClassName: "bi bi-person-fill"},
];

export function LeftSidebar () {
    const [page, setPage] = useState("");

    useEffect(() => {
        const idx: number = window.location.href.lastIndexOf("/");
        if (idx < window.location.href.length) {
            const tempPage: string = window.location.href.substring(idx + 1);
            if (tempPage === "") setPage("overview");
            else setPage(tempPage);
        }
    }, [window.location.href]);

    const MenuItem = (props: any) => {
        const {name, iconClassName, to} = props;
        return (
            <li style={{listStyleType: "none"}}>
                <NavLink to={to} style={{textDecoration: "none"}}>
                    <SidebarMenuItem selected={page.toLowerCase() === name.toLowerCase()} onClick={() => setPage(name)}>
                        <SidebarMenuIconText selected={page.toLowerCase() === name.toLowerCase()}>
                            <div style={{display: "inline-block", width: "40px", fontSize: "15px"}}>
                                <i className={iconClassName}/>
                            </div>
                            <span style={{fontSize: "18px"}}>{name}</span>
                        </SidebarMenuIconText>
                    </SidebarMenuItem>
                </NavLink>
            </li>
        )
    }

    return (
        <LeftSidebarContainer>
            {/*Title section*/}
            <div style={{textAlign: "center"}}>
                {/*Logo*/}
                <img style={{
                    height: "120px",
                    overflow: "hidden",
                    marginLeft: "5px"
                }} src={logo} alt="Main logo"/>
            </div>
            {/*Menu items*/}
            <div style={{textAlign: "left"}}>
                        {
                            menuItems.map((menuItem: any, idx: any) => (
                                <MenuItem
                                    key={idx}
                                    name={menuItem.name}
                                    exact={menuItem.exact}
                                    to={menuItem.to}
                                    iconClassName={menuItem.iconClassName}
                                />
                            ))
                        }
            </div>
        </LeftSidebarContainer>
    )
}
