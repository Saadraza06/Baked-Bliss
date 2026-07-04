import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { ShoppingBag, ArrowLeft, Banknote } from 'lucide-react';

export default function CheckoutView({ setView, setCheckoutData }) {
  const { cart, activeCoupon, currentUser, deliveryCity, setDeliveryCity } = useContext(BakeryContext);

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  // Address
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? (activeCoupon.discount * subtotal) : 0;
  const deliveryFee = activeCoupon?.freeShipping ? 0 : (subtotal > 2000 ? 0 : (deliveryCity === 'Faisalabad' ? 200 : 300));
  const tax = 0;
  const total = subtotal - discount + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();



    const deliveryAddress = {
      houseNo,
      street,
      city: deliveryCity,
      postalCode
    };

    const customerInfo = {
      name,
      email,
      phone
    };

    // Store checkout data temporarily in parent App state, then go to simulated Payment Gateway!
    setCheckoutData({
      customerInfo,
      deliveryAddress,
      orderNotes,
      paymentMethod
    });

    setView('payment');
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center" style={{ padding: '5rem 0' }}>
        <h2>No items to checkout</h2>
        <button onClick={() => setView('menu')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in container" style={{ padding: '3rem 1.5rem' }}>
      {/* Back to Cart link */}
      <button onClick={() => setView('cart')} className="flex align-center gap-1 text-muted" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
        <ArrowLeft size={16} /> Back to Cart
      </button>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Checkout details</h1>

      <form onSubmit={handleSubmit} className="custom-cake-grid">
        {/* Left Column: Form Details */}
        <div className="card" style={{ padding: '2.5rem' }}>
          {/* Customer Info */}
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--color-chocolate-dark)' }}>1. Customer Information</h3>
          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Phone Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. +92 300 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. sara@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Delivery Address */}
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--color-chocolate-dark)', borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1.5rem' }}>2. Delivery Address</h3>
          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>House / Flat Number</label>
              <input
                type="text"
                required
                placeholder="e.g. House 45-B"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Street Name / Block</label>
              <input
                type="text"
                required
                placeholder="e.g. Street 12, Block K"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
          <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>City</label>
              <select value={deliveryCity} onChange={(e) => setDeliveryCity(e.target.value)} className="form-control">
                <option value="Faisalabad">Faisalabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Postal Code / ZIP</label>
              <input
                type="text"
                required
                placeholder="e.g. 54000"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* Notes & Payments */}
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem', color: 'var(--color-chocolate-dark)', borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1.5rem' }}>3. Order Notes & Payment</h3>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Order Notes (Allergies, Gate Codes, etc.)</label>
            <textarea
              rows="3"
              placeholder="e.g. Please leave package at the door. Please make sure cake does not touch nuts."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="form-control"
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          <div className="form-group">
            <label style={{ fontWeight: '600', marginBottom: '0.75rem', display: 'block' }}>Payment Method</label>
            {/* Cash on Delivery — only payment option */}
            <div style={{
              marginTop: '0.5rem',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-lg)',
              border: '2px solid var(--color-light-brown)',
              backgroundColor: '#FFFBF8',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              boxShadow: '0 4px 12px rgba(198,134,66,0.08)'
            }}>
              <div style={{
                backgroundColor: 'rgba(198,134,66,0.12)',
                color: 'var(--color-light-brown)',
                padding: '0.65rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Banknote size={22} />
              </div>
              <div>
                <p style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--color-chocolate-dark)' }}>Cash on Delivery</p>
              </div>
            </div>

            {/* COD Confirmation Notice */}
            <div style={{
              marginTop: '0.85rem',
              padding: '0.9rem 1.1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(198,134,66,0.07)',
              border: '1px dashed var(--color-light-brown)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}>
              <span style={{ fontSize: '1.1rem' }}>✅</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-chocolate-dark)', fontWeight: '500', lineHeight: '1.5' }}>
                <strong>Cash on Delivery confirmed.</strong> Payment will be collected at your doorstep upon delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Totals */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '0.75rem' }}>
              Order Review
            </h3>

            {/* Compact items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between" style={{ fontSize: '0.85rem' }}>
                  <span className="text-muted" style={{ maxWidth: '70%' }}>
                    {item.product.name} <strong>x{item.quantity}</strong>
                  </span>
                  <span style={{ fontWeight: '500' }}>
                    PKR {(item.product.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
                <span>Subtotal</span>
                <span>PKR {subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between" style={{ color: '#C62828', fontSize: '0.9rem' }}>
                  <span>Discount</span>
                  <span>-PKR {discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee.toFixed(0)}`}</span>
              </div>
              <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
                <span>Tax (GST 5%)</span>
                <span>PKR {tax.toFixed(0)}</span>
              </div>
              <div
                className="flex justify-between"
                style={{ borderTop: '2px solid var(--color-cream-dark)', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-chocolate-dark)' }}
              >
                <span>Grand Total</span>
                <span>PKR {total.toFixed(0)}</span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full flex align-center justify-center gap-2" style={{ padding: '1rem' }}>
              Proceed to Payment <Banknote size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
