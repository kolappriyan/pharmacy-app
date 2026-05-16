import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const getMedicineImage = (name) => {
  const images = {
    'Paracetamol': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Ibuprofen': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Amoxicillin': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Cetirizine': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Omeprazole': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Metformin': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Atorvastatin': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Amlodipine': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Azithromycin': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Pantoprazole': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Vitamin C': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Vitamin D3': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Aspirin': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Loperamide': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Ranitidine': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Doxycycline': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Loratadine': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Metronidazole': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Calcium': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
    'Multivitamin': 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',
  }
  return images[name] || 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png'
}

function Medicines() {
  const [medicines, setMedicines] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [added, setAdded] = useState({})
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://pharmacy-backend-1-41kr.onrender.com/api/medicines')
      .then(res => res.json())
      .then(data => setMedicines(data))
  }, [])

  const categories = ['All', ...new Set(medicines.map(m => m.category))]

  const filtered = medicines.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All' || m.category === category
    return matchSearch && matchCategory
  })

  const handleAddToCart = (medicine) => {
    addToCart(medicine)
    setAdded({ ...added, [medicine.id]: true })
    setTimeout(() => setAdded(prev => ({ ...prev, [medicine.id]: false })), 1500)
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>💊 Medicines</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search medicines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }}
      />

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '8px 16px', background: category === cat ? '#2c7be5' : '#eee', color: category === cat ? 'white' : 'black', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '14px' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Medicine Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filtered.map(medicine => (
          <div key={medicine.id} style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', textAlign: 'center', background: 'white' }}>
            <img
              src={medicineImages[medicine.category] || 'https://cdn-icons-png.flaticon.com/512/2991/2991231.png'}
              alt={medicine.name}
              style={{ width: '70px', height: '70px', marginBottom: '10px' }}
            />
            <h3 style={{ color: '#333', fontSize: '16px', margin: '5px 0' }}>{medicine.name}</h3>
            <p style={{ color: '#888888', fontSize: '13px' }}>{medicine.category}</p>
            <p style={{ color: '#5ba165', fontWeight: 'bold' }}>Rs. {medicine.price}</p>
            <p style={{ color: '#787878', fontSize: '12px' }}>Stock: {medicine.stock}</p>
            {medicine.prescriptionRequired && (
              <p style={{ color: 'red', fontSize: '11px' }}>⚠️ Prescription Required</p>
            )}
            <button
              onClick={() => handleAddToCart(medicine)}
              style={{ marginTop: '10px', padding: '8px 16px', background: added[medicine.id] ? '#28a745' : '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', transition: 'background 0.3s' }}>
              {added[medicine.id] ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Medicines