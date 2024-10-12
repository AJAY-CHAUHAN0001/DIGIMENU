import './App.css'
import { Route, Routes,useLocation } from 'react-router-dom';
import { Navbar2 } from './components/Navbar2';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Menugroup } from './components/Menugroup';
import { Food } from './components/Food';
import { Qty } from './components/Qty';
import { Contact } from './components/Contact';
import { BookAtableMessage } from './components/BookAtableMessage';

function App() {
  const location = useLocation();

  return (
    <>
    {location.pathname  !== "/" && location.pathname !== "/signup" && <Navbar2/>}
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/menugroup" element={<Menugroup />} />
      <Route path="/food" element={<Food />} />
      <Route path="/qty" element={<Qty />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tablebook" element={<BookAtableMessage />} />
    </Routes>
    </>
  )
}

export default App
