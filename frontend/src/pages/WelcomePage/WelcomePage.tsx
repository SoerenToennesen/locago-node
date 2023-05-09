import React, {useState} from "react";
import './WelcomePage.css';
import {Route, Routes} from "react-router-dom";
import {DoesntExist} from "../DoesntExist";
import {WelcomePage2} from "./WelcomePage2";

export function WelcomePage(props: any) {
    const {
        setIsLoggedIn: setIsLoggedIn
    } = props;

    return (
        <Routes>
            <Route path="/login" element={<WelcomePage2 setIsLoggedIn={(isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn)} />} />
            <Route path="/*" element={<WelcomePage2 setIsLoggedIn={(isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn)} />} />
        </Routes>
    )
}
