function OrderTracking() {
  const order = {
    id: 'ORD-001',
    date: '2026-04-28',
    items: ['Paracetamol x2', 'Cetirizine x1'],
    total: 180,
    status: 'Out for Delivery'
  }

  const steps = [
    { label: 'Order Placed', done: true },
    { label: 'Order Confirmed', done: true },
    { label: 'Packed', done: true },
    { label: 'Out for Delivery', done: true },
    { label: 'Delivered', done: false },
  ]

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>📦 Order Tracking</h2>

      {/* Order Info */}
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Date:</strong> {order.date}</p>
        <p><strong>Items:</strong> {order.items.join(', ')}</p>
        <p><strong>Total:</strong> Rs. {order.total}</p>
        <p><strong>Status:</strong> <span style={{ color: '#2c7be5', fontWeight: 'bold' }}>{order.status}</span></p>
      </div>

      {/* Tracking Steps */}
      <div>
        {steps.map((step, index) => (
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
    </div>
  )
}

export default OrderTracking