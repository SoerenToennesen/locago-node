import React, {useContext, useState} from "react";

const evToString = (handler: (str: string) => void) =>
    (ev: React.FormEvent<HTMLInputElement>) => handler(ev.currentTarget.value);

export const CreateUser = (props: any) => {
    const {
        isLogin: isLogin,
        setIsLogin: setIsLogin,
    } = props;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const validateEmpty = (...strings: String[]): boolean => {
        for (const string of strings) {
            if (string.length === 0) {
                alert("All fields have to be filled");
                return false;
            }
        }

        return true;
    }

    const createUser = async () => {
        if (!validateEmpty(email, password, passwordAgain, companyName, firstName, lastName, phoneNumber)) {
            return;
        }
        if (password !== passwordAgain) {
            alert("Passwords do not match");
            return;
        }
        const response = await fetch("http://localhost:8080/auth/register", {
            method: 'POST',
            body: JSON.stringify({
                name: `${firstName} ${lastName}`,
                password,
                email,
                companyName,
                phoneNumber,
            })
        }).catch((e) => console.log(e));
    }

    return <div className={'form-container'}>
        <h1 className="login-title" style={{marginBottom: "5%", alignSelf: 'flex-start'}}>
            Create user
        </h1>
        <input type="text" placeholder="E-MAIL" value={email} onChange={evToString(setEmail)}/>
        <input type="password" placeholder="YOUR PASSWORD" value={password} onChange={evToString(setPassword)}/>
        <input type="password" placeholder="CONFIRM PASSWORD" value={passwordAgain} onChange={evToString(setPasswordAgain)}/>
        <input type="text" placeholder="COMPANY" value={companyName} onChange={evToString(setCompanyName)}/>
        <input type="text" placeholder="FIRST NAME" value={firstName} onChange={evToString(setFirstName)}/>
        <input type="text" placeholder="LAST NAME" value={lastName} onChange={evToString(setLastName)}/>
        <input type="text" placeholder="TELEPHONE NO." value={phoneNumber} onChange={evToString(setPhoneNumber)}/>
        <button type="button" className="btnLogin" onClick={createUser} style={{marginTop: '30px'}}>CREATE USER</button>
        <button type="button" className="btnLogin" onClick={() => setIsLogin(!isLogin)} style={{marginTop: '10px'}}>
            BACK TO LOGIN
        </button>
    </div>
}