import { Routes, Route } from "react-router-dom";

import { Demonlist } from "./pages/Demonlist";
import { Statsviewer } from "./pages/Statsviewer";
import { NotFound } from "./pages/NotFound";

import "./global.css";

export function App() {
    return (
        <Routes>
            <Route path="/" element={<Demonlist/>}/>
            <Route path="/statsviewer/:target?" element={<Statsviewer/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}