import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    nicNumber: '',
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    if (!form.fullName || !form.email || !form.phone || !form.nicNumber || !form.password) {
      setMessage('❌ Please fill all fields!')
      return
    }
    if (form.password !== form.confirmPassword) {
      setMessage('❌ Passwords do not match!')
      return
    }

    setLoading(true)
    fetch('https://pharmacy-backend-1-41kr.onrender.com/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        nicNumber: form.nicNumber,
        password: form.password
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        if (data.message === 'Registration successful!') {
          localStorage.setItem('registerEmail', form.email)
          localStorage.setItem('registerPhone', form.phone)
          localStorage.setItem('registerName', form.fullName)
          setMessage('✅ Registration successful! Redirecting to login...')
          setTimeout(() => navigate('/login'), 2000)
        } else {
          setMessage(`❌ ${data.message}`)
        }
      })
      .catch(() => {
        setLoading(false)
        setMessage('❌ Something went wrong!')
      })
  }

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c7be5' }}>Register</h2>

      <div style={{ marginTop: '20px' }}>
        <label>Full Name</label>
        <input type="text" placeholder="Enter your full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Phone Number</label>
        <input type="tel" placeholder="Enter your phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>NIC Number</label>
        <input type="text" placeholder="Enter your NIC number" value={form.nicNumber} onChange={(e) => setForm({ ...form, nicNumber: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Password</label>
        <input type="password" placeholder="Enter your password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      <div>
        <label>Confirm Password</label>
        <input type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>

      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red', textAlign: 'center' }}>{message}</p>}

      <button onClick={handleRegister} disabled={loading} style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <a href="/login" style={{ color: '#2c7be5' }}>Login</a>
      </p>
    </div>
  )
}

export default Register