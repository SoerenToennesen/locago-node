import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom/client";
import {LeftSidebar} from "./components/LeftSidebar";
import {Mainpage} from "./components/Mainpage";
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {BrowserRouter} from "react-router-dom";
import {WelcomePage} from "./pages/WelcomePage/WelcomePage";

export const endpointRouting: string = 'http://localhost:8080/api/'
export const endpointRebalancing: string = 'http://localhost:8001/api/'

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div style={{display: "flex", width: "100wh", height: "100vh"}}>
            <BrowserRouter>
                {isLoggedIn ? (
                    <>
                        <LeftSidebar />
                        <Mainpage />
                    </>
                ) : (
                    <WelcomePage setIsLoggedIn={(isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn)} />
                )}
            </BrowserRouter>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);