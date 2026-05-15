import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Medicines from './pages/Medicines'
import Cart from './pages/Cart'
import AdminPanel from './pages/AdminPanel'
import OrderTracking from './pages/OrderTracking'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.style.background = darkMode ? '#1a1a2e' : '#ffffff'
    document.body.style.color = darkMode ? '#ffffff' : '#000000'
  }, [darkMode])

  return (
    <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/tracking" element={<OrderTracking />} />
        <Route path="/track-order" element={<OrderTracking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App