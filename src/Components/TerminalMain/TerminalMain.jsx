import "./TerminalMain.css"
import ConnectedStrategyChart from "./Charts/StrategyChart.jsx";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const TerminalMain = () => {
    return (
        <div className="TerminalContainer">
            <div className="TerminalMain">
                <ConnectedStrategyChart />
            </div>
        </div>
    );
}

TerminalMain.propTypes = {
    candleInterval: PropTypes.string.isRequired,
    strategy: PropTypes.string.isRequired,
    graphType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    graphType: state.graphType,
    strategy: state.strategy,
    candleInterval: state.candleInterval
});

const ConnectedTerminalMain = connect(mapStateToProps)(TerminalMain);
export default ConnectedTerminalMain;
