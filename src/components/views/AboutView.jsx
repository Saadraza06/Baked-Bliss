import React, { useContext } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { BakeryContext } from '../../context/BakeryContext';

export default function AboutView({ setView }) {
  const { products } = useContext(BakeryContext);
  return (
    <div className="animate-fade-in container" style={{ padding: '3rem 1.5rem' }}>
      {/* Intro section */}
      <section className="text-center" style={{ marginBottom: '4rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600', letterSpacing: '2px' }}>OUR STORY</span>
        <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>Crafting Sweet Memories Since 2026</h1>
        <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          Baked Bliss began in a tiny home kitchen with a single oven, a whisk, and a dream. Today, we are proud to serve our community with the finest handcrafted pastries, breads, and bespoke cakes.
        </p>
      </section>

      {/* Logo & Menu Button - Centered */}
      <section className="text-center" style={{ marginBottom: '6rem' }}>
        <img
          src="/logo.png"
          alt="Website Logo"
          style={{ width: '280px', height: '280px', objectFit: 'contain', margin: '0 auto 2rem', display: 'block' }}
        />
        <button onClick={() => setView('menu')} className="btn btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1.05rem' }}>
          View Our Menu
        </button>
      </section>

      {/* Mission & Vision */}
      <section style={{ backgroundColor: 'var(--color-cream-light)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', marginBottom: '6rem', border: '1px solid rgba(198, 134, 66, 0.05)' }}>
        <div className="grid grid-2" style={{ gap: '3rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--color-pink-light)', color: 'var(--color-chocolate)', marginBottom: '1rem' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Mission</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              To spread joy and celebrate life's moments by baking exceptional, handcrafted treats that combine time-honored techniques with clean, natural ingredients. We strive to create a warm, inclusive space for our community and deliver exceptional taste without compromises.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'inline-flex', padding: '0.75rem', borderRadius: '50%', backgroundColor: 'var(--color-pink-light)', color: 'var(--color-chocolate)', marginBottom: '1rem' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Our Vision</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              To be the leading artisanal bakery in our region, recognized for culinary excellence, creative bespoke cake designs, and sustainable, community-first business practices. We envision a world where everyone has access to honest, freshly baked real bread.
            </p>
          </div>
        </div>
      </section>

      {/* Original Products */}
      <section style={{ marginBottom: '4rem' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>OUR MENU</span>
          <h2 className="decorated" style={{ marginTop: '0.5rem' }}>Our Original Products</h2>
        </div>
        <div className="grid grid-3" style={{ gap: '2rem' }}>
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="card text-center" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '3px solid var(--color-pink)' }}>
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{product.name}</h3>
              <span className="badge badge-pink" style={{ marginBottom: '1rem', alignSelf: 'center' }}>{product.category}</span>
              <p className="text-muted" style={{ fontSize: '0.9rem', flexGrow: 1 }}>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
