import "./IndexHeader.css"
import {Menu} from "../../Common/Menu/Menu.jsx";
import {Eye} from "../../Common/Eye/Eye.jsx";
import {SignIn} from "./SignIn/SignIn.jsx";
import {TraderToken} from "../../../Logic/TraderLogic/TraderToken.js";
import {useEffect, useState} from "react";

export function IndexHeader() {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const isValidToken = await TraderToken.checkIfTokenIsValid();
                setIsValid(isValidToken);
            } catch (error) {
                setIsValid(false);
            }
        };

        checkTokenValidity();
    }, []);

    return (
        <div className="indexHeader">
            <Menu/>
            {!isValid ? <SignIn /> : <div className="LoggedIn"> Welcome </div>}
            <Eye/>
        </div>
    );
}