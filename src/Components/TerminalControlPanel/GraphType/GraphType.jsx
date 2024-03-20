import "./GraphType.css"
import "../TerminalControlPanel.css"
import {useState} from "react";

import Candles from "../../../assets/GraphType/Candles.png"
import {Arrow} from "../../Arrow/Arrow.jsx";

export function GraphType({ setGraphType }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleGraphTypeChange = (type) => {
        setGraphType(type);
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
        <div className="PanelGeneral GraphType">
            <button className="DropdownBtn" onClick={toggleDropdown}>
                <img className="GraphTypeLogo" src={Candles} alt="GraphTypeLogo"/>
                <Arrow />
            </button>
            {isOpen && (
                <div className="Dropdown">
                    <button className="DropdownOption" onClick={() => handleGraphTypeChange('candle')} value="candle">Candles</button>
                    <button className="DropdownOption" onClick={() => handleGraphTypeChange('line')} value="line">Line</button>
                </div>
            )}
        </div>
    );
}