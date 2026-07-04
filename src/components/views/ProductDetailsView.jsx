import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Star, ShieldAlert, Check, ChevronLeft, ShoppingBag } from 'lucide-react';

export default function ProductDetailsView({ setView, productId, setSelectedProductId }) {
  const { products, addToCart, addProductReview, currentUser } = useContext(BakeryContext);
  const product = products.find(p => p.id === productId);

  const [activeImage, setActiveImage] = useState(product ? product.images[0] : '');
  const [quantity, setQuantity] = useState(1);
  
  // Review form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  if (!product) {
    return (
      <div className="container text-center" style={{ padding: '5rem 0' }}>
        <h2>Product Not Found</h2>
        <button onClick={() => setView('menu')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleQtyChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setView('checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addProductReview(product.id, rating, comment, reviewerName);
    // Reset fields
    setComment('');
    setReviewerName('');
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '3rem 1.5rem' }}>
      {/* Back button */}
      <button onClick={() => setView('menu')} className="flex align-center gap-1 text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
        <ChevronLeft size={18} /> Back to Menu
      </button>

      {/* Main Grid: Gallery & Info */}
      <div className="grid grid-2" style={{ gap: '3rem', marginBottom: '5rem' }}>
        {/* Left Column: Image Gallery */}
        <div>
          <div style={{ height: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1rem', border: '1px solid var(--color-cream-dark)' }}>
            <img 
              src={activeImage} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/chocolate_cake.jpg';
              }}
            />
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: activeImage === img ? '3.5px solid var(--color-light-brown)' : '1px solid var(--color-cream-dark)'
                  }}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information */}
        <div>
          <span className="badge badge-pink" style={{ marginBottom: '0.5rem' }}>{product.category}</span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>

          {/* Stars & Reviews */}
          <div className="flex align-center gap-2" style={{ marginBottom: '1.5rem' }}>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(product.reviews?.reduce((acc, curr) => acc + curr.rating, 0) / (product.reviews?.length || 1) || 5) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-muted" style={{ fontSize: '0.85rem' }}>({product.reviews?.length || 0} reviews)</span>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-chocolate)', marginBottom: '1.5rem' }}>
            PKR {product.price.toFixed(0)}
          </div>

          <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>
            {product.description}
          </p>

          <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', backgroundColor: 'var(--color-cream-light)' }}>
            <div className="grid grid-2" style={{ gap: '1rem', fontSize: '0.9rem' }}>
              <div>⚖️ <strong>Weight:</strong> {product.weight}</div>
              <div>🍰 <strong>Standard Flavour:</strong> {product.flavour}</div>
              <div className="flex align-center gap-1">
                📅 <strong>Availability:</strong>
                {product.availability ? (
                  <span style={{ color: '#2E7D32', fontWeight: '600' }}>In Stock</span>
                ) : (
                  <span style={{ color: '#C62828', fontWeight: '600' }}>Sold Out</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          {product.availability ? (
            <div className="flex gap-3 align-center wrap" style={{ marginBottom: '2.5rem' }}>
              <div className="qty-control" style={{ padding: '0.4rem 1rem', border: '1.5px solid var(--color-cream-dark)', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-white)' }}>
                <button onClick={() => handleQtyChange(-1)} className="qty-btn" style={{ width: '28px', height: '28px' }}>-</button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '600', fontSize: '1.1rem' }}>{quantity}</span>
                <button onClick={() => handleQtyChange(1)} className="qty-btn" style={{ width: '28px', height: '28px' }}>+</button>
              </div>

              <button onClick={() => addToCart(product, quantity)} className="btn btn-secondary" style={{ flex: '1', minWidth: '150px' }}>
                Add to Cart <ShoppingBag size={18} />
              </button>
              <button onClick={handleBuyNow} className="btn btn-primary" style={{ flex: '1', minWidth: '150px' }}>
                Buy Now
              </button>
            </div>
          ) : (
            <div className="card text-center" style={{ border: '2px dashed var(--color-light-brown)', padding: '1.5rem', marginBottom: '2.5rem' }}>
              <p style={{ color: 'var(--color-chocolate)', fontWeight: '600' }}>We apologize! This product is currently sold out. Check back tomorrow!</p>
            </div>
          )}

          {/* Ingredients & Allergens */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🌿 Ingredients</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{product.ingredients}</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }} className="flex align-center gap-1">
                <ShieldAlert size={18} className="text-pink" /> Allergen Warnings
              </h3>
              <div style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: '#FFF0F5', border: '1px solid #FFD8E6', color: 'var(--color-chocolate-dark)', fontSize: '0.85rem' }}>
                <strong>Contains:</strong> {product.allergens}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '4rem', marginBottom: '5rem' }}>
        <div className="grid grid-2" style={{ gap: '4rem' }}>
          {/* Reviews list */}
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Customer Reviews ({product.reviews?.length || 0})</h2>
            {(!product.reviews || product.reviews.length === 0) ? (
              <p className="text-muted">No reviews yet for this product. Be the first to leave one!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {product.reviews.map(rev => (
                  <div key={rev.id} style={{ borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1.5rem' }}>
                    <div className="flex justify-between align-center" style={{ marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '1rem' }}>{rev.user}</h4>
                      <span className="text-muted" style={{ fontSize: '0.75rem' }}>{rev.date}</span>
                    </div>
                    <div className="rating-stars" style={{ marginBottom: '0.5rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < rev.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add a review form */}
          <div>
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Enter your name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="rating-stars interactive" style={{ fontSize: '1.8rem', gap: '0.4rem' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{ color: star <= rating ? '#FFD700' : '#E0E0E0' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Review details</label>
                  <textarea
                    rows="4"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us what you liked or disliked about this product..."
                    className="form-control"
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '2.5rem' }} className="text-center">Related Products</h2>
          <div className="grid grid-3">
            {relatedProducts.map(prod => (
              <div key={prod.id} className="card flex flex-col justify-between" style={{ padding: '1rem' }}>
                <div>
                  <div className="product-image-container">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      style={{ cursor: 'pointer' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/chocolate_cake.jpg';
                      }}
                      onClick={() => {
                        setSelectedProductId(prod.id);
                        setActiveImage(prod.images[0]);
                        setQuantity(1);
                      }}
                    />
                  </div>
                  <span className="badge badge-pink" style={{ fontSize: '0.75rem' }}>{prod.category}</span>
                  <h4
                    style={{ fontSize: '1.05rem', margin: '0.25rem 0 0.5rem', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      setActiveImage(prod.images[0]);
                      setQuantity(1);
                    }}
                  >
                    {prod.name}
                  </h4>
                </div>
                <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--color-chocolate)' }}>PKR {prod.price.toFixed(0)}</span>
                  <button
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      setActiveImage(prod.images[0]);
                      setQuantity(1);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
