import React from 'react';
import { Truck, ShieldCheck, BadgePercent } from 'lucide-react';

export default function DeliveryView({ setView }) {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>SHIPPING LOGISTICS</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Delivery Information</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          We deliver fresh pastries, hot artisan breads, and customized celebration cakes directly to your doorstep. Here is everything you need to know.
        </p>
      </div>

      {/* Grid boxes */}
      <div className="grid grid-2" style={{ gap: '2.5rem', marginBottom: '4.5rem' }}>
        {/* Box 1: Policies */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }} className="flex align-center gap-2">
            <Truck className="text-pink" /> Shipping Policies & Rates
          </h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none' }} className="text-muted">
            <li className="flex align-center gap-3">
              <div style={{ backgroundColor: 'var(--color-pink-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-chocolate)' }}>
                <BadgePercent size={20} />
              </div>
              <div>
                <strong>Standard Delivery Charges:</strong>
                <p style={{ fontSize: '0.85rem' }}>PKR 200 for Faisalabad and PKR 300 for other locations (on orders under PKR 2,000).</p>
              </div>
            </li>
            <li className="flex align-center gap-3">
              <div style={{ backgroundColor: 'var(--color-pink-light)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-chocolate)' }}>
                <Truck size={20} />
              </div>
              <div>
                <strong>Express Delivery Across Faisalabad:</strong>
                <p style={{ fontSize: '0.85rem' }}>We provide super-fast and secure delivery all over Faisalabad! From our ovens straight to your doorstep, we guarantee that your cakes arrive beautifully set and your breads remain warm, fresh, and delicious.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Box 2: Order Care & Cancellation Policies */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }} className="flex align-center gap-2">
            <ShieldCheck className="text-brown" /> Order Care & Cancellations
          </h2>
          <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            We want your ordering experience to be as smooth and satisfying as our bakes. Please review our safety delivery and cancellation policies:
          </p>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', listStyle: 'none' }} className="text-muted">
            <li className="flex gap-3">
              <span style={{ fontSize: '1.25rem' }}>📦</span>
              <div>
                <strong style={{ color: 'var(--color-chocolate-dark)' }}>Safe & Perfect Delivery Guarantee</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.15rem' }}>Every cake, bread, and pastry is handled with extreme care. We package all orders securely and use customized shock-absorbing trays to guarantee they arrive safely, perfectly, and in absolute pristine condition.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span style={{ fontSize: '1.25rem' }}>⏰</span>
              <div>
                <strong style={{ color: 'var(--color-chocolate-dark)' }}>1-Hour Cancellation Window</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.15rem' }}>Orders can be cancelled or modified within 1 hour after confirmation. Since all our treats are freshly baked to order, we are unable to accept cancellations or make changes after this 1-hour window.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick CTA */}
      <div className="card text-center" style={{ backgroundColor: 'var(--color-pink-light)', border: '1px solid var(--color-pink-dark)', padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-chocolate-dark)' }}>Ready to Order Warm Bakes?</h3>
        <p className="text-muted" style={{ marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Select from our menu or schedule a custom design cake. We ensure our delivery boxes are thermally insulated so your bread arrives warm and your cakes arrive perfectly set!
        </p>
        <button onClick={() => setView('menu')} className="btn btn-primary">
          Order Online Now
        </button>
      </div>
    </div>
  );
}
