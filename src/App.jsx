import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import { ReviewsProvider } from './context/ReviewsContext'

import Home from './pages/Home'
import FlightSearch from './pages/flights/FlightSearch'
import HotelSearch from './pages/hotels/HotelSearch'
import BundleSearch from './pages/bundles/BundleSearch'
import FlightDetail from './pages/flights/FlightDetail'
import HotelDetail from './pages/hotels/HotelDetail'
import BundleDetail from './pages/bundles/BundleDetail'
import Checkout from './pages/checkout/Checkout'
import Confirmation from './pages/Confirmation'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import MyTrips from './pages/MyTrips'
import AdminDashboard from './pages/admin/Dashboard'
import AdminFlights from './pages/admin/AdminFlights'
import AdminHotels from './pages/admin/AdminHotels'
import AdminBundles from './pages/admin/AdminBundles'
import AdminBookings from './pages/admin/AdminBookings'
import AdminUsers from './pages/admin/AdminUsers'

export default function App() {
  return (
    <ToastProvider>
      <ReviewsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<FlightSearch />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/bundles" element={<BundleSearch />} />
            <Route path="/flights/:id" element={<FlightDetail />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/bundles/:id" element={<BundleDetail />} />
            <Route path="/checkout/:bookingId" element={<Checkout />} />
            <Route path="/booking/:ref/confirmation" element={<Confirmation />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account/trips" element={<MyTrips />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/flights" element={<AdminFlights />} />
            <Route path="/admin/hotels" element={<AdminHotels />} />
            <Route path="/admin/bundles" element={<AdminBundles />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Routes>
        </BrowserRouter>
      </ReviewsProvider>
    </ToastProvider>
  )
}
