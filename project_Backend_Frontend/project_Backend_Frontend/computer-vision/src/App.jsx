import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Analyze from "./Pages/Analyze";
import Results from "./Pages/Results";
import MapPage from "./Pages/MapPage";

import { ResultProvider } from "./context/ResultContext";

export default function App() {
  return (
    <ResultProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/results" element={<Results />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </ResultProvider>
  );
}