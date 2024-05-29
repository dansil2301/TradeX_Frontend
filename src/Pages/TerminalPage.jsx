import {TerminalHeader} from "../Components/PagesComponents/TerminalPage/TerminalHeader/TerminalHeader.jsx";
import ConnectedTerminalMain from "../Components/PagesComponents/TerminalPage/TerminalMain/TerminalMain.jsx";
import {Provider} from "react-redux";
import store from "../ConfigRedux/Terminal/Reducers.js";
import {useEffect} from "react";
import {StatisticsLogic} from "../Logic/StatisticsLogic/StatisticsLogic.js";
import {TraderToken} from "../Logic/TraderLogic/TraderToken.js";

export function TerminalPage() {
    useEffect(() => {
        async function createPageVisit() {
            await StatisticsLogic.createPageVisit(TraderToken.getTraderIdFromToken(), "Terminal");
        }

        createPageVisit();
    }, [])

    return (
        <Provider store={store}>
            <div className="TerminalBody" style={{ height: 'calc(100vh - 6vh)'}}>
                <TerminalHeader />
                <ConnectedTerminalMain />
            </div>
        </Provider>
    )
}
