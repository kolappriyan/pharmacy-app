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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/pharmacy.png" alt="PharmaCare" style={{ width: '35px', height: '35px' }} />
        <h2 style={{ color: 'white', margin: 0 }}>PharmaCare</h2>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
        <Link to="/medicines" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Medicines</Link>
        <Link to="/cart" style={{ color: '#f6eff1', textDecoration: 'none', position: 'relative', fontWeight: 'bold' }}>
          Cart
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'red', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/track-order" style={{ color: '#f3d353', textDecoration: 'none', fontWeight: 'bold' }}>Track Order</Link>
        {user && window.location.pathname !== '/admin' ? (
          <span style={{ color: 'white' }}>Hi 😊 {user.name}</span>
        ) : null}
        {user ? (
          <button onClick={handleLogout} style={{ padding: '6px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <span style={{ display: 'flex', gap: '20px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
          </span>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ padding: '6px 15px', background: darkMode ? '#efeee9' : '#1a1a2e', color: darkMode ? 'black' : '#e6e6c2', border: 'none', borderRadius: '50000px', cursor: 'pointer', fontSize: '16px' }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar