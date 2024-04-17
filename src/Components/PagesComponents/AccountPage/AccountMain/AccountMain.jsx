import "./AccountMain.css"
import {SignOutBtn} from "./SignOutBtn/SignOutBtn.jsx";
import {InformationBlock} from "./InformationBlock/InformationBlock.jsx";
import {compose} from "redux";
import {useEffect, useState} from "react";
import {TraderToken} from "../../../../Logic/TraderLogic/TraderToken.js";
import {TraderTransmitter} from "../../../../Logic/TraderLogic/TraderTransmitter.js";

const data = {
    username: "*",
    email: "*",
    status: "*",
    createdAt: "*"
}

export function AccountMain() {
    const [userData, setUserData] = useState(data);

    useEffect(() => {
        async function getTraderData() {
            const traderId = TraderToken.getTraderIdFromToken();
            setUserData(await TraderTransmitter.GetTraderById(traderId));
        }

        getTraderData();
    }, [])

    return(
        <div className="AccountMain">
            <section className="accountHeader">
                <h2 className="accountHeaderText">Trader Account</h2>
                <SignOutBtn/>
            </section>
            <line className="lineDelimiter"/>
            <h1 className="PersonalInformation">Personal Information</h1>
            <section className="PersonalInformationBlocks">
                <InformationBlock name="Username" value={userData.username}/>
                <InformationBlock name="Email" value={userData.email}/>
                <InformationBlock name="Status" value={userData.status}/>
                <InformationBlock name="Created" value={userData.createdAt.split('T')[0]}/>
            </section>
        </div>
    );
}