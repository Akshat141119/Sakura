import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PetalLetters from "./pages/PetalLetters";
import SakuraSpirit from "./pages/SakuraSpirit";
import SakuraQuiz from "./pages/SakuraQuiz";
// Optional fallback or future pages
// import NotFound from "./pages/NotFound";
// import About from "./pages/About";

export default function App() {
  return (
      <>
        <Navbar /> {/* 🧭 Render navbar ONLY here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/letters" element={<PetalLetters />} />
          <Route path="/spirit" element={<SakuraSpirit />} />
          <Route path="/quiz" element={<SakuraQuiz />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </>
    );
}