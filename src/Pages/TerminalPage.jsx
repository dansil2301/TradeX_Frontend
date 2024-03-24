import {TerminalHeader} from "../Components/TerminalHeader/TerminalHeader.jsx";
import ConnectedTerminalMain from "../Components/TerminalMain/TerminalMain.jsx";
import {Provider} from "react-redux";
import store from "../ConfigRedux/Terminal/Reducers.js";

export function TerminalPage() {
    return (
        <Provider store={store}>
            <div className="TerminalBody" style={{height: '98vh'}}>
                <TerminalHeader />
                <ConnectedTerminalMain />
            </div>
        </Provider>
    )
}
