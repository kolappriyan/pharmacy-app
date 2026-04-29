import { useState } from 'react'

const initialMedicines = [
  { id: 1, name: 'Paracetamol', category: 'Pain Relief', price: 50, stock: 100 },
  { id: 2, name: 'Amoxicillin', category: 'Antibiotic', price: 120, stock: 50 },
  { id: 3, name: 'Cetirizine', category: 'Allergy', price: 80, stock: 75 },
  { id: 4, name: 'Metformin', category: 'Diabetes', price: 150, stock: 30 },
]

function AdminPanel() {
  const [medicines, setMedicines] = useState(initialMedicines)
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', price: '', stock: '' })
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAdmin(true)
      setError('')
    } else {
      setError('❌ Wrong password!')
    }
  }

  const handleAdd = () => {
    if (!newMedicine.name || !newMedicine.category || !newMedicine.price || !newMedicine.stock) {
      alert('Please fill all fields!')
      return
    }
    setMedicines([...medicines, { id: medicines.length + 1, ...newMedicine }])
    setNewMedicine({ name: '', category: '', price: '', stock: '' })
  }

  const handleDelete = (id) => {
    setMedicines(medicines.filter(m => m.id !== id))
  }

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '40px', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '10px', textAlign: 'center' }}>
        <h2 style={{ color: '#2c7be5' }}>👨‍💼 Admin Access</h2>
        <p style={{ color: '#777' }}>Enter admin password to continue</p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '15px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{ width: '100%', padding: '12px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', marginTop: '10px' }}>
          Login as Admin
        </button>
      </div>
    )
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>👨‍💼 Admin Panel</h2>

      {/* Add Medicine Form */}
      <div style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h3>Add New Medicine</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '15px' }}>
          <input placeholder="Medicine Name" value={newMedicine.name} onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input placeholder="Category" value={newMedicine.category} onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input placeholder="Price" type="number" value={newMedicine.price} onChange={(e) => setNewMedicine({ ...newMedicine, price: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input placeholder="Stock" type="number" value={newMedicine.stock} onChange={(e) => setNewMedicine({ ...newMedicine, stock: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <button onClick={handleAdd} style={{ padding: '10px 25px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          + Add Medicine
        </button>
      </div>

      {/* Medicine Table */}
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
                <button onClick={() => handleDelete(medicine.id)} style={{ padding: '8px 15px', background: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPanel