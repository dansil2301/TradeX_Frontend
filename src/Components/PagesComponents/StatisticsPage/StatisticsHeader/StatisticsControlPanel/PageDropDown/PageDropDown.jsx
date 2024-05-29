import "./PageDropDown.css"
import {useEffect, useState} from "react";
import {Arrow} from "../../../../../Common/Arrow/Arrow.jsx";
import Loading from "../../../../../Common/Loading/Loading.jsx";
import {DropdownOption} from "../../../../../Common/DropdownOption/DropdownOption.jsx";
import {StatisticsLogic} from "../../../../../../Logic/StatisticsLogic/StatisticsLogic.js";

export function PageDropDown({ setPageName }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageNames, setPageNames] = useState([]);

    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchStrategyNames = async () => {
            setError(null);
            setLoading(true);
            StatisticsLogic.getPageNames()
                .then(res => {
                    res = ["All", ...res]
                    setPageNames(res);
                })
                .catch(error => {setError(error);})
                .finally(() => setLoading(false));
        };

        fetchStrategyNames();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="PanelGeneral GraphType">
            <button className="DropdownBtn" onClick={toggleDropdown}>
                <div>Page</div>
                <Arrow />
            </button>
            {isOpen && (
                <div className="Dropdown">
                    {loading ? (
                        <Loading/>
                    ) : error ? (
                        <div className="Error">Error: {error.message}</div>
                    ) : (
                        pageNames.map(name => (
                            <DropdownOption key={name} value={name} name={name}
                                            setStrategy={setPageName} setIsOpen={setIsOpen} isOpen={isOpen}/>
                        ))
                    )
                    }
                </div>
            )}
        </div>
    );
}