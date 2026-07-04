import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';

const INITIAL_REVIEWS = [
  { id: '1', name: 'Sara Ahmed', rating: 5, date: '2026-06-25', text: 'This bakery is exceptional! Their sourdough loaves are a weekly staple in our household. Crunchy crust and great crumb.', tag: 'Artisan Bread' },
  { id: '2', name: 'Zainab Fatima', rating: 5, date: '2026-06-24', text: 'Beautifully custom-designed chocolate cake for my daughter\'s birthday. It tasted very moist and wasn\'t overly sweet. Evelyn did a great job!', tag: 'Custom Cake' },
  { id: '3', name: 'Imran Khan', rating: 4, date: '2026-06-20', text: 'Tasty red velvet cupcakes. The cream cheese frosting is rich and flavorful. Delivery arrived 10 minutes earlier than estimated!', tag: 'Cupcakes' },
  { id: '4', name: 'Ayesha Raza', rating: 5, date: '2026-06-18', text: 'The cookies are to die for! The sea salt flakes on the chocolate chunks are brilliant. I ordered a dozen for a party and they vanished in minutes.', tag: 'Cookies' }
];

export default function ReviewsView() {
  const [reviewsList, setReviewsList] = useState(INITIAL_REVIEWS);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [tag, setTag] = useState('General');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRev = {
      id: String(reviewsList.length + 1),
      name,
      rating,
      date: new Date().toISOString().split('T')[0],
      text,
      tag
    };
    setReviewsList([newRev, ...reviewsList]);
    setName('');
    setText('');
    setTag('General');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', maxWidth: '900px' }}>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>TESTIMONIALS</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>What Our Customers Say</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Real feedback from our lovely neighborhood buyers. We read every single review to continuously improve our recipes and service!
        </p>
      </div>

      {/* Aggregate Score & Form Grid */}
      <div className="grid grid-2" style={{ gap: '2.5rem', marginBottom: '4rem' }}>
        {/* Score card */}
        <div className="card flex flex-col justify-center align-center text-center" style={{ padding: '2.5rem', backgroundColor: 'var(--color-pink-light)' }}>
          <h2 style={{ fontSize: '4.5rem', color: 'var(--color-chocolate)', lineHeight: '1', marginBottom: '0.5rem' }}>4.8</h2>
          <div className="rating-stars" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <span style={{ fontWeight: '600', color: 'var(--color-chocolate-dark)' }}>Average Customer Rating</span>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Based on 1,420 authenticated local orders.</p>
        </div>

        {/* Leave Review Form */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }} className="flex align-center gap-1">
            <MessageSquare size={18} className="text-brown" /> Leave a Review
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
                className="form-control"
              />
            </div>
            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Rating</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="form-control">
                  <option value="5">5 Stars (Excellent)</option>
                  <option value="4">4 Stars (Good)</option>
                  <option value="3">3 Stars (Average)</option>
                  <option value="2">2 Stars (Fair)</option>
                  <option value="1">1 Star (Poor)</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label>Product Category Tag</label>
                <select value={tag} onChange={(e) => setTag(e.target.value)} className="form-control">
                  <option value="General">General / Café</option>
                  <option value="Cakes">Cakes / Custom Cake</option>
                  <option value="Cupcakes">Cupcakes</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Breads">Artisan Breads</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Review details</label>
              <textarea
                rows="3"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your review details..."
                className="form-control"
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Post Review
            </button>
          </form>
        </div>
      </div>

      {/* Feed list */}
      <div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>Recent Testimonials</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reviewsList.map(rev => (
            <div key={rev.id} className="card" style={{ padding: '2rem' }}>
              <div className="flex justify-between align-center wrap gap-2" style={{ marginBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem' }} className="flex align-center gap-1">
                    {rev.name} <span style={{ color: '#2E7D32', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.15rem' }}><CheckCircle size={12} /> Verified Buyer</span>
                  </h4>
                  <span className="badge badge-brown" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginTop: '0.2rem' }}>{rev.tag}</span>
                </div>
                <div className="text-right">
                  <div className="rating-stars" style={{ marginBottom: '0.25rem' }}>
                    {[...Array(rev.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>{rev.date}</span>
                </div>
              </div>
              <p className="text-muted" style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                "{rev.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
