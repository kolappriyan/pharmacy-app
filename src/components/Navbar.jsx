import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav style={{ background: '#2c7be5', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ color: 'white', margin: 0 }}>💊 PharmaCare</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/medicines" style={{ color: 'white', textDecoration: 'none' }}>Medicines</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
          🛒 Cart
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: 'red', color: 'white', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Track Order</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
      </div>
    </nav>
  )
}

export default Navbar