import "../TerminalControlPanel.css"
import "./StrategiesElement.css"
import MainServeURL from "../../../../config.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {DropdownOption} from "../DropdownOption/DropdownOption.jsx";

import StrategyLogo from "../../../assets/StrategyLogo.png"
import {Arrow} from "../../Arrow/Arrow.jsx";
import Loading from "../../Loading/Loading.jsx";

export function StrategiesElement({ setStrategy }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [strategiesNames, setStrategiesNames] = useState([]);

    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchStrategyNames = async () => {
            axios.get(MainServeURL + "api/strategies/get-strategies-names")
                .then(res => {setStrategiesNames(res.data["strategyNames"]);})
                .catch(error => {
                    setError(error);
                })
                .finally(() => setLoading(false));
        };

        fetchStrategyNames();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="PanelGeneral StrategiesElement">
            <button className="DropdownBtn" onClick={toggleDropdown}>
                <img className="StrategyElementLogo" src={StrategyLogo} alt="StrategyLogo" />
                <span className="StrategyElementName">Strategies</span>
                <Arrow />
            </button>
            {isOpen && (
                <div className="Dropdown">
                    {loading ? (
                            <Loading />
                        ) : error ? (
                            <div className="Error">Error: {error.message}</div>
                        ) : (
                            strategiesNames.map(name => (
                                <DropdownOption key={name} value={name} name={name}
                                                setStrategy={setStrategy} setIsOpen={setIsOpen} isOpen={isOpen}/>
                            ))
                        )
                    }
                </div>
            )}
        </div>
    )
}