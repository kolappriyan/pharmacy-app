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
        .then(res => res.json())
        .then(data => setMedicines(Array.isArray(data) ? data : []))
        .catch(() => setMedicines([]))
      fetch('https://pharmacy-backend-1-41kr.onrender.com/api/orders')
        .then(res => res.json())
        .then(data => setOrders(Array.isArray(data) ? data : []))
        .catch(() => setOrders([]))
      fetch('https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions')
        .then(res => res.json())
        .then(data => setPrescriptions(Array.isArray(data) ? data : []))
        .catch(() => setPrescriptions([]))
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
    })
      .then(res => res.json())
      .then(data => {
        setMedicines([...medicines, data])
        setNewMedicine({ name: '', category: '', price: '', stock: '', prescriptionRequired: false })
      })
  }

  const handleDelete = (id) => {
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
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c7be5' }}>Admin Access</h2>
        <p style={{ color: '#777' }}>Enter admin password to continue</p>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '15px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>Login as Admin</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>Admin Panel</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setActiveTab('medicines')} style={{ padding: '10px 25px', background: activeTab === 'medicines' ? '#2c7be5' : '#eee', color: activeTab === 'medicines' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Medicines</button>
        <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 25px', background: activeTab === 'orders' ? '#2c7be5' : '#eee', color: activeTab === 'orders' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Orders</button>
        <button onClick={() => setActiveTab('prescriptions')} style={{ padding: '10px 25px', background: activeTab === 'prescriptions' ? '#2c7be5' : '#eee', color: activeTab === 'prescriptions' ? 'white' : 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Prescriptions</button>
      </div>

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
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px' }}>
            <input
            type="checkbox"
            id="prescription"
            checked={newMedicine.prescriptionRequired}
            onChange={(e) => setNewMedicine({ ...newMedicine, prescriptionRequired: e.target.checked })}
            />
            <label htmlFor="prescription" style={{ fontSize: '14px' }}>⚠️ Prescription Required</label>
            </div> 
            <button onClick={handleAdd} style={{ padding: '10px 25px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Add Medicine</button>
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
                    <span style={{ padding: '5px 10px', borderRadius: '5px', background: order.status === 'Delivered' ? '#28a745' : order.status === 'Processing' ? '#ffc107' : '#dc3545', color: 'white', fontSize: '12px' }}>{order.status}</span>
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

      {activeTab === 'prescriptions' && (
        <div>
          {prescriptions.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', padding: '50px' }}>No prescriptions uploaded yet!</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2c7be5', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>File</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>#{p.id}</td>
                    <td style={{ padding: '12px' }}>{p.customerName}</td>
                    <td style={{ padding: '12px' }}>{p.customerEmail}</td>
                    <td style={{ padding: '12px' }}>
                      <a href={'https://pharmacy-backend-1-41kr.onrender.com/api/prescriptions/file/' + p.fileName} target="_blank" rel="noreferrer" style={{ color: '#2c7be5', textDecoration: 'none', fontWeight: 'bold' }}>View File</a>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '5px 10px', borderRadius: '5px', background: p.status === 'VERIFIED' ? '#28a745' : p.status === 'REJECTED' ? '#dc3545' : '#ffc107', color: 'white', fontSize: '12px' }}>{p.status}</span>
                    </td>
                    <td style={{ padding: '12px', display: 'flex', gap: '5px' }}>
                      {p.status === 'PENDING' && (
                        <span>
                          <button onClick={() => verifyPrescription(p.id)} style={{ padding: '8px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Verify</button>
                          <button onClick={() => rejectPrescription(p.id)} style={{ padding: '8px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Reject</button>
                        </span>
                      )}
                      {p.status !== 'PENDING' && <span style={{ color: '#777' }}>Done</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPanel