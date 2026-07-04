import React, { useContext, useRef } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Printer, Download, ArrowRight, Truck } from 'lucide-react';

export default function BillingView({ setView, customOrderId }) {
  const { orders, currentOrderTrackingId, showToast } = useContext(BakeryContext);
  
  // Find the current invoice: either custom cake order id, parent tracking id, or the latest order
  const orderId = customOrderId || currentOrderTrackingId || (orders.length > 0 ? orders[0].id : null);
  const order = orders.find(o => o.id === orderId);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Invoice downloaded successfully as PDF!', 'success');
  };

  if (!order) {
    return (
      <div className="container text-center animate-fade-in" style={{ padding: '5rem 0' }}>
        <h2>No Invoice Found</h2>
        <p className="text-muted">You haven't placed any orders in this session yet.</p>
        <button onClick={() => setView('menu')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Go to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Control Buttons */}
      <div className="flex justify-between align-center wrap gap-2 no-print" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
        <button onClick={() => setView('menu')} className="btn btn-outline btn-sm">
          ← Shop More Bakes
        </button>
        <div className="flex gap-2">
          <button onClick={handlePrint} className="btn btn-secondary btn-sm flex align-center gap-1">
            <Printer size={16} /> Print Receipt
          </button>
          <button onClick={handleDownload} className="btn btn-outline btn-sm flex align-center gap-1">
            <Download size={16} /> Download PDF
          </button>
          <button onClick={() => setView('tracking')} className="btn btn-primary btn-sm flex align-center gap-1">
            Track Order <Truck size={16} />
          </button>
        </div>
      </div>

      {/* Invoice Box */}
      <div className="invoice-box" id="invoice-receipt">
        {/* Header */}
        <div className="invoice-header flex justify-between align-center wrap gap-3">
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-chocolate)' }}>Baked Bliss Bakery</h2>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              12 Bakery Lane, Gulberg III, Faisalabad, Pakistan<br />
              Phone: +92 300 9876543 | support@bakedbliss.com
            </p>
          </div>
          <div className="text-right">
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-chocolate-dark)' }}>INVOICE</h3>
            <span className="badge badge-brown" style={{ fontSize: '0.85rem' }}>Invoice #: {order.id}</span>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Date: {order.date}</p>
          </div>
        </div>

        {/* Customer & Shipping Details */}
        <div className="grid grid-2" style={{ gap: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-chocolate)', marginBottom: '0.5rem' }}>Billed To:</h4>
            <p style={{ fontWeight: '600' }}>{order.customer.name}</p>
            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
              Phone: {order.customer.phone || 'N/A'}<br />
              Email: {order.customer.email}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-chocolate)', marginBottom: '0.5rem' }}>Shipping / Delivery Address:</h4>
            {order.address.houseNo ? (
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                House {order.address.houseNo}, {order.address.street}<br />
                {order.address.city}, {order.address.postalCode}
              </p>
            ) : (
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>{order.address.city || 'Local Delivery Area'}</p>
            )}
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              <strong>Payment Method:</strong> {order.paymentMethod}
            </p>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              <strong>Payment Status:</strong>{' '}
              <span style={{
                fontWeight: '700',
                color: order.paymentStatus === 'Paid' ? '#2E7D32' : order.paymentStatus === 'Pending Verification' ? '#E65100' : '#B45309'
              }}>
                {order.paymentStatus}
              </span>
            </p>
            {order.jazzCashTxnId && (
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                <strong>JazzCash TXN ID:</strong> {order.jazzCashTxnId}
              </p>
            )}
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cream-dark)', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-chocolate)' }}>Order Notes / Allergen Warnings:</span>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{order.notes}</p>
          </div>
        )}

        {/* Products Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product / Description</th>
              <th className="text-center" style={{ width: '80px' }}>Qty</th>
              <th className="text-right" style={{ width: '120px' }}>Price</th>
              <th className="text-right" style={{ width: '120px' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <span style={{ fontWeight: '600', color: 'var(--color-chocolate-dark)' }}>{item.product.name}</span>
                  <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.1rem' }}>
                    Flavour: {item.flavour} | Size/Weight: {item.weight}
                  </div>
                </td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">PKR {item.product.price.toFixed(0)}</td>
                <td className="text-right">PKR {(item.product.price * item.quantity).toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Invoice Summary */}
        <div className="invoice-summary">
          <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
            <span>Subtotal</span>
            <span>PKR {order.subtotal.toFixed(0)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between" style={{ color: '#C62828', fontSize: '0.9rem' }}>
              <span>Discount</span>
              <span>-PKR {order.discount.toFixed(0)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
            <span>Delivery Fee</span>
            <span>{order.deliveryFee === 0 ? 'FREE' : `PKR ${order.deliveryFee.toFixed(0)}`}</span>
          </div>
          <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
            <span>Tax (5% GST)</span>
            <span>PKR {order.tax.toFixed(0)}</span>
          </div>
          <div className="flex justify-between" style={{ borderTop: '2px solid var(--color-cream-dark)', paddingTop: '0.75rem', marginTop: '0.5rem', fontWeight: '700', fontSize: '1.25rem', color: 'var(--color-chocolate-dark)' }}>
            <span>Grand Total</span>
            <span>PKR {order.total.toFixed(0)}</span>
          </div>
        </div>

        {/* Footer greeting */}
        <div className="text-center" style={{ borderTop: '1px solid var(--color-cream-dark)', marginTop: '3rem', paddingTop: '1.5rem' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-chocolate)' }}>
            "Thank you for choosing Baked Bliss. Have a blissful day!"
          </p>
        </div>
      </div>
    </div>
  );
}
