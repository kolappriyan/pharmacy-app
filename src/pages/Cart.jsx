import { useState } from 'react'

function Cart() {
  const cartItems = [
    { id: 1, name: 'Paracetamol', price: 50, quantity: 2 },
    { id: 2, name: 'Cetirizine', price: 80, quantity: 1 },
  ]

  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [message, setMessage] = useState('')

  const validCoupons = {
    'PHARMA10': 10,
    'SAVE20': 20,
    'HEALTH15': 15,
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal - discountAmount

  const applyCoupon = () => {
    if (validCoupons[coupon.toUpperCase()]) {
      setDiscount(validCoupons[coupon.toUpperCase()])
      setMessage(`✅ Coupon applied! ${validCoupons[coupon.toUpperCase()]}% discount!`)
    } else {
      setDiscount(0)
      setMessage('❌ Invalid coupon code!')
    }
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>🛒 My Cart</h2>

      {cartItems.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', marginBottom: '15px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <div>
            <h3 style={{ margin: 0 }}>{item.name}</h3>
            <p style={{ color: '#777', margin: '5px 0' }}>Rs. {item.price} x {item.quantity}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button style={{ padding: '5px 12px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>-</button>
            <span>{item.quantity}</span>
            <button style={{ padding: '5px 12px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc' }}>+</button>
            <button style={{ padding: '8px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Remove</button>
          </div>
        </div>
      ))}

      {/* Coupon Section */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button
          onClick={applyCoupon}
          style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Apply
        </button>
      </div>
      {message && <p style={{ marginTop: '10px', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}

      {/* Total Section */}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p>Subtotal: Rs. {subtotal}</p>
        {discount > 0 && <p style={{ color: 'green' }}>Discount ({discount}%): - Rs. {discountAmount}</p>}
        <h3>Total: Rs. {total}</h3>
        <button style={{ padding: '12px 30px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
          Place Order
        </button>
      </div>
    </div>
  )
}

export default Cart