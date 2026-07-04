import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { ShieldCheck, AlertOctagon, CheckCircle2, Banknote } from 'lucide-react';

// Owner's WhatsApp number (country code + number, no + or spaces)
const OWNER_WHATSAPP = '923008749322';

// Build a WhatsApp message from an order object
const buildWhatsAppMessage = (order) => {
  const items = order.items
    .map(i => `  • ${i.product.name} x${i.quantity} (${i.flavour}, ${i.weight}) — PKR ${(i.product.price * i.quantity).toFixed(0)}`)
    .join('\n');

  const lines = [
    '🎂 *NEW ORDER — Baked Bliss*',
    `🆔 Order ID: ${order.id}`,
    `📅 Date: ${order.date}`,
    '',
    '👤 *Customer Details*',
    `  Name: ${order.customer?.name || 'N/A'}`,
    `  Phone: ${order.customer?.phone || 'N/A'}`,
    `  Email: ${order.customer?.email || 'N/A'}`,
    '',
    '📦 *Ordered Items*',
    items,
    '',
    '🏠 *Delivery Address*',
    `  ${order.address?.houseNo || ''} ${order.address?.street || ''}`,
    `  City: ${order.address?.city || 'N/A'} — Postal: ${order.address?.postalCode || 'N/A'}`,
    '',
    '💰 *Payment Summary*',
    `  Subtotal: PKR ${order.subtotal?.toFixed(0)}`,
    order.discount > 0 ? `  Discount: -PKR ${order.discount?.toFixed(0)}` : null,
    `  Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : 'PKR ' + order.deliveryFee?.toFixed(0)}`,
    `  *TOTAL: PKR ${order.total?.toFixed(0)}*`,
    `  Payment Method: ${order.paymentMethod}`,
    `  Payment Status: ${order.paymentStatus}`,
    order.notes ? `\n📝 Notes: ${order.notes}` : null,
    '',
    '✅ Please confirm this order with the customer.'
  ].filter(line => line !== null).join('\n');

  return encodeURIComponent(lines);
};

const sendOrderToWhatsApp = (order) => {
  const message = buildWhatsAppMessage(order);
  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;
  window.open(url, '_blank');
};

export default function PaymentView({ setView, checkoutData }) {
  const { checkout, cart, activeCoupon } = useContext(BakeryContext);
  // Simulation states
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? (activeCoupon.discount * subtotal) : 0;
  const deliveryFee = activeCoupon?.freeShipping ? 0 : (subtotal > 2000 ? 0 : 200);
  const tax = 0;
  const total = subtotal - discount + deliveryFee;

  const handleSimulatePayment = (success) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (success) {
        setPaymentStatus('success');
        // Actually record the order in our Context state!
        const newOrder = checkout(
          checkoutData.customerInfo,
          checkoutData.deliveryAddress,
          checkoutData.orderNotes,
          checkoutData.paymentMethod
        );
        // 🚀 Send order details to owner's WhatsApp automatically!
        if (newOrder) {
          sendOrderToWhatsApp(newOrder);
        }
      } else {
        setPaymentStatus('failed');
      }
    }, 1500);
  };

  const handleSuccessDone = () => {
    setView('billing'); // Redirect to invoice page!
  };

  if (paymentStatus === 'success') {
    return (
      <div className="container text-center animate-fade-in" style={{ padding: '6rem 1.5rem', maxWidth: '620px' }}>
        <div className="card" style={{ padding: '3.5rem', borderTop: '6px solid #2E7D32' }}>
          <div style={{ color: '#2E7D32', marginBottom: '1.5rem' }} className="animate-float">
            <CheckCircle2 size={72} fill="rgba(46, 125, 50, 0.1)" />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2E7D32' }}>Payment Successful! 🎉</h1>
          <p className="text-muted" style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
            Thank you for ordering with Baked Bliss! Your payment was processed securely.
          </p>

          {/* WhatsApp Confirmation Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            color: 'white',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>📲</span>
            <div>
              <p style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.2rem' }}>Order sent to owner via WhatsApp!</p>
              <p style={{ fontSize: '0.82rem', opacity: '0.9' }}>The bakery owner has been notified with your full order details. You will receive a confirmation call shortly.</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center wrap">
            <button onClick={handleSuccessDone} className="btn btn-primary">
              View Invoice
            </button>
            <button onClick={() => setView('tracking')} className="btn btn-secondary">
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="container text-center animate-fade-in" style={{ padding: '6rem 1.5rem', maxWidth: '600px' }}>
        <div className="card" style={{ padding: '3.5rem', borderTop: '6px solid #C62828' }}>
          <div style={{ color: '#C62828', marginBottom: '1.5rem' }}>
            <AlertOctagon size={72} fill="rgba(198, 40, 40, 0.1)" />
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#C62828' }}>Payment Failed</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            We were unable to process your payment. This could be due to insufficient funds, incorrect details, or bank server timeouts.
          </p>
          <div className="flex gap-3 justify-center wrap">
            <button onClick={() => setPaymentStatus('pending')} className="btn btn-primary">
              Try Again
            </button>
            <button onClick={() => setView('checkout')} className="btn btn-outline">
              Edit Payment Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', maxWidth: '700px' }}>
      <div className="card" style={{ padding: '3rem' }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <div className="flex align-center justify-center gap-1 text-brown" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} />
            <span style={{ fontWeight: '600', fontFamily: 'var(--font-subheading)', fontSize: '0.85rem' }}>SECURE GATEWAY</span>
          </div>
          <h1 style={{ fontSize: '2.2rem' }}>Bakery Payment Portal</h1>
          <p className="text-muted" style={{ marginTop: '0.25rem' }}>
            Amount Due: <strong style={{ color: 'var(--color-chocolate)', fontSize: '1.25rem' }}>PKR {total.toFixed(0)}</strong>
          </p>
        </div>

        {/* Selected method details */}
        <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-cream-dark)', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>PAYING VIA:</span>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-chocolate-dark)' }} className="flex align-center gap-2">
            <Banknote size={18} />
            Cash on Delivery
          </h3>
        </div>

        {/* Dynamic Fields Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSimulatePayment(true); }}>

          {/* Cash on Delivery notice */}
          <div style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--color-cream-dark)' }}>
            <p style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-chocolate-dark)' }}>💵 Cash on Delivery</p>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              You'll pay in cash when your order is delivered. No online payment is required.
            </p>
          </div>

          {/* Confirm Action */}
          <div style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '2rem', marginTop: '2rem' }}>
            {loading ? (
              <div className="text-center" style={{ padding: '1rem' }}>
                <p style={{ fontWeight: '600' }} className="animate-float">Confirming your order...</p>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleSimulatePayment(true)}
                className="btn btn-primary btn-full"
                style={{ backgroundColor: '#2E7D32', padding: '1rem' }}
              >
                {checkoutData?.paymentMethod === 'Cash on Delivery' ? '✅ Place Order (Pay on Delivery)' : '✅ Confirm Order'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
