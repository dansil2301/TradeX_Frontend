import "./StatSection.css"
import {StatBlock} from "./StatBlock/StatBlock.jsx";
import {useEffect, useState} from "react";
import {AdminTransmitter} from "../../../../../Logic/AdminLogic/AdminTransmitter.js";

export function StatSection() {
    const [totalTraders, setTotalTraders] = useState(0);
    const [totalBasicTraders, setBasicTraders] = useState(0);
    const [totalPlusTraders, setPlusTraders] = useState(0);

    useEffect(() => {
        async function getStats() {
            const total = await AdminTransmitter.GetCountAllTraders();
            const basic = await AdminTransmitter.GetCountStatusTraders("TRADER_BASIC");
            const plus = await AdminTransmitter.GetCountStatusTraders("TRADER_PLUS")

            setTotalTraders(total);
            setBasicTraders(basic);
            setPlusTraders(plus);
        }

        getStats();
    }, []);

    return (
        <div className="StatSection">
            <StatBlock text={"Total Users in the System"} number={totalTraders}/>
            <StatBlock text={"Total Basic Users"} number={totalBasicTraders}/>
            <StatBlock text={"Total Plus Users"} number={totalPlusTraders}/>
        </div>
    );
}