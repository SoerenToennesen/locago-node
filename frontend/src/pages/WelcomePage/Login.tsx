import {useState} from "react";
import { useNavigate } from "react-router-dom";


export const Login = (props: any) => {
    const {
        isLogin: isLogin,
        setIsLogin: setIsLogin,
        setIsLoggedIn: setIsLoggedIn
    } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        let result: Response = await fetch("http://localhost:8082/auth/login", {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json"
            },
        });
        if (result.status === 403) {
            alert("Incorrect credentials");
        } else {
            const jsonResult: any = await result.json();
            if (jsonResult._id) {
                // localStorage.setItem("user", JSON.stringify(jsonResult));
                // navigate("/");
                setIsLoggedIn(true);
            } else {
                alert("Incorrect credentials");
            }
        }
    }

    return <div className={'form-container'}>
        <h1 className="login-title" style={{marginLeft: "100px"}}>
            Login
        </h1>
        <input type="text" name="username" placeholder="E-MAIL"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" name="password" placeholder="PASSWORD"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{display: "flex", alignItems: "center", justifyContent: 'space-around', fontSize: '12px'}}>
            <div>
                {/*<Checkbox style={{color: "#84A2ACFF", backgroundColor: "white"}}/>*/}
                <div className="divLoginHelp" style={{
                    display: "inline",
                }}>
                    Remember me
                </div>
            </div>
            <button type="button" className="btnLoginHelp2" onClick={() => null} style={{}}>
                Forgot password?
            </button>
        </div>
        <button type="button" onClick={handleLogin} style={{marginTop: '30px'}}>
            LOGIN
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} style={{marginTop: '20px'}}>
            CREATE USER
        </button>
    </div>
}