import { useState, useEffect } from 'react'

function AdminPanel() {
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('medicines')
  const [medicines, setMedicines] = useState([])
  const [orders, setOrders] = useState([])
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', price: '', stock: '' })

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAdmin(true)
      setError('')
    } else {
      setError('❌ Wrong password!')
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetch('http://localhost:8080/api/medicines')
        .then(res => res.json())
        .then(data => setMedicines(data))

      fetch('http://localhost:8080/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
    }
  }, [isAdmin])

  const handleAdd = () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.price || !newMedicine.stock) {
      alert('Please fill all fields!')
      return
    }
    fetch('http://localhost:8080/api/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMedicine)
    })
      .then(res => res.json())
      .then(data => {
        setMedicines([...medicines, data])
        setNewMedicine({ name: '', category: '', price: '', stock: '' })
      })
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/medicines/${id}`, { method: 'DELETE' })
      .then(() => setMedicines(medicines.filter(m => m.id !== id)))
  }

  const updateOrderStatus = (id, status) => {
    fetch(`http://localhost:8080/api/orders/${id}/status?status=${status}`, { method: 'PUT' })
      .then(res => res.json())
      .then(updated => setOrders(orders.map(o => o.id === id ? updated : o)))
  }

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c7be5' }}>👨‍💼 Admin Access</h2>
        <p style={{ color: '#777' }}>Enter admin password to continue</p>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '15px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
          Login as Admin
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>👨‍💼 Admin Panel</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('medicines')} style={{ padding: '10px 25px', background: activeTab === 'medicines' ? '#2c7be5' : '#eee', color: activeTab === 'medicines' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          💊 Medicines
        </button>
        <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 25px', background: activeTab === 'orders' ? '#2c7be5' : '#eee', color: activeTab === 'orders' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          📦 Orders
        </button>
      </div>

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <div>
          <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <h3>Add New Medicine</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
              <input placeholder="Medicine Name" value={newMedicine.name} onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input placeholder="Category" value={newMedicine.category} onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input placeholder="Price" type="number" value={newMedicine.price} onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input placeholder="Stock" type="number" value={newMedicine.stock} onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <button onClick={handleAdd} style={{ padding: '10px 25px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>+ Add Medicine</button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#2c7be5', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Stock</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map(medicine => (
                <tr key={medicine.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{medicine.name}</td>
                  <td style={{ padding: '12px' }}>{medicine.category}</td>
                  <td style={{ padding: '12px' }}>Rs. {medicine.price}</td>
                  <td style={{ padding: '12px' }}>{medicine.stock}</td>
                  <td style={{ padding: '12px' }}>
                    <button onClick={() => handleDelete(medicine.id)} style={{ padding: '8px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#2c7be5', color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Address</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>#{order.id}</td>
                  <td style={{ padding: '12px' }}>{order.customerName}</td>
                  <td style={{ padding: '12px' }}>{order.customerPhone}</td>
                  <td style={{ padding: '12px' }}>{order.address}</td>
                  <td style={{ padding: '12px' }}>Rs. {order.totalAmount}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '5px 10px', borderRadius: '5px', background: order.status === 'Delivered' ? '#28a745' : order.status === 'Processing' ? '#ffc107' : '#dc3545', color: 'white', fontSize: '12px' }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <select onChange={(e) => updateOrderStatus(order.id, e.target.value)} defaultValue={order.status} style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminPanel