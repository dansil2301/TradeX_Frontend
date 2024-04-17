import {TerminalHeader} from "../Components/PagesComponents/TerminalPage/TerminalHeader/TerminalHeader.jsx";
import ConnectedTerminalMain from "../Components/PagesComponents/TerminalPage/TerminalMain/TerminalMain.jsx";
import {Provider} from "react-redux";
import store from "../ConfigRedux/Terminal/Reducers.js";

export function TerminalPage() {
    return (
        <Provider store={store}>
            <div className="TerminalBody" style={{ height: 'calc(100vh - 6vh)'}}>
                <TerminalHeader />
                <ConnectedTerminalMain />
            </div>
        </Provider>
    )
}
