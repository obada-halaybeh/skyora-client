import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import TopNav from "./components/layout/TopNav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Flights from "./pages/Flights";

function App() {
  return (
    <>
      <Router>
        {/* <TopNav /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/flights" element={<Flights />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
