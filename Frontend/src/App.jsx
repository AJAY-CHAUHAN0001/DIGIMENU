import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import  {Home}  from './components/Home'
import Navbar from './components/Navbar';
import { About } from './components/About.jsx';
import { Gallery } from './components/Gallery';
import { Chefs } from './components/Chefs';
import Menu from './components/Menu';
import { Contacts } from './components/Contacts';
import { Contactresponse } from './components/Contactresponse';
import { BookAtable } from './components/BookAtable';
import { TableBookresponse } from './components/TableBookresponse';

export default function App() {
  const location = useLocation();

  return (
    <>
    {location.pathname !== "/response" && location.pathname !== "/bookingresponse" && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/response" element={<Contactresponse />} />
        <Route path="/booktable" element={<BookAtable />} />
        <Route path="/bookingresponse" element={<TableBookresponse />} />
      </Routes>
    </>
  );
}

