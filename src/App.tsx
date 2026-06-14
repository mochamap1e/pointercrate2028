import { Routes, Route } from "react-router-dom";

import { Demonlist } from "./pages/Demonlist";
import { About } from "./pages/About";

import "./global.css";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Demonlist/>}/>
            <Route path="/about" element={<About/>}/>
        </Routes>
    );
}