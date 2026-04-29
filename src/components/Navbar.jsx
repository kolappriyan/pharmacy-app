import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ background: '#2c7be5', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ color: 'white', margin: 0 }}>💊 PharmaCare</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/medicines" style={{ color: 'white', textDecoration: 'none' }}>Medicines</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
        <Link to="/tracking" style={{ color: 'white', textDecoration: 'none' }}>Track Order</Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
      </div>
    </nav>
  )
}

export default Navbar