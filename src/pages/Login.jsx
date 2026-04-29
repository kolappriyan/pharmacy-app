import { useState } from 'react'

function Login() {
  const [loginType, setLoginType] = useState('email')

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c7be5' }}>Login</h2>

      {/* Toggle Buttons */}
      <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
        <button
          onClick={() => setLoginType('email')}
          style={{ flex: 1, padding: '10px', background: loginType === 'email' ? '#2c7be5' : '#eee', color: loginType === 'email' ? 'white' : 'black', border: 'none', borderRadius: '5px 0 0 5px', cursor: 'pointer' }}>
          Email
        </button>
        <button
          onClick={() => setLoginType('phone')}
          style={{ flex: 1, padding: '10px', background: loginType === 'phone' ? '#2c7be5' : '#eee', color: loginType === 'phone' ? 'white' : 'black', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}>
          Phone Number
        </button>
      </div>

      {/* Email or Phone Input */}
      <div>
        <label>{loginType === 'email' ? 'Email' : 'Phone Number'}</label>
        <input
          type={loginType === 'email' ? 'email' : 'tel'}
          placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
          style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      {/* Password */}
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <button style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
        Login
      </button>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <a href="/register" style={{ color: '#2c7be5' }}>Register</a>
      </p>
    </div>
  )
}

export default Login