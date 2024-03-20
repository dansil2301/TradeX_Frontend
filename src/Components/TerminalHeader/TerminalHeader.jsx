import "./TerminalHeader.css"
import {Eye} from "../Eye/Eye.jsx";
import {MenuBtn} from "../MenuBtn/MenuBtn.jsx";
import {TerminalControlPanel} from "../TerminalControlPanel/TerminalControlPanel.jsx";
import PropTypes from "prop-types";

export function TerminalHeader({ setTerminalPageContainer }) {
    return (
        <div className="terminalHeader">
            <MenuBtn />
            <TerminalControlPanel setTerminalPageContainer={setTerminalPageContainer}/>
            <Eye />
        </div>
    )
}

TerminalHeader.propTypes = {
    setTerminalPageContainer: PropTypes.func.isRequired
};
