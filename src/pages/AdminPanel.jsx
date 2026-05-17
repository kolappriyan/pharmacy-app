import { useState, useEffect } from 'react'

function AdminPanel() {
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('medicines')
  const [medicines, setMedicines] = useState([])
  const [orders, setOrders] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', price: '', stock: '', prescriptionRequired: false })

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAdmin(true)
      setError('')
    } else {
      setError('Wrong password!')
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetch('https://pharmacy-backend-1-41kr.onrender.com/api/medicines')
        .then(res => res.json()).then(data => setMedicines(Array.isArray(data) ? data : [])).catch(() => setMedicines([]))
      fetch('https://pharmacy-backend-1-41kr.onrender.com/api/orders')
        .then(res => res.json()).then(data => setOrders(Array.isArray(data) ? data : [])).catch(() => setOrders([]))
      fetch('https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions')
        .then(res => res.json()).then(data => setPrescriptions(Array.isArray(data) ? data : [])).catch(() => setPrescriptions([]))
    }
  }, [isAdmin])

  const handleAdd = () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.price || !newMedicine.stock) {
      alert('Please fill all fields!')
      return
    }
    fetch('https://pharmacy-backend-1-41kr.onrender.com/api/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMedicine)
    }).then(res => res.json()).then(data => {
      setMedicines([...medicines, data])
      setNewMedicine({ name: '', category: '', price: '', stock: '', prescriptionRequired: false })
    })
  }

  const handleDelete = (id) => {
    if (!window.confirm('Delete this medicine?')) return
    fetch(`https://pharmacy-backend-1-41kr.onrender.com/api/medicines/${id}`, { method: 'DELETE' })
      .then(() => setMedicines(medicines.filter(m => m.id !== id)))
  }

  const updateOrderStatus = (id, status) => {
    fetch(`https://pharmacy-backend-1-41kr.onrender.com/api/orders/${id}/status?status=${status}`, { method: 'PUT' })
      .then(res => res.json())
      .then(updated => setOrders(orders.map(o => o.id === id ? updated : o)))
  }

  const verifyPrescription = (id) => {
    fetch(`https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions/${id}/verify`, { method: 'PUT' })
      .then(res => res.json())
      .then(updated => setPrescriptions(prescriptions.map(p => p.id === id ? updated : p)))
  }

  const rejectPrescription = (id) => {
    fetch(`https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions/${id}/reject`, { method: 'PUT' })
      .then(res => res.json())
      .then(updated => setPrescriptions(prescriptions.map(p => p.id === id ? updated : p)))
  }

  if (!isAdmin) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white', borderRadius: '20px', padding: '40px',
          width: '100%', maxWidth: '400px', textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>🔐</div>
          <h2 style={{ color: '#1a73e8', margin: '0 0 5px' }}>Admin Panel</h2>
          <p style={{ color: '#777', marginBottom: '25px' }}>Enter password to continue</p>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e0e0e0', boxSizing: 'border-box', fontSize: '16px', marginBottom: '10px' }}
          />
          {error && <p style={{ color: 'red', margin: '0 0 10px' }}>❌ {error}</p>}
          <button onClick={handleLogin} style={{
            width: '100%', padding: '13px',
            background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)',
            color: 'white', border: 'none', borderRadius: '10px',
            fontSize: '16px', fontWeight: '700', cursor: 'pointer'
          }}>Login as Admin 🚀</button>
        </div>
      </div>
    )
  }

  const tabBtn = (tab, label, emoji) => (
    <button onClick={() => setActiveTab(tab)} style={{
      padding: '10px 18px',
      background: activeTab === tab ? 'linear-gradient(135deg, #1a73e8, #6a1b9a)' : '#f0f0f0',
      color: activeTab === tab ? 'white' : '#555',
      border: 'none', borderRadius: '10px', cursor: 'pointer',
      fontWeight: '700', fontSize: '14px', whiteSpace: 'nowrap'
    }}>{emoji} {label}</button>
  )

  return (
    <div style={{ padding: '15px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)',
        borderRadius: '15px', padding: '20px', marginBottom: '20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'
      }}>
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: 'clamp(18px, 4vw, 28px)' }}>🏥 Admin Panel</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>PharmaCare Dashboard</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px 15px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>{medicines.length}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Medicines</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px 15px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>{orders.length}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Orders</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', padding: '10px 15px', textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>{prescriptions.length}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Prescriptions</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabBtn('medicines', 'Medicines', '💊')}
        {tabBtn('orders', 'Orders', '📦')}
        {tabBtn('prescriptions', 'Prescriptions', '📋')}
      </div>

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <div>
          {/* Add Medicine Form */}
          <div style={{ background: 'white', borderRadius: '15px', padding: '20px', marginBottom: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <h3 style={{ color: '#1a73e8', margin: '0 0 15px' }}>➕ Add New Medicine</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginBottom: '15px' }}>
              <input placeholder="Medicine Name" value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
              <input placeholder="Category" value={newMedicine.category}
                onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
              <input placeholder="Price" type="number" value={newMedicine.price}
                onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
              <input placeholder="Stock" type="number" value={newMedicine.stock}
                onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <input type="checkbox" id="prescription" checked={newMedicine.prescriptionRequired}
                onChange={(e) => setNewMedicine({ ...newMedicine, prescriptionRequired: e.target.checked })} />
              <label htmlFor="prescription" style={{ fontSize: '14px', color: '#555' }}>⚠️ Prescription Required</label>
            </div>
            <button onClick={handleAdd} style={{
              padding: '11px 25px', background: 'linear-gradient(135deg, #28a745, #20874f)',
              color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '15px', fontWeight: '700'
            }}>➕ Add Medicine</button>
          </div>

          {/* Medicines Cards (Mobile friendly) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
            {medicines.map(medicine => (
              <div key={medicine.id} style={{
                background: 'white', borderRadius: '12px', padding: '15px',
                boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
                borderLeft: '4px solid #1a73e8'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px', color: '#333' }}>💊 {medicine.name}</h4>
                    <p style={{ margin: '3px 0', color: '#777', fontSize: '13px' }}>📁 {medicine.category}</p>
                    <p style={{ margin: '3px 0', color: '#28a745', fontWeight: '700' }}>Rs. {medicine.price}</p>
                    <p style={{ margin: '3px 0', color: '#555', fontSize: '13px' }}>Stock: {medicine.stock}</p>
                    {medicine.prescriptionRequired && (
                      <span style={{ fontSize: '11px', color: 'red' }}>⚠️ Prescription Required</span>
                    )}
                  </div>
                  <button onClick={() => handleDelete(medicine.id)} style={{
                    padding: '7px 12px', background: '#ff4444', color: 'white',
                    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px'
                  }}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
          {orders.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', padding: '50px', gridColumn: '1/-1' }}>No orders yet!</p>
          ) : orders.map(order => (
            <div key={order.id} style={{
              background: 'white', borderRadius: '12px', padding: '18px',
              boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${order.status === 'Delivered' ? '#28a745' : order.status === 'Processing' ? '#ffc107' : '#dc3545'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', color: '#1a73e8' }}>#{order.id}</span>
                <span style={{
                  padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                  background: order.status === 'Delivered' ? '#28a745' : order.status === 'Processing' ? '#ffc107' : '#dc3545',
                  color: 'white'
                }}>{order.status}</span>
              </div>
              <p style={{ margin: '4px 0', color: '#333', fontWeight: '600' }}>👤 {order.customerName}</p>
              <p style={{ margin: '4px 0', color: '#555', fontSize: '13px' }}>📞 {order.customerPhone}</p>
              <p style={{ margin: '4px 0', color: '#555', fontSize: '13px' }}>📍 {order.address}</p>
              <p style={{ margin: '8px 0', color: '#28a745', fontWeight: '700' }}>💰 Rs. {order.totalAmount}</p>
              <select onChange={(e) => updateOrderStatus(order.id, e.target.value)} defaultValue={order.status}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', marginTop: '5px' }}>
                <option value="Pending">⏳ Pending</option>
                <option value="Processing">🔄 Processing</option>
                <option value="Out for Delivery">🚚 Out for Delivery</option>
                <option value="Delivered">✅ Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Prescriptions Tab */}
      {activeTab === 'prescriptions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
          {prescriptions.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', padding: '50px', gridColumn: '1/-1' }}>No prescriptions uploaded yet!</p>
          ) : prescriptions.map(p => (
            <div key={p.id} style={{
              background: 'white', borderRadius: '12px', padding: '18px',
              boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
              borderLeft: `4px solid ${p.status === 'VERIFIED' ? '#28a745' : p.status === 'REJECTED' ? '#dc3545' : '#ffc107'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', color: '#1a73e8' }}>#{p.id}</span>
                <span style={{
                  padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                  background: p.status === 'VERIFIED' ? '#28a745' : p.status === 'REJECTED' ? '#dc3545' : '#ffc107',
                  color: 'white'
                }}>{p.status}</span>
              </div>
              <p style={{ margin: '4px 0', color: '#333', fontWeight: '600' }}>👤 {p.customerName}</p>
              <p style={{ margin: '4px 0', color: '#555', fontSize: '13px' }}>📧 {p.customerEmail}</p>
              <a href={'https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions/file/' + p.fileName}
                target="_blank" rel="noreferrer"
                style={{ display: 'inline-block', margin: '10px 0', padding: '7px 15px', background: '#1a73e8', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>
                📄 View File
              </a>
              {p.status === 'PENDING' && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
                  <button onClick={() => verifyPrescription(p.id)} style={{
                    flex: 1, padding: '9px', background: '#28a745', color: 'white',
                    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px'
                  }}>✅ Verify</button>
                  <button onClick={() => rejectPrescription(p.id)} style={{
                    flex: 1, padding: '9px', background: '#dc3545', color: 'white',
                    border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px'
                  }}>❌ Reject</button>
                </div>
              )}
              {p.status !== 'PENDING' && (
                <p style={{ color: '#777', fontSize: '13px', margin: '8px 0 0', textAlign: 'center' }}>✓ Action Completed</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPanel