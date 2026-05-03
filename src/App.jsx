import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Medicines from './pages/Medicines'
import Cart from './pages/Cart'
import AdminPanel from './pages/AdminPanel'
import OrderTracking from './pages/OrderTracking'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/tracking" element={<OrderTracking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App