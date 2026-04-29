function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#2c7be5' }}>💊 Welcome to PharmaCare</h1>
      <p style={{ fontSize: '20px', color: '#555', marginTop: '20px' }}>
        Order medicines online and get them delivered to your doorstep!
      </p>
      <a href="/medicines" style={{
        display: 'inline-block',
        marginTop: '30px',
        padding: '15px 40px',
        background: '#2c7be5',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '18px'
      }}>
        Browse Medicines
      </a>
    </div>
  )
}

export default Home