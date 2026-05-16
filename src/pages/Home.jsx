function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
    <h2 style={{ color: 'white', margin: 0 }}>Welcome to PharmaCare</h2>
      <p style={{ fontSize: '20px', color: '#b0a7a7', marginTop: '20px' }}>
        Order medicines online and get them delivered to your doorstep! Browse our wide selection of medicines, track your orders, and enjoy a seamless shopping experience with PharmaCare. Your health is our priority!
      </p>
      <a href="/medicines" style={{
        display: 'inline-block',
        marginTop: '60px',
        padding: '15px 40px',
        background: '#1970e1',
        color: '#ffffff',
        borderRadius: '1000px',
        textDecoration: 'none', 
        fontSize: '25px',
        boxShadow: '1px 15px 10px rgba(70, 95, 194, 0.3)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontFamily: 'helvetica, sans-serif'
      }}>
        Search Medicines
      </a>
    </div>
  )
}

export default Home