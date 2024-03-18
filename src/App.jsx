import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {TerminalPage} from "./Pages/TerminalPage.jsx";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/terminal" element={<TerminalPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App
