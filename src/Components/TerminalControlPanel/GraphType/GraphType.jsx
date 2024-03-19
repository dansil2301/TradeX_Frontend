import "./GraphType.css"
import "../TerminalControlPanel.css"
import {useState} from "react";

import Candles from "../../../assets/GraphType/Candles.png"
import {Arrow} from "../../Arrow/Arrow.jsx";

export function GraphType() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="PanelGeneral GraphType">
            <button className="DropdownBtn" onClick={toggleDropdown}>
                <img className="GraphTypeLogo" src={Candles}  alt="GraphTypeLogo"/>
                <Arrow />
            </button>
            {isOpen && (
                <div className="Dropdown">
                    <button className="DropdownOption" value="candle">candles</button>
                    <button className="DropdownOption" value="line">line</button>
                </div>
            )}
        </div>
    )
}