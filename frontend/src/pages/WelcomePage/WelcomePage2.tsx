import {Login} from "./Login";
import {CreateUser} from "./CreateUser";
import React, {useEffect, useState} from "react";

const login_image =  require("../../assets/login_image.png");
const logo =  require("../../assets/locago_logo.png");

export function WelcomePage2(props: any) {
    const {
        setIsLoggedIn: setIsLoggedIn,
    } = props;
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div style={{
            height: "100%",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gridTemplateColumns: "67% 33%",
        }}>
            <div style={{
                gridRow: "2/2",
                gridColumn: "1/2",
                background: "#84A2ACFF",
                color: "#fff",
                backgroundImage: `url(${login_image})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '95% 85%',
                backgroundSize: '50%',
                padding: '50px'

            }}>
                <div className="login-header">
                    <img className="login-img" src={logo} alt="Main logo"/>
                    <div className="login-text">
                        <div className="login-title" style={{marginLeft: "20px"}}>
                            Loca
                            <span style={{color: "#d5d5d5"}}>Go</span>
                            <div className="login-body">
                                Optimize your micro mobility operations with us
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    width: "68%",
                    flexFlow: "column"
                }}>
                    <div className="login-title2">
                        <span style={{color: "#d5d5d5"}}>Rebalancing</span>
                        {' '}shared micro mobility{' '}
                        <span style={{color: "#d5d5d5"}}>using</span>
                        {' '}machine learning.
                    </div>
                    <div className="login-body2">
                        Locago provides rebalancing and route optimization solutions to facilitate transportation for a better tomorrow.
                    </div>
                </div>
            </div>
            <div style={{
                gridRow: "1/3",
                gridColumn: "2/2",
                background: "#fff",
            }}>
                <div style={{
                    textAlign: "center",
                    position: "relative",
                    top: "50vh",
                    transform: "translateY(-50%)",
                }}>
                    {isLogin ? (
                        <Login
                            isLogin={isLogin}
                            setIsLogin={(isLoginTemp: boolean) => setIsLogin(isLoginTemp)}
                            setIsLoggedIn={(isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn)}
                        />
                    ) : (
                        <CreateUser isLogin={isLogin} setIsLogin={(isLoginTemp: boolean) => setIsLogin(isLoginTemp)}/>
                    )}
                </div>
            </div>
        </div>
    )
}