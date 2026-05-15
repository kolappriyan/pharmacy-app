import { useState, useEffect } from 'react'

function OrderTracking() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inputId, setInputId] = useState('')

  useEffect(() => {
    const savedId = localStorage.getItem('lastOrderId')
    if (savedId) {
      fetchOrder(savedId)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchOrder = (id) => {
    setLoading(true)
    fetch(`http://localhost:8080/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data)
        setLoading(false)
      })
      .catch(() => {
        setOrder(null)
        setLoading(false)
      })
  }

  const handleSearch = () => {
    if (!inputId) return
    fetchOrder(inputId)
  }

  const getSteps = (status) => [
    { label: 'Order Placed', done: true },
    { label: 'Order Confirmed', done: ['Processing', 'Out for Delivery', 'Delivered'].includes(status) },
    { label: 'Packed', done: ['Out for Delivery', 'Delivered'].includes(status) },
    { label: 'Out for Delivery', done: ['Out for Delivery', 'Delivered'].includes(status) },
    { label: 'Delivered', done: status === 'Delivered' },
  ]

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ color: '#94e598' }}>📦 Order Tracking</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter Order ID (e.g. 1)"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          Track
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#777' }}>Loading...</p>}

      {!loading && !order && (
        <p style={{ textAlign: 'center', color: '#777' }}>Order not found. Please enter a valid Order ID.</p>
      )}

      {!loading && order && (
        <>
          <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.customerPhone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> Rs. {order.totalAmount}</p>
            <p><strong>Status:</strong> <span style={{ color: '#2c7be5', fontWeight: 'bold' }}>{order.status}</span></p>
          </div>

          <div>
            {getSteps(order.status).map((step, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: step.done ? '#28a745' : '#ccc',
                  color: 'white', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 'bold', flexShrink: 0
                }}>
                  {step.done ? '✓' : index + 1}
                </div>
                <div style={{ marginLeft: '15px', fontSize: '16px', color: step.done ? '#333' : '#aaa' }}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default OrderTracking