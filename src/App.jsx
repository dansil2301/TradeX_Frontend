import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {TerminalPage} from "./Pages/TerminalPage.jsx";
import 'node-global';
import {IndexPage} from "./Pages/IndexPage.jsx";
import {TraderOptionsPage} from "./Pages/TraderOptionsPage.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/terminal" element={<TerminalPage />} />
                    <Route path="/trader-options" element={<TraderOptionsPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App
