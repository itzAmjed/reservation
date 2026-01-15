import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import SearchPage from './pages/SearchPage.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Reservations from '@/pages/Reservation.jsx';
import HotelDetails from './pages/HotelDetails.jsx';
import Booking from './pages/Booking.jsx';
import NotFound from './pages/NotFound.jsx';

import './App.css'


function App() {


  return (
    <>

   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/booking/:hotelId" element={<Booking />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
   </Router>
   </>
  )
}

export default App
