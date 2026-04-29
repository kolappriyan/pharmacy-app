function Register() {
  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c7be5' }}>Register</h2>

      <div style={{ marginTop: '20px' }}>
        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Phone Number</label>
        <input type="tel" placeholder="Enter your phone number" style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Password</label>
        <input type="password" placeholder="Enter your password" style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>NIC Number</label>
        <input type="text" placeholder="Enter your NIC number" style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm your password" style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <button style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
        Register
      </button>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <a href="/login" style={{ color: '#2c7be5' }}>Login</a>
      </p>
    </div>
  )
}

export default Register