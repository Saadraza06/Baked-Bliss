import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';

export default function GalleryView() {
  const { products } = useContext(BakeryContext);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const galleryImages = products.map(p => ({
    id: p.id,
    src: p.images[0],
    title: p.name,
    category: p.category
  }));

  const productCategories = [...new Set(galleryImages.map(img => img.category))];
  const categories = ['All', ...productCategories];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>VISUAL DELIGHTS</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Bakery Gallery</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Take a look inside our kitchen and see our master bakers in action, our warm rustic seating spaces, and our finished gourmet sweets.
        </p>
      </div>

      {/* Filter Pill Buttons */}
      <div className="category-filter" style={{ marginBottom: '3rem' }}>
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

      {/* Masonry-style Grid */}
      <div className="grid grid-3" style={{ gap: '1.5rem' }}>
        {filteredImages.map(img => (
          <div
            key={img.id}
            className="card"
            style={{
              padding: '0',
              overflow: 'hidden',
              borderRadius: 'var(--radius-lg)',
              height: '300px',
              position: 'relative',
              cursor: 'pointer'
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-slow)' }}
              className="gallery-image"
            />
            {/* Overlay Title on Hover */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(transparent, rgba(43, 30, 22, 0.95))',
                padding: '1.5rem 1rem 1rem',
                color: 'var(--color-white)',
                opacity: '1',
                transition: 'var(--transition-fast)'
              }}
            >
              <span className="badge badge-pink" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', marginBottom: '0.35rem' }}>
                {img.category}
              </span>
              <h4 style={{ color: 'var(--color-white)', fontSize: '0.95rem', fontWeight: '500' }}>{img.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
