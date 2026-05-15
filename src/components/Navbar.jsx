import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'

function Navbar({ darkMode, setDarkMode }) {
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <nav style={{ background: '#2c7be5', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ color: 'white', margin: 0 }}>PharmaCare</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/medicines" style={{ color: 'white', textDecoration: 'none' }}>Medicines</Link>
        <Link to="/cart" style={{ color: '#f6eff1', textDecoration: 'none', position: 'relative' }}>
          Cart
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'red', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/track-order" style={{ color: '#f3d353', textDecoration: 'none' }}>Track Order</Link>
        {user && window.location.pathname !== '/admin' ? (
          <span style={{ color: 'white' }}>Hi 😊 {user.name}</span>
        ) : null}
        {user ? (
          <button onClick={handleLogout} style={{ padding: '6px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <span style={{ display: 'flex', gap: '20px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </span>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: '6px 15px', background: darkMode ? '#efeee9' : '#1a1a2e', color: darkMode ? 'black' : '#e6e6c2', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar