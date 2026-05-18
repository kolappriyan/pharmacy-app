import { useState } from 'react'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()

  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [prescription, setPrescription] = useState(null)
  const [loading, setLoading] = useState(false)
  const getLoggedInUser = () => {
  try {
    const userStr = localStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)
    return null
  } catch { return null }
  }

const loggedUser = getLoggedInUser()

const [form, setForm] = useState({
  customerName: loggedUser?.name || '',
  customerEmail: loggedUser?.email || '',
  customerPhone: loggedUser?.phone || '',
  address: ''
})

  const isLoggedIn = () => {
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  if (token) return true
  if (userStr) {
    try {
      const user = JSON.parse(userStr)
      return !!(user.token || user.id)
    } catch { return false }
  }
  return false
}

  const validCoupons = { 'PHARMA10': 10, 'SAVE20': 20, 'HEALTH15': 15 }
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount

  const hasPrescriptionItems = cartItems.some(item => item.prescriptionRequired)

  const applyCoupon = () => {
    if (validCoupons[coupon.toUpperCase()]) {
      setDiscount(validCoupons[coupon.toUpperCase()])
      setMessage(`✅ Coupon applied! ${validCoupons[coupon.toUpperCase()]}% discount!`)
    } else {
      setDiscount(0)
      setMessage('❌ Invalid coupon code!')
    }
  }
  const placeOrder = async () => {
  // Debug
  console.log('Token:', localStorage.getItem('token'))
  console.log('isLoggedIn:', isLoggedIn())
  console.log('Form:', form)
  
  // Login check
  if (!isLoggedIn()) {
    alert('Please login!')
    window.location.href = '/login'
    return
  }
  // ... rest same
  const placeOrder = async () => {
    // Login check
    if (!isLoggedIn()) {
      alert('⚠️ Please login or register to place an order!')
      window.location.href = '/login'
      return
    }

    if (!form.customerName || !form.customerEmail || !form.customerPhone || !form.address) {
      alert('Please fill all fields!')
      return
    }
    if (hasPrescriptionItems && !prescription) {
      alert('⚠️ Please upload prescription for prescription required medicines!')
      return
    }

    setLoading(true)

    try {
      const order = {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        address: form.address,
        totalAmount: total
      }

      const orderRes = await fetch('https://pharmacy-backend-1-41kr.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })

      if (!orderRes.ok) throw new Error('Order failed')
      const orderData = await orderRes.json()
      localStorage.setItem('lastOrderId', orderData.id)

      if (prescription) {
        const formData = new FormData()
        formData.append('file', prescription)
        formData.append('customerName', form.customerName)
        formData.append('customerEmail', form.customerEmail)
        formData.append('orderId', orderData.id)

        await fetch('https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions/upload', {
          method: 'POST',
          body: formData
        })
      }

      clearCart()
      setOrderPlaced(true)

    } catch (err) {
      alert('Order failed! Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h2 style={{ color: '#777' }}>🛒 Your cart is empty!</h2>
        <a href="/medicines" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 30px', background: '#2c7be5', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Browse Medicines
        </a>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <h1 style={{ fontSize: '48px' }}>🎉</h1>
        <h2 style={{ color: '#49be64' }}>Order Placed Successfully!</h2>
        <p style={{ color: '#766f6f' }}>Your medicines will be delivered soon!</p>
        <a href="/" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 30px', background: '#2c7be5', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Back to Home
        </a>
        <a href="/track-order" style={{ display: 'inline-block', marginTop: '20px', marginLeft: '10px', padding: '12px 30px', background: '#28a745', color: 'white', borderRadius: '5px', textDecoration: 'none' }}>
          Track Order
        </a>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>🛒 My Cart</h2>

      {/* Login Warning Banner */}
      {!isLoggedIn() && (
        <div style={{
          background: '#fff3cd',
          border: '2px solid #ffc107',
          borderRadius: '10px',
          padding: '15px 20px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <p style={{ margin: 0, color: '#856404', fontWeight: '600', fontSize: '15px' }}>
            ⚠️ Login Required!
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href="/login" style={{
              padding: '8px 20px', background: '#2c7be5', color: 'white',
              borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold'
            }}>Login</a>
            <a href="/register" style={{
              padding: '8px 20px', background: '#28a745', color: 'white',
              borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold'
            }}>Register</a>
          </div>
        </div>
      )}

      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <div>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={{ color: '#777', margin: '5px 0' }}>Rs. {item.price} x {item.quantity}</p>
            {item.prescriptionRequired && <p style={{ color: 'red', fontSize: '12px', margin: 0 }}>⚠️ Prescription Required</p>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '5px 12px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '5px 12px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>+</button>
            <button onClick={() => removeFromCart(item.id)} style={{ padding: '8px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
          </div>
        </div>
      ))}

      {hasPrescriptionItems && (
        <div style={{ padding: '25px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', marginTop: '20px', background: '#fff3cd' }}>
          <h3 style={{ color: '#917830' }}>⚠️ Prescription Required</h3>
          <p style={{ color: '#5b4912', fontSize: '16px' }}>Some medicines require a prescription. Please upload a valid prescription with doctor's seal.</p>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setPrescription(e.target.files[0])}
            style={{ marginTop: '10px', width: '100%' }}
          />
          {prescription && <p style={{ color: 'green', marginTop: '5px' }}>✅ {prescription.name} uploaded!</p>}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input type="text" placeholder="Enter coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }} />
        <button onClick={applyCoupon} style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Apply</button>
      </div>
      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p>Subtotal: Rs. {subtotal}</p>
        {discount > 0 && <p style={{ color: 'green' }}>Discount ({discount}%): - Rs. {discountAmount}</p>}
        <h3>Total: Rs. {total}</h3>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
        <h3 style={{ color: '#d97731', fontSize: '25px' }}>📦 Delivery Details</h3>
        <input type="text" placeholder="Full Name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input type="email" placeholder="Email" value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <input type="tel" placeholder="Phone Number" value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        <textarea placeholder="Delivery Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box', height: '80px' }} />
        <button
          onClick={placeOrder}
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: loading ? '#999' : '#b79832', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Placing Order...' : '🛒 Place Order'}
        </button>
      </div>
    </div>
  )
}

export default Cart