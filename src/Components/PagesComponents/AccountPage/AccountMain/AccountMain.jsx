import "./AccountMain.css"
import {SignOutBtn} from "./SignOutBtn/SignOutBtn.jsx";
import {InformationBlock} from "./InformationBlock/InformationBlock.jsx";
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
    const [traderStatus, setTraderStatus] = useState(null);

    useEffect(() => {
        async function getTraderData() {
            const traderId = TraderToken.getTraderIdFromToken();
            const data = await TraderTransmitter.GetTraderById(traderId)
            setUserData(data);
            setTraderStatus(data.status);
        }

        getTraderData();
    }, [])

    const updateStatus = async () => {
        async function editTrader() {
            const username = document.getElementById('Username').textContent;
            const email = document.getElementById('Email').textContent;
            let currentStatus = document.getElementById('Status').textContent;

            if (currentStatus === "TRADER_BASIC")
            { currentStatus = "TRADER_PLUS"; }
            else if (currentStatus === "TRADER_PLUS")
            { currentStatus = "TRADER_BASIC"; }

            const id = TraderToken.getTraderIdFromToken();
            await TraderTransmitter.EditTrader(id, username, email, currentStatus);

            TraderToken.clearToken();
            alert("Please login again!");
            window.location.reload()
        }

        editTrader();
    }

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
                    <div className="EditingStatus">
                        <InformationBlock name="Status" value={traderStatus}/>
                        {traderStatus !== "ADMIN" && (
                            <button className="EditStatusBtn" onClick={updateStatus}>
                                {traderStatus === "TRADER_BASIC" ? "Become Trader Plus" : "Downgrade to Trader Basic"}
                            </button>
                        )}
                    </div>
                <InformationBlock name="Created" value={userData.createdAt.split('T')[0]}/>
            </section>
        </div>
    );
}