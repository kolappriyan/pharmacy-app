import { useState, useEffect } from 'react'

function OrderTracking() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inputId, setInputId] = useState('')
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  useEffect(() => {
    const savedId = localStorage.getItem('lastOrderId')
    if (savedId) {
      fetchOrder(savedId)
      // Check if already reviewed
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
      const alreadyReviewed = reviews.some(r => r.orderId == savedId)
      if (alreadyReviewed) setReviewSubmitted(true)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchOrder = (id) => {
    setLoading(true)
    fetch(`https://pharmacy-backend-1-41kr.onrender.com/api/orders/${id}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data)
        setLoading(false)
        // Check if already reviewed
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
        const alreadyReviewed = reviews.some(r => r.orderId == id)
        if (alreadyReviewed) setReviewSubmitted(true)
      })
      .catch(() => {
        setOrder(null)
        setLoading(false)
      })
  }

  const handleSearch = () => {
    if (!inputId) return
    setReviewSubmitted(false)
    setShowReview(false)
    setRating(0)
    setComment('')
    fetchOrder(inputId)
  }

  const handleSubmitReview = () => {
    if (!rating) {
      alert('Please select a star rating!')
      return
    }
    if (!comment.trim()) {
      alert('Please write a review comment!')
      return
    }

    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
    const newReview = {
      id: Date.now(),
      orderId: order.id,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    }
    reviews.push(newReview)
    localStorage.setItem('reviews', JSON.stringify(reviews))
    setReviewSubmitted(true)
    setShowReview(false)
  }

  const getSteps = (status) => [
    { label: 'Order Placed', icon: '📋', done: true },
    { label: 'Order Confirmed', icon: '✅', done: ['Processing', 'Out for Delivery', 'Delivered'].includes(status) },
    { label: 'Packed', icon: '📦', done: ['Out for Delivery', 'Delivered'].includes(status) },
    { label: 'Out for Delivery', icon: '🚚', done: ['Out for Delivery', 'Delivered'].includes(status) },
    { label: 'Delivered', icon: '🏠', done: status === 'Delivered' },
  ]

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px' }}>
      <h2 style={{ color: '#2c7be5' }}> Order Tracking</h2>

      {/* Search */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter Order ID (e.g. 1)"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button onClick={handleSearch}
          style={{ padding: '10px 20px', background: '#2c7be5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Track
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center', color: '#777' }}>⏳ Loading...</p>}

      {!loading && !order && (
        <p style={{ textAlign: 'center', color: '#777' }}>Order not found. Please enter a valid Order ID.</p>
      )}

      {!loading && order && (
        <>
          {/* Order Details */}
          <div style={{ padding: '20px', borderRadius: '12px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginBottom: '30px', background: 'white' }}>
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.customerPhone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> Rs. {order.totalAmount}</p>
            <p><strong>Status:</strong> <span style={{ color: order.status === 'Delivered' ? '#28a745' : '#2c7be5', fontWeight: 'bold' }}>{order.status}</span></p>
          </div>

          {/* Steps */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 0 15px rgba(0,0,0,0.1)', marginBottom: '25px' }}>
            {getSteps(order.status).map((step, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: index < 4 ? '20px' : '0' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: step.done ? 'linear-gradient(135deg, #28a745, #20874f)' : '#eee',
                  color: step.done ? 'white' : '#aaa',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', flexShrink: 0, fontSize: '18px',
                  boxShadow: step.done ? '0 4px 12px rgba(40,167,69,0.4)' : 'none'
                }}>
                  {step.done ? step.icon : index + 1}
                </div>
                <div style={{ marginLeft: '15px' }}>
                  <div style={{ fontSize: '16px', fontWeight: step.done ? '700' : '400', color: step.done ? '#333' : '#aaa' }}>
                    {step.label}
                  </div>
                  {step.done && <div style={{ fontSize: '12px', color: '#28a745' }}>Completed</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Review Section - Only if Delivered */}
          {order.status === 'Delivered' && (
            <div>
              {reviewSubmitted ? (
                <div style={{
                  background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                  border: '2px solid #28a745',
                  borderRadius: '12px', padding: '20px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '40px' }}>🎉</div>
                  <h3 style={{ color: '#28a745', margin: '10px 0 5px' }}>Thank you for your review!</h3>
                  <p style={{ color: '#555', margin: 0 }}>Your feedback helps us improve!</p>
                </div>
              ) : (
                <div>
                  {!showReview ? (
                    <button onClick={() => setShowReview(true)} style={{
                      width: '100%', padding: '14px',
                      background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                      color: 'white', border: 'none', borderRadius: '12px',
                      cursor: 'pointer', fontSize: '17px', fontWeight: '800',
                      boxShadow: '0 5px 20px rgba(255,152,0,0.4)'
                    }}>
                      ⭐ Write a Review
                    </button>
                  ) : (
                    <div style={{
                      background: 'white', borderRadius: '12px', padding: '25px',
                      boxShadow: '0 5px 25px rgba(0,0,0,0.12)'
                    }}>
                      <h3 style={{ color: '#333', margin: '0 0 20px', textAlign: 'center' }}>⭐ Rate Your Experience</h3>

                      {/* Star Rating */}
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            style={{
                              fontSize: '40px', cursor: 'pointer',
                              transition: 'transform 0.2s',
                              transform: (hoverRating || rating) >= star ? 'scale(1.2)' : 'scale(1)',
                              filter: (hoverRating || rating) >= star ? 'none' : 'grayscale(1)'
                            }}
                          >⭐</span>
                        ))}
                      </div>

                      {/* Rating Label */}
                      {(hoverRating || rating) > 0 && (
                        <p style={{ textAlign: 'center', color: '#ff9800', fontWeight: '700', margin: '0 0 15px', fontSize: '16px' }}>
                          {['', '😞 Poor', '😐 Fair', '😊 Good', '😃 Very Good', '🤩 Excellent!'][hoverRating || rating]}
                        </p>
                      )}

                      {/* Comment */}
                      <textarea
                        placeholder="Write your review here... (e.g. Great service, fast delivery!)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                          width: '100%', padding: '12px', borderRadius: '8px',
                          border: '2px solid #e0e0e0', fontSize: '15px',
                          height: '100px', resize: 'none', boxSizing: 'border-box',
                          outline: 'none', fontFamily: 'inherit'
                        }}
                      />

                      {/* Buttons */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button onClick={() => setShowReview(false)} style={{
                          flex: 1, padding: '12px', background: '#f0f0f0',
                          color: '#555', border: 'none', borderRadius: '8px',
                          cursor: 'pointer', fontWeight: '700', fontSize: '15px'
                        }}>Cancel</button>
                        <button onClick={handleSubmitReview} style={{
                          flex: 2, padding: '12px',
                          background: 'linear-gradient(135deg, #1a73e8, #6a1b9a)',
                          color: 'white', border: 'none', borderRadius: '8px',
                          cursor: 'pointer', fontWeight: '700', fontSize: '15px'
                        }}>Submit Review ⭐</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OrderTracking