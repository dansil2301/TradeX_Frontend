import {TerminalHeader} from "../Components/TerminalPage/TerminalHeader/TerminalHeader.jsx";
import ConnectedTerminalMain from "../Components/TerminalPage/TerminalMain/TerminalMain.jsx";
import {Provider} from "react-redux";
import store from "../ConfigRedux/Terminal/Reducers.js";

export function TerminalPage() {
    return (
        <Provider store={store}>
            <div className="TerminalBody" style={{ height: 'calc(100vh - 20px)'}}>
                <TerminalHeader />
                <ConnectedTerminalMain />
            </div>
        </Provider>
    )
}
