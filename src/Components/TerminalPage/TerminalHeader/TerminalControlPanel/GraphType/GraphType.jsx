import "./GraphType.css"
import "../TerminalControlPanel.css"
import {useState} from "react";

import Candles from "../../../../../assets/GraphType/Candles.png"
import {Arrow} from "../../../../Common/Arrow/Arrow.jsx";
import { connect } from 'react-redux';
import { setGraphType } from '../../../../../ConfigRedux/Terminal/Actions.js';
import PropTypes from "prop-types";

const GraphType = ({ setGraphType }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleGraphTypeChange = (type) => {
        setGraphType(type);
        setIsOpen(false);
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
};

GraphType.propTypes = {
    setGraphType: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    setGraphType: setGraphType
};

const ConnectedGraphType = connect(null, mapDispatchToProps)(GraphType);
export default ConnectedGraphType;
