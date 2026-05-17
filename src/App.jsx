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
  const [transitioning, setTransitioning] = useState(false)

  const toggleDarkMode = () => {
    setTransitioning(true)
    setTimeout(() => {
      setDarkMode(prev => !prev)
      setTransitioning(false)
    }, 400)
  }

  useEffect(() => {
    document.body.style.transition = 'background 0.5s ease, color 0.5s ease'
    document.body.style.background = darkMode ? '#1a1a2e' : '#f5f7ff'
    document.body.style.color = darkMode ? '#ffffff' : '#000000'
  }, [darkMode])

  return (
    <BrowserRouter>
      {/* Flash overlay animation */}
      {transitioning && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: darkMode
            ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(26,26,46,0.3) 0%, transparent 70%)',
          zIndex: 9999,
          animation: 'flashOverlay 0.4s ease forwards',
          pointerEvents: 'none'
        }} />
      )}

      {/* Sun/Moon animation overlay */}
      {transitioning && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '80px',
          zIndex: 10000,
          animation: 'popIcon 0.4s ease forwards',
          pointerEvents: 'none'
        }}>
          {darkMode ? '🌝' : '🌚'}
        </div>
      )}

      <div style={{
        transition: 'all 0.5s ease',
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : '#f5f7ff'
      }}>
        <Navbar darkMode={darkMode} setDarkMode={toggleDarkMode} />
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
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes flashOverlay {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes popIcon {
          0% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(0.5); 
          }
          40% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1.3); 
          }
          70% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(1.5); 
          }
        }

        * {
          transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease;
        }

        body {
          transition: background 0.5s ease, color 0.5s ease !important;
        }

        /* Dark mode scrollbar */
        :root {
          color-scheme: ${darkMode ? 'dark' : 'light'};
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${darkMode ? '#1a1a2e' : '#f0f0f0'};
        }

        ::-webkit-scrollbar-thumb {
          background: ${darkMode ? '#6a1b9a' : '#1a73e8'};
          border-radius: 10px;
        }
      `}</style>
    </BrowserRouter>
  )
}

export default App