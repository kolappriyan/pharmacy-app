import { useState, useEffect } from 'react'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend)

function AdminPanel() {
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('medicines')
  const [medicines, setMedicines] = useState([])
  const [orders, setOrders] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', price: '', stock: '', prescriptionRequired: false, imageUrl: '' })

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
      setNewMedicine({ name: '', category: '', price: '', stock: '', prescriptionRequired: false, imageUrl: '' })
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <h2 style={{ color: '#1a73e8', margin: '0 0 5px' }}>Admin Panel</h2>
          <p style={{ color: '#777', marginBottom: '25px' }}>Enter password to continue</p>
          <input type="password" placeholder="Enter admin password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '2px solid #e0e0e0', boxSizing: 'border-box', fontSize: '16px', marginBottom: '10px' }} />
          {error && <p style={{ color: 'red', margin: '0 0 10px' }}>❌ {error}</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Login as Admin 🚀</button>
        </div>
      </div>
    )
  }

  const tabBtn = (tab, label, emoji) => (
    <button onClick={() => setActiveTab(tab)} style={{ padding: '10px 18px', background: activeTab === tab ? 'linear-gradient(135deg, #1a73e8, #6a1b9a)' : '#f0f0f0', color: activeTab === tab ? 'white' : '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', whiteSpace: 'nowrap' }}>{emoji} {label}</button>
  )

  return (
    <div style={{ padding: '15px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)', borderRadius: '15px', padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
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
        {tabBtn('dashboard', 'Dashboard', '📊')}
      </div>

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <div>
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
              <input placeholder="🖼️ Image URL (optional)" value={newMedicine.imageUrl}
                onChange={(e) => setNewMedicine({ ...newMedicine, imageUrl: e.target.value })}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
              <input type="checkbox" id="prescription" checked={newMedicine.prescriptionRequired}
                onChange={(e) => setNewMedicine({ ...newMedicine, prescriptionRequired: e.target.checked })} />
              <label htmlFor="prescription" style={{ fontSize: '14px', color: '#555' }}> Prescription Required</label>
            </div>
            <button onClick={handleAdd} style={{ padding: '11px 25px', background: 'linear-gradient(135deg, #28a745, #20874f)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '700' }}>➕ Add Medicine</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
            {medicines.map(medicine => (
              <div key={medicine.id} style={{ background: 'white', borderRadius: '12px', padding: '15px', boxShadow: '0 3px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #1a73e8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    {medicine.imageUrl ? (
                      <img src={medicine.imageUrl} alt={medicine.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                    ) : (
                      <div style={{ fontSize: '30px', marginBottom: '5px' }}>💊</div>
                    )}
                    <h4 style={{ margin: '0 0 5px', color: '#333' }}>{medicine.name}</h4>
                    <p style={{ margin: '3px 0', color: '#777', fontSize: '13px' }}> {medicine.category}</p>
                    <p style={{ margin: '3px 0', color: '#28a745', fontWeight: '700' }}>Rs. {medicine.price}</p>
                    <p style={{ margin: '3px 0', color: '#555', fontSize: '13px' }}>Stock: {medicine.stock}</p>
                    {medicine.prescriptionRequired && (
                      <span style={{ fontSize: '11px', color: 'red' }}> Prescription Required</span>
                    )}
                  </div>
                  <button onClick={() => handleDelete(medicine.id)} style={{ padding: '7px 12px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' }}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
            <div style={{ background: 'linear-gradient(135deg, #1a73e8, #0d47a1)', borderRadius: '15px', padding: '20px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '40px' }}>💊</div>
              <div style={{ fontSize: '36px', fontWeight: '800' }}>{medicines.length}</div>
              <div style={{ fontSize: '20px', opacity: 0.9 }}>Total Medicines</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #28a745, #1a6b30)', borderRadius: '15px', padding: '20px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '800' }}>{orders.length}</div>
              <div style={{ fontSize: '20px', opacity: 0.9 }}>Total Orders</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #ffc107, #e65100)', borderRadius: '15px', padding: '20px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '800' }}>Rs. {orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)}</div>
              <div style={{ fontSize: '20px', opacity: 0.9 }}>Total Revenue</div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #dc3545, #7b1a25)', borderRadius: '15px', padding: '20px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: '800' }}>{medicines.filter(m => m.stock < 10).length}</div>
              <div style={{ fontSize: '20px', opacity: 0.9 }}>Low Stock Alert</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#1a73e8', marginBottom: '15px' }}> Medicine Category Distribution</h3>
              <Pie data={{
                labels: [...new Set(medicines.map(m => m.category))],
                datasets: [{ data: [...new Set(medicines.map(m => m.category))].map(cat => medicines.filter(m => m.category === cat).length), backgroundColor: ['#1a73e8', '#28a745', '#ffc107', '#dc3545', '#6a1b9a', '#00bcd4', '#ff5722', '#607d8b', '#e91e63', '#4caf50'], borderWidth: 2 }]
              }} />
            </div>
            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#1a73e8', marginBottom: '15px' }}> Order Status Overview</h3>
              <Doughnut data={{
                labels: ['Pending', 'Processing', 'Out for Delivery', 'Delivered'],
                datasets: [{ data: [orders.filter(o => o.status === 'Pending').length, orders.filter(o => o.status === 'Processing').length, orders.filter(o => o.status === 'Out for Delivery').length, orders.filter(o => o.status === 'Delivered').length], backgroundColor: ['#ffc107', '#1a73e8', '#ff5722', '#28a745'], borderWidth: 2 }]
              }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#1a73e8', marginBottom: '15px' }}>Price Analysis by Category</h3>
              <Bar data={{
                labels: [...new Set(medicines.map(m => m.category))],
                datasets: [{ label: 'Average Price (Rs.)', data: [...new Set(medicines.map(m => m.category))].map(cat => { const catMeds = medicines.filter(m => m.category === cat); return Math.round(catMeds.reduce((sum, m) => sum + m.price, 0) / catMeds.length) }), backgroundColor: '#1a73e8', borderRadius: 8 }]
              }} options={{ plugins: { legend: { display: false } } }} />
            </div>
            <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#1a73e8', marginBottom: '15px' }}> Stock Levels</h3>
              <Bar data={{
                labels: medicines.map(m => m.name),
                datasets: [{ label: 'Stock', data: medicines.map(m => m.stock), backgroundColor: medicines.map(m => m.stock < 10 ? '#dc3545' : m.stock < 30 ? '#ffc107' : '#28a745'), borderRadius: 6 }]
              }} options={{ plugins: { legend: { display: false } }, scales: { x: { ticks: { maxRotation: 45 } } } }} />
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
            <h3 style={{ color: '#1a73e8', marginBottom: '15px' }}>Revenue per Order</h3>
            <Line data={{
              labels: orders.map(o => `Order #${o.id}`),
              datasets: [{ label: 'Revenue (Rs.)', data: orders.map(o => o.totalAmount || 0), borderColor: '#1a73e8', backgroundColor: 'rgba(26,115,232,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#1a73e8' }]
            }} options={{ plugins: { legend: { display: false } } }} />
          </div>

          <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', marginBottom: '20px' }}>
            <h3 style={{ color: '#dc3545', marginBottom: '15px' }}>⚠️ Low Stock Alert (Stock &lt; 10)</h3>
            {medicines.filter(m => m.stock < 10).length === 0 ? (
              <p style={{ color: '#28a745', textAlign: 'center', padding: '20px' }}>✅ All medicines have sufficient stock!</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                {medicines.filter(m => m.stock < 10).map(m => (
                  <div key={m.id} style={{ background: '#fff3f3', borderRadius: '10px', padding: '15px', borderLeft: '4px solid #dc3545' }}>
                    <div style={{ fontWeight: '700', color: '#333' }}>💊 {m.name}</div>
                    <div style={{ color: '#dc3545', fontWeight: '800', fontSize: '18px' }}>Stock: {m.stock}</div>
                    <div style={{ color: '#777', fontSize: '13px' }}>{m.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <h3 style={{ color: '#1a73e8', marginBottom: '15px' }}> Smart Recommendations</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              <div style={{ background: '#f0f7ff', borderRadius: '10px', padding: '15px' }}>
                <div style={{ fontWeight: '700', color: '#1a73e8', marginBottom: '8px' }}> Best Selling Category</div>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>
                  {(() => { const cats = {}; orders.forEach(o => { cats[o.category] = (cats[o.category] || 0) + 1 }); const best = Object.keys(cats).sort((a, b) => cats[b] - cats[a])[0]; return best || (medicines.length > 0 ? medicines[0].category : 'N/A') })()}
                </div>
              </div>
              <div style={{ background: '#f0fff4', borderRadius: '10px', padding: '15px' }}>
                <div style={{ fontWeight: '700', color: '#28a745', marginBottom: '8px' }}> Avg Order Value</div>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>Rs. {orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) / orders.length) : 0}</div>
              </div>
              <div style={{ background: '#fff8f0', borderRadius: '10px', padding: '15px' }}>
                <div style={{ fontWeight: '700', color: '#ff5722', marginBottom: '8px' }}>Reorder Needed</div>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{medicines.filter(m => m.stock < 20).length} medicines</div>
              </div>
              <div style={{ background: '#fdf0ff', borderRadius: '10px', padding: '15px' }}>
                <div style={{ fontWeight: '700', color: '#6a1b9a', marginBottom: '8px' }}> Pending Prescriptions</div>
                <div style={{ fontSize: '20px', fontWeight: '800' }}>{prescriptions.filter(p => p.status === 'PENDING').length}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
          {orders.length === 0 ? (
            <p style={{ color: '#777', textAlign: 'center', padding: '50px', gridColumn: '1/-1' }}>No orders yet!</p>
          ) : orders.map(order => (
            <div key={order.id} style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 3px 15px rgba(0,0,0,0.08)', borderLeft: `4px solid ${order.status === 'Delivered' ? '#28a745' : order.status === 'Processing' ? '#ffc107' : '#dc3545'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', color: '#1a73e8' }}>#{order.id}</span>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: order.status === 'Delivered' ? '#28a745' : order.status === 'Processing' ? '#ffc107' : '#dc3545', color: 'white' }}>{order.status}</span>
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
            <div key={p.id} style={{ background: 'white', borderRadius: '12px', padding: '18px', boxShadow: '0 3px 15px rgba(0,0,0,0.08)', borderLeft: `4px solid ${p.status === 'VERIFIED' ? '#28a745' : p.status === 'REJECTED' ? '#dc3545' : '#ffc107'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', color: '#1a73e8' }}>#{p.id}</span>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: p.status === 'VERIFIED' ? '#28a745' : p.status === 'REJECTED' ? '#dc3545' : '#ffc107', color: 'white' }}>{p.status}</span>
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
                  <button onClick={() => verifyPrescription(p.id)} style={{ flex: 1, padding: '9px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>✅ Verify</button>
                  <button onClick={() => rejectPrescription(p.id)} style={{ flex: 1, padding: '9px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}>❌ Reject</button>
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