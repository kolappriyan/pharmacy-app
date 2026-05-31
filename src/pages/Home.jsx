import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  // Medicine count animation
  useEffect(() => {
    let start = 0
    const end = 500
    const timer = setInterval(() => {
      start += 10
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, 20)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7ff 0%, #e8f4fd 50%, #fce4ec 100%)' }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 50%, #6a1b9a 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        clipPath: 'ellipse(100% 85% at 50% 15%)',
        paddingBottom: '120px'
      }}>
        <div style={{ fontSize: '70px', marginBottom: '10px', animation: 'bounce 2s infinite' }}>💊</div>
        <h1 style={{
          color: 'white',
          fontSize: 'clamp(28px, 6vw, 56px)',
          fontWeight: '900',
          margin: '0 0 15px',
          textShadow: '2px 4px 10px rgba(0,0,0,0.3)',
          letterSpacing: '1px'
        }}>
          Welcome to PharmaCare
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: 'clamp(14px, 3vw, 20px)',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.8'
        }}>
          Your trusted online pharmacy — order medicines, track deliveries, and stay healthy from the comfort of your home! 
        </p>
        <Link to="/medicines" style={{
          display: 'inline-block',
          padding: '16px 45px',
          background: 'linear-gradient(135deg, #ff9800, #f57c00)',
          color: 'white',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: 'clamp(16px, 3vw, 22px)',
          fontWeight: '800',
          boxShadow: '0 8px 25px rgba(255,152,0,0.5)',
          transition: 'transform 0.3s',
          letterSpacing: '0.5px'
        }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        >
          🔍 Browse Medicines
        </Link>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        padding: '40px 20px',
        marginTop: '-30px'
      }}>
        {[
          { emoji: '💊', label: 'Medicines', value: count + '+' },
          { emoji: '🚚', label: 'Fast Delivery', value: '24hrs' },
          { emoji: '👨‍⚕️', label: 'Trusted', value: '100%' },
          { emoji: '⭐', label: 'Rating', value: '4.9★' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '25px 30px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            minWidth: '130px',
            flex: '1 1 130px',
            maxWidth: '180px',
            transform: 'translateY(0)',
            transition: 'transform 0.3s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '36px' }}>{stat.emoji}</div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#1a73e8' }}>{stat.value}</div>
            <div style={{ fontSize: '13px', color: '#777', fontWeight: '600' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div style={{ padding: '20px 20px 50px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#333', fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '800', marginBottom: '30px' }}>
          Why Choose PharmaCare? 
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { emoji: '🔒', title: 'Secure Payments', desc: 'Your payment info is 100% safe with us', color: '#e3f2fd', border: '#1a73e8' },
            { emoji: '📋', title: 'Prescription Upload', desc: 'Easy prescription upload for medicines', color: '#f3e5f5', border: '#9c27b0' },
            { emoji: '📦', title: 'Order Tracking', desc: 'Track your order in real-time', color: '#e8f5e9', border: '#4caf50' },
            { emoji: '💬', title: '24/7 Support', desc: 'We\'re always here to help you', color: '#fff3e0', border: '#ff9800' },
            { emoji: '🎯', title: 'Wide Selection', desc: '500+ medicines from trusted brands', color: '#fce4ec', border: '#e91e63' },
            { emoji: '⚡', title: 'Fast Delivery', desc: 'Get medicines delivered in 24 hours', color: '#e0f7fa', border: '#00bcd4' },
          ].map((feature, i) => (
            <div key={i} style={{
              background: feature.color,
              border: `2px solid ${feature.border}`,
              borderRadius: '16px',
              padding: '25px',
              textAlign: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{feature.emoji}</div>
              <h3 style={{ color: feature.border, margin: '0 0 8px', fontSize: '18px', fontWeight: '800' }}>{feature.title}</h3>
              <p style={{ color: '#555', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews Section */}
      {(() => {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
        if (reviews.length === 0) return null
        return (
          <div style={{ padding: '50px 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', color: '#333', fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: '800', marginBottom: '30px' }}>
               ⭐ Customer Reviews
            </h2>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {reviews.slice(-6).reverse().map(review => (
              <div key={review.id} style={{
                 background: 'white', borderRadius: '16px', padding: '20px',
                 boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                 borderTop: '4px solid #ff9800'
             }}>
             <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                 {[1,2,3,4,5].map(s => (
                   <span key={s} style={{ fontSize: '20px', filter: s <= review.rating ? 'none' : 'grayscale(1)' }}>⭐</span>
                ))}
             </div>
             <p style={{ color: '#333', margin: '0 0 10px', fontSize: '15px', lineHeight: '1.6' }}>"{review.comment}"</p>
             <p style={{ color: '#999', margin: 0, fontSize: '12px' }}>📅 {review.date}</p>
            </div>
         ))}
          </div>
       </div>
      )
    })()}

      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #ff9800, #e91e63, #9c27b0)',
        padding: '50px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: 'white', fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: '900', margin: '0 0 15px' }}>
          🏥 Your Health, Our Priority!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(14px, 2.5vw, 18px)', margin: '0 0 30px' }}>
          Order medicines now and get delivered to your doorstep!
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/medicines" style={{
            padding: '14px 35px', background: 'white', color: '#e91e63',
            borderRadius: '50px', textDecoration: 'none', fontWeight: '800',
            fontSize: 'clamp(14px, 2.5vw, 18px)', boxShadow: '0 5px 20px rgba(0,0,0,0.2)'
          }}>
            💊 Shop Now
          </Link>
          <Link to="/register" style={{
            padding: '14px 35px', background: 'transparent', color: 'white',
            borderRadius: '50px', textDecoration: 'none', fontWeight: '800',
            fontSize: 'clamp(14px, 2.5vw, 18px)', border: '2px solid white'
          }}>
            📝 Register Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1a1a2e', padding: '25px', textAlign: 'center' }}>
        <p style={{ color: '#aaa', margin: 0, fontSize: '14px' }}>
          © 2026 PharmaCare  | Made with ❤️ for your health
        </p>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  )
}

export default Home