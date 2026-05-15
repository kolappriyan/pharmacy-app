function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1 style={{ fontSize: '48px', color: '#3684eb' }}>💊 Welcome toPharmaCare</h1>
      <p style={{ fontSize: '20px', color: '#b0a7a7', marginTop: '20px' }}>
        Order medicines online and get them delivered to your doorstep!
      </p>
      <a href="/medicines" style={{
        display: 'inline-block',
        marginTop: '30px',
        padding: '15px 40px',
        background: '#1970e1',
        color: 'white',
        borderRadius: '8px',
        textDecoration: 'none', 
        fontSize: '20px'
      }}>
        Search Medicines
      </a>
    </div>
  )
}

export default Home