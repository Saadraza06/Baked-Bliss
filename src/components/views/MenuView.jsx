import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Star, Heart, ShoppingBag, Eye, Check, AlertCircle } from 'lucide-react';

export default function MenuView({ setView, setSelectedProductId }) {
  const { products, addToCart, toggleFavoriteProduct, currentUser } = useContext(BakeryContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});

  const categories = ['All', 'Cakes', 'Cupcakes', 'Cookies', 'Breads'];

  // Handle quantity changes per product locally
  const handleQtyChange = (prodId, change) => {
    const current = quantities[prodId] || 1;
    const next = Math.max(1, current + change);
    setQuantities({ ...quantities, [prodId]: next });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.flavour.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBuyNow = (product) => {
    const qty = quantities[product.id] || 1;
    addToCart(product, qty);
    setView('checkout');
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '3rem 1.5rem' }}>
      {/* Header Info */}
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>BAKERY MENU</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Browse Our Sweet Delights</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Explore our wide range of gourmet products. You can customize details, order fresh bakes, and get them delivered hot to your doorstep.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex justify-between align-center wrap gap-3" style={{ marginBottom: '3rem', borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1.5rem' }}>
        {/* Category Pill Buttons */}
        <div className="category-filter" style={{ marginBottom: '0' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ minWidth: '260px', flex: '1', maxWidth: '350px' }}>
          <input
            type="text"
            placeholder="Search cakes, cookies, flavor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{ borderRadius: 'var(--radius-full)' }}
          />
        </div>
      </div>

      {/* Menu Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center" style={{ padding: '4rem 0' }}>
          <h3>No items found matching your filters.</h3>
          <p className="text-muted">Try choosing another category or clearing your search query.</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {filteredProducts.map(product => {
            const qty = quantities[product.id] || 1;
            const isFavorite = currentUser?.favoriteProducts?.includes(product.id);

            return (
              <div key={product.id} className="card flex flex-col justify-between" style={{ position: 'relative' }}>
                <div>
                  {/* Image with overlay badge and favorite button */}
                  <div className="product-image-container">
                    <button
                      onClick={() => toggleFavoriteProduct(product.id)}
                      className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
                      title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    >
                      <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ cursor: 'pointer' }}
                      onError={(e) => {
                        e.target.onerror = null; // prevents infinite loop if fallback also fails
                        e.target.src = '/chocolate_cake.jpg';
                      }}
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setView('product-details');
                      }}
                    />
                    {/* View Details Button overlay */}
                    <button
                      onClick={() => {
                        setSelectedProductId(product.id);
                        setView('product-details');
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(43, 30, 22, 0.75)',
                        color: 'var(--color-white)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: '500',
                        opacity: '0.9'
                      }}
                    >
                      <Eye size={12} /> View Details
                    </button>
                  </div>

                  {/* Header info */}
                  <div className="flex justify-between align-center" style={{ marginBottom: '0.25rem' }}>
                    <span className="badge badge-pink" style={{ fontSize: '0.75rem' }}>{product.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      {product.availability ? (
                        <span className="flex align-center gap-1" style={{ color: '#2E7D32', fontWeight: '500' }}>
                          <Check size={12} /> In Stock
                        </span>
                      ) : (
                        <span className="flex align-center gap-1" style={{ color: '#C62828', fontWeight: '500' }}>
                          <AlertCircle size={12} /> Sold Out
                        </span>
                      )}
                    </span>
                  </div>

                  <h3
                    style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setView('product-details');
                    }}
                  >
                    {product.name}
                  </h3>

                  <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem', height: '2.5rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {product.description}
                  </p>

                  <div className="flex gap-2 text-muted" style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                    <span>⚖️ <strong>Weight:</strong> {product.weight}</span>
                    <span>🍰 <strong>Flavour:</strong> {product.flavour}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--color-cream-dark)', padding: '1rem 0 0.75rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-chocolate)' }}>
                      PKR {product.price.toFixed(0)}
                    </span>
                    {/* Qty Selector */}
                    {product.availability && (
                      <div className="qty-control">
                        <button onClick={() => handleQtyChange(product.id, -1)} className="qty-btn">-</button>
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600' }}>{qty}</span>
                        <button onClick={() => handleQtyChange(product.id, 1)} className="qty-btn">+</button>
                      </div>
                    )}
                  </div>

                  {product.availability ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product, qty)}
                        className="btn btn-secondary btn-sm"
                        style={{ flex: '1', display: 'flex', justifyContent: 'center' }}
                      >
                        Add to Cart <ShoppingBag size={14} />
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="btn btn-primary btn-sm"
                        style={{ flex: '1' }}
                      >
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-outline btn-full btn-sm" disabled style={{ opacity: '0.6', cursor: 'not-allowed' }}>
                      Currently Unavailable
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
