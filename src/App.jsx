import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import TopNav from "./components/layout/TopNav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Bundles from "./pages/Bundles";
import FlightDetail from "./pages/FlightDetail";
import HotelDetail from "./pages/HotelDetail";
import BundleDetail from "./pages/BundleDetail";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Trips from "./pages/Trips";
import AdminFlights from "./pages/admin/AdminFlights";
import AdminHotels from "./pages/admin/AdminHotels";

function App() {
  return (
    <>
      <Router>
        {/* <TopNav /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/flights/:id" element={<FlightDetail />} />
          <Route path="/hotels/:id" element={<HotelDetail />} />
          <Route path="/bundles/:id" element={<BundleDetail />} />
          <Route path="/checkout/:type/:id" element={<Checkout />} />
          <Route path="/confirmation/:type/:id" element={<Confirmation />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/admin/flights" element={<AdminFlights />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
