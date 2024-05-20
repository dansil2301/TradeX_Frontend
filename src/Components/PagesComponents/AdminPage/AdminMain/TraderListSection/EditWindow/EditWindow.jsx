import "./EditWindow.css"
import {CloseBtn} from "../../../../../Common/CloseBtn/CloseBtn.jsx";
import {useState} from "react";
import {TraderTransmitter} from "../../../../../../Logic/TraderLogic/TraderTransmitter.js";
import {TraderStatusesDropDown} from "./TraderStatusesDropDown/TraderStatusesDropDown.jsx";

export function EditWindow({ setIsEditOpened, trader }) {
    const [isHovered, setHovered] = useState(false);
    const [username, setUsername] = useState(trader.username);
    const [email, setEmail] = useState(trader.email);
    const [status, setStatus] = useState(trader.status);

    const toggleWindow = () => {
        setIsEditOpened(false);
    };

    const saveTrader = () => {
        TraderTransmitter.EditTrader(trader.id, username, email, status)
        setIsEditOpened(false);
        window.location.reload();
    };

    const deleteTrader = () => {
        TraderTransmitter.DeleteTrader(trader.id);
        setIsEditOpened(false);
        window.location.reload();
    }

    return (
        <div className="WindowOverlay">
            <div className="CalculatorWindow transparentWindow">
                <div className="closeBtnCalculator" id="closeBtnIdCalculator">
                    <CloseBtn onClick={toggleWindow} isHovered={isHovered} setHovered={setHovered} />
                </div>

                <h1 className="EditHeaderHeader">Edit Trader</h1>

                <h2 className="InputHeader">Username</h2>
                <input
                    className="EditInput"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <h2 className="InputHeader">Email</h2>
                <input
                    className="EditInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <h2 className="InputHeader">Status</h2>
                <TraderStatusesDropDown status={status} setStatus={setStatus}/>

                <div className="BtnController">
                    <button className="editBtnSave" onClick={saveTrader}>Save</button>
                    <button className="editBtnDelete" onClick={deleteTrader}>Delete</button>
                </div>
            </div>
        </div>
    );
}