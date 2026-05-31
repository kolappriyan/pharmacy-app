import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'

function Navbar({ darkMode, setDarkMode }) {
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
    setMenuOpen(false)
  }

  const navStyle = {
    background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 50%, #6a1b9a 100%)',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '65px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  }

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
  }

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '20px',
    transition: 'background 0.3s',
    whiteSpace: 'nowrap',
  }

  const mobileLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    display: 'block',
  }

  return (
    <>
      <nav style={navStyle}>
        {/* Logo */}
        <Link to="/" style={logoStyle}>
          <img src="/medical.png" alt="PharmaCare"
            style={{ width: '30px', height: '30px', borderRadius: '50%', border: '2px solid white' }} />
          <span style={{ color: 'white', fontWeight: '800', fontSize: '20px', letterSpacing: '0.5px' }}>
             PharmaCare
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', '@media(maxWidth:768px)': { display: 'none' } }}
          className="desktop-menu">
          <Link to="/" style={linkStyle} onMouseEnter={e => e.target.style.background='rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.target.style.background='transparent'}> Home</Link>
          <Link to="/medicines" style={linkStyle} onMouseEnter={e => e.target.style.background='rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.target.style.background='transparent'}> Medicines</Link>
          <Link to="/cart" style={{ ...linkStyle, position: 'relative' }}
            onMouseEnter={e => e.target.style.background='rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.target.style.background='transparent'}>
             Cart
            {totalItems > 0 && (
              <span style={{ position: 'absolute', top: '-2px', right: '-2px', background: '#ff4444',
                color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/track-order" style={{ ...linkStyle, color: '#ffd54f' }}
            onMouseEnter={e => e.target.style.background='rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.target.style.background='transparent'}> Track Order</Link>

          {user && window.location.pathname !== '/admin' && (
            <span style={{ color: '#a5d6a7', fontWeight: '600', fontSize: '14px', padding: '0 8px' }}>
              👋 {user.name}
            </span>
          )}

          {user ? (
            <button onClick={handleLogout} style={{ padding: '7px 16px', background: 'linear-gradient(135deg, #ff4444, #cc0000)',
              color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" style={{ ...linkStyle, background: 'rgba(255,255,255,0.15)' }}>Login</Link>
              <Link to="/register" style={{ ...linkStyle, background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                padding: '7px 16px', borderRadius: '20px' }}>Register</Link>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '7px 14px',
              background: darkMode
              ? 'linear-gradient(135deg, #fff9c4, #ffd54f)'
              : 'linear-gradient(135deg, #1a1a2e, #0f3460)',
              color: darkMode ? '#333' : '#ffd54f',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 1.0s ease',
              boxShadow: darkMode
              ? '0 0 15px rgba(255,213,79,0.5)'
              : '0 0 15px rgba(106,27,154,0.5)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'rotate(20deg) scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1)'}
            >
              {darkMode ? '🔅' : '🌙'}
          </button>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'transparent',
            border: 'none', cursor: 'pointer', padding: '5px' }}>
          <span style={{ width: '25px', height: '3px', background: 'white', borderRadius: '3px',
            transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
          <span style={{ width: '25px', height: '3px', background: 'white', borderRadius: '3px',
            opacity: menuOpen ? 0 : 1, transition: '0.3s' }}></span>
          <span style={{ width: '25px', height: '3px', background: 'white', borderRadius: '3px',
            transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div style={{ background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)',
          position: 'fixed', top: '65px', left: 0, right: 0, zIndex: 999,
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
          className="mobile-menu">
          <Link to="/" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}> Home</Link>
          <Link to="/medicines" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}> Medicines</Link>
          <Link to="/cart" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>
             Cart {totalItems > 0 && <span style={{ background: '#ff4444', color: 'white',
              borderRadius: '50%', padding: '2px 7px', fontSize: '12px', marginLeft: '5px' }}>{totalItems}</span>}
          </Link>
          <Link to="/track-order" style={{ ...mobileLinkStyle, color: '#ffd54f' }} onClick={() => setMenuOpen(false)}> Track Order</Link>

          {user ? (
            <>
              <span style={{ ...mobileLinkStyle, color: '#a5d6a7' }}>👋 Hi, {user.name}</span>
              <button onClick={handleLogout} style={{ margin: '10px 20px', padding: '12px', width: 'calc(100% - 40px)',
                background: 'linear-gradient(135deg, #ff4444, #cc0000)', color: 'white', border: 'none',
                borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '15px' }}>
                Logout
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '10px', padding: '15px 20px' }}>
              <Link to="/login" style={{ flex: 1, padding: '12px', background: 'rgba(255,255,255,0.2)',
                color: 'white', textDecoration: 'none', borderRadius: '10px', textAlign: 'center',
                fontWeight: '700' }} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                color: 'white', textDecoration: 'none', borderRadius: '10px', textAlign: 'center',
                fontWeight: '700' }} onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}

          <div style={{ padding: '10px 20px 20px' }}>
            <button onClick={() => { setDarkMode(!darkMode); setMenuOpen(false) }}
              style={{ width: '100%', padding: '12px', background: darkMode ? '#fff9c4' : '#1a1a2e',
                color: darkMode ? '#333' : '#ffd54f', border: 'none', borderRadius: '10px',
                cursor: 'pointer', fontSize: '16px', fontWeight: '700' }}>
              {darkMode ? '🔅 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      )}

      {/* CSS for responsive */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default Navbar