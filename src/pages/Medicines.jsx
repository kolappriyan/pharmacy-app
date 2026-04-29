import { useState } from 'react'

const medicineData = [
  { id: 1, name: 'Paracetamol', category: 'Pain Relief', price: 50, prescription: false },
  { id: 2, name: 'Amoxicillin', category: 'Antibiotic', price: 120, prescription: true },
  { id: 3, name: 'Cetirizine', category: 'Allergy', price: 80, prescription: false },
  { id: 4, name: 'Metformin', category: 'Diabetes', price: 150, prescription: true },
  { id: 5, name: 'Omeprazole', category: 'Acidity', price: 90, prescription: false },
  { id: 6, name: 'Ibuprofen', category: 'Pain Relief', price: 60, prescription: false },
]

function Medicines() {
  const [search, setSearch] = useState('')

  const filtered = medicineData.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}>💊 Medicines</h2>

      <input
        type="text"
        placeholder="Search medicines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '12px', marginBottom: '30px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', boxSizing: 'border-box' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filtered.map(medicine => (
          <div key={medicine.id} style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ color: '#333' }}>{medicine.name}</h3>
            <p style={{ color: '#777' }}>{medicine.category}</p>
            <p style={{ color: '#2c7be5', fontWeight: 'bold' }}>Rs. {medicine.price}</p>
            {medicine.prescription && (
              <p style={{ color: 'red', fontSize: '12px' }}>⚠️ Prescription Required</p>
            )}
            <button style={{ marginTop: '10px', padding: '10px 20px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Medicines