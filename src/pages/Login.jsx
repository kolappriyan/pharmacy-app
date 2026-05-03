import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [loginType, setLoginType] = useState('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if ((!email && !phone) || !password) {
      setMessage('❌ Please fill all fields!')
      return
    }

    setLoading(true)
    fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, phone, password })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        if (data.message === 'Login successful!') {
          setMessage(`✅ Welcome ${data.name}!`)
          localStorage.setItem('user', JSON.stringify(data))
          setTimeout(() => navigate('/'), 1500)
        } else {
          setMessage('❌ Invalid credentials!')
        }
      })
      .catch(() => {
        setLoading(false)
        setMessage('❌ Something went wrong!')
      })
  }

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c7be5' }}>Login</h2>

      <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
        <button onClick={() => setLoginType('email')} style={{ flex: 1, padding: '10px', background: loginType === 'email' ? '#2c7be5' : '#eee', color: loginType === 'email' ? 'white' : 'black', border: 'none', borderRadius: '5px 0 0 5px', cursor: 'pointer' }}>
          Email
        </button>
        <button onClick={() => setLoginType('phone')} style={{ flex: 1, padding: '10px', background: loginType === 'phone' ? '#2c7be5' : '#eee', color: loginType === 'phone' ? 'white' : 'black', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer' }}>
          Phone Number
        </button>
      </div>

      <div>
        <label>{loginType === 'email' ? 'Email' : 'Phone Number'}</label>
        <input
          type={loginType === 'email' ? 'email' : 'tel'}
          placeholder={loginType === 'email' ? 'Enter your email' : 'Enter your phone number'}
          value={loginType === 'email' ? email : phone}
          onChange={(e) => loginType === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <div>
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}

      <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <a href="/register" style={{ color: '#2c7be5' }}>Register</a>
      </p>
    </div>
  )
}

export default Login