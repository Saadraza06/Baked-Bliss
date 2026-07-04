import React, { useContext, useState } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Trash2, ArrowLeft, ArrowRight, Tag, ShoppingBag } from 'lucide-react';

export default function CartView({ setView }) {
  const { cart, updateCartQuantity, removeFromCart, activeCoupon, applyCoupon, deliveryCity, setDeliveryCity } = useContext(BakeryContext);
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? (activeCoupon.discount * subtotal) : 0;
  const deliveryFee = activeCoupon?.freeShipping ? 0 : (subtotal > 2000 ? 0 : (deliveryCity === 'Faisalabad' ? 200 : 300));
  const tax = 0;
  const total = subtotal - discount + deliveryFee;

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    applyCoupon(promoCode);
    setPromoCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center animate-fade-in" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', backgroundColor: 'var(--color-pink-light)', color: 'var(--color-chocolate)', marginBottom: '1.5rem' }}>
          <ShoppingBag size={48} />
        </div>
        <h2>Your Shopping Cart is Empty</h2>
        <p className="text-muted" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
          Looks like you haven't added any baked bliss items yet. Let's browse our gourmet menu!
        </p>
        <button onClick={() => setView('menu')} className="btn btn-primary">
          Explore Our Menu
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Your Shopping Cart</h1>

      <div className="grid custom-cake-grid">
        {/* Left Column: Product List */}
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1rem', marginBottom: '1.5rem' }} className="flex justify-between align-center">
            <h3 style={{ fontSize: '1.25rem' }}>Items in your Cart</h3>
            <button onClick={() => setView('menu')} className="flex align-center gap-1 text-muted" style={{ fontSize: '0.85rem' }}>
              <ArrowLeft size={14} /> Continue Shopping
            </button>
          </div>

          <div>
            {cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.flavour}-${item.weight}-${index}`}
                className="cart-item-row"
                style={{ alignItems: 'center' }}
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/chocolate_cake.jpg';
                  }}
                />
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.product.name}</h4>
                  <div className="cart-item-meta flex gap-2" style={{ margin: '0.2rem 0 0.4rem' }}>
                    <span>🍰 {item.flavour}</span>
                    <span>⚖️ {item.weight}</span>
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--color-chocolate)' }}>
                    PKR {item.product.price.toFixed(0)} each
                  </span>
                </div>
                {/* Quantity adjuster */}
                <div className="qty-control" style={{ marginRight: '1rem' }}>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.flavour, item.weight)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span style={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.flavour, item.weight)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                {/* Item Total */}
                <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: '700' }}>
                  PKR {(item.product.price * item.quantity).toFixed(0)}
                </div>
                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.product.id, item.flavour, item.weight)}
                  style={{ color: 'var(--color-pink-dark)', padding: '0.5rem' }}
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Promo code form */}
          <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }} className="flex align-center gap-1">
              <Tag size={16} /> Apply Promo Code
            </h4>
            <form onSubmit={handleCouponSubmit} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="e.g. BAKE10, WELCOME15"
                className="form-control"
                style={{ maxWidth: '200px', textTransform: 'uppercase' }}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Apply Code
              </button>
            </form>
            {activeCoupon && (
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2E7D32', fontSize: '0.85rem' }}>
                <span>✓ Active Code: <strong>{activeCoupon.code}</strong> ({activeCoupon.discount * 100}% discount applied)</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Totals Summary */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '0.75rem' }}>
              Order Totals
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>PKR {subtotal.toFixed(0)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between" style={{ color: '#C62828' }}>
                  <span>Discount ({activeCoupon?.code})</span>
                  <span>-PKR {discount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between align-center" style={{ fontSize: '0.95rem' }}>
                <span className="text-muted">Delivery City</span>
                <select 
                  value={deliveryCity} 
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.85rem',
                    borderRadius: '4px',
                    border: '1px solid var(--color-cream-dark)',
                    backgroundColor: 'var(--color-cream-light)',
                    color: 'var(--color-chocolate-dark)',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Faisalabad">Faisalabad (PKR 200)</option>
                  <option value="Karachi">Karachi (PKR 300)</option>
                  <option value="Islamabad">Islamabad (PKR 300)</option>
                  <option value="Rawalpindi">Rawalpindi (PKR 300)</option>
                </select>
              </div>
              <div className="flex justify-between text-muted">
                <span>Delivery Charges</span>
                <span>{deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee.toFixed(0)}`}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Tax (GST 5%)</span>
                <span>PKR {tax.toFixed(0)}</span>
              </div>
              <div
                className="flex justify-between"
                style={{ borderTop: '2px solid var(--color-cream-dark)', paddingTop: '1rem', fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-chocolate-dark)' }}
              >
                <span>Grand Total</span>
                <span>PKR {total.toFixed(0)}</span>
              </div>
            </div>

            <button onClick={() => setView('checkout')} className="btn btn-primary btn-full flex align-center justify-center gap-2">
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', textAlign: 'center' }} className="text-muted">
              Add products worth <strong>PKR 2,000</strong> or more to get free local delivery!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
