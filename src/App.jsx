import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {TerminalPage} from "./Pages/TerminalPage.jsx";
import 'node-global';
import {IndexPage} from "./Pages/IndexPage.jsx";
import {TraderOptionsPage} from "./Pages/TraderOptionsPage.jsx";
import {SignUpPage} from "./Pages/SignUpPage.jsx";
import {SignInPage} from "./Pages/SignInPage.jsx";
import {AccountPage} from "./Pages/AccountPage.jsx";
import {AdminPage} from "./Pages/AdminPage.jsx";
import {StatisticsPage} from "./Pages/StatisticsPage.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/terminal" element={<TerminalPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/trader-options" element={<TraderOptionsPage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App
