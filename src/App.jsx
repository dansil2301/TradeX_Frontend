import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {TerminalPage} from "./Pages/TerminalPage.jsx";
import 'node-global';
import {IndexPage} from "./Pages/IndexPage.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/terminal" element={<TerminalPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App
