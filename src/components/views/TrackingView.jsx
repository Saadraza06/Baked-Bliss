import React, { useContext, useState } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Package, ChefHat, Sparkles, Box, Truck, CheckCircle2, Search, ArrowRight } from 'lucide-react';

export default function TrackingView({ setView, customOrderId }) {
  const { orders, currentOrderTrackingId, showToast } = useContext(BakeryContext);
  const [searchId, setSearchId] = useState('');
  
  // Choose order
  const activeId = searchId.trim() || customOrderId || currentOrderTrackingId || (orders.length > 0 ? orders[0].id : '');
  const order = orders.find(o => o.id === activeId);

  // Map state status strings to tracking step indexes
  // Received -> Preparing -> Baking -> Ready -> Out for Delivery -> Delivered
  const statusSteps = [
    { label: 'Received', icon: <Package size={20} />, key: 'Received' },
    { label: 'Preparing', icon: <ChefHat size={20} />, key: 'Preparing' },
    { label: 'Baking', icon: <Sparkles size={20} />, key: 'Baking' },
    { label: 'Ready', icon: <Box size={20} />, key: 'Ready' },
    { label: 'Out for Delivery', icon: <Truck size={20} />, key: 'Out for Delivery' },
    { label: 'Delivered', icon: <CheckCircle2 size={20} />, key: 'Delivered' }
  ];

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    const idx = statusSteps.findIndex(s => s.key === order.status);
    return idx > -1 ? idx : 0;
  };

  const currentStepIdx = getCurrentStepIndex();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orders.find(o => o.id === searchId.trim())) {
      showToast('Order ID not found.', 'info');
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', maxWidth: '850px' }}>
      {/* Page Title */}
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>ORDER TRACKER</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Track Your Sweet Bakes</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Enter your Order ID below to view the real-time preparation, baking, and delivery status of your goods.
        </p>
      </div>

      {/* Search Order Form */}
      <form onSubmit={handleSearch} className="flex gap-2 justify-center" style={{ marginBottom: '3.5rem' }}>
        <input
          type="text"
          placeholder="Enter Order ID (e.g. ORD-123456)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="form-control"
          style={{ maxWidth: '350px', borderRadius: 'var(--radius-full)' }}
        />
        <button type="submit" className="btn btn-secondary btn-sm flex align-center gap-1">
          <Search size={16} /> Track
        </button>
      </form>

      {/* Tracking Results Card */}
      {!order ? (
        <div className="card text-center" style={{ padding: '4rem 2rem' }}>
          <h3>No Active Order Found</h3>
          <p className="text-muted" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            We could not find any active orders for this session. Have you placed an order?
          </p>
          <button onClick={() => setView('menu')} className="btn btn-primary">
            Browse Bakery Menu
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: '3rem 2.5rem' }}>
          {/* Summary Row */}
          <div className="flex justify-between align-center wrap gap-2" style={{ borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>ORDER TRACKING NUMBER</span>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-chocolate-dark)' }}>{order.id}</h3>
            </div>
            <div className="text-right">
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>ESTIMATED DELIVERY</span>
              <p style={{ fontWeight: '600' }}>Today (Within 2 Hours)</p>
            </div>
          </div>

          {/* Animated Progress Tracker */}
          <div className="tracking-steps">
            <div
              className="tracking-line-active"
              style={{
                width: window.innerWidth > 600 ? `${(currentStepIdx / (statusSteps.length - 1)) * 100}%` : '4px',
                height: window.innerWidth > 600 ? '4px' : `${(currentStepIdx / (statusSteps.length - 1)) * 100}%`
              }}
            ></div>
            {statusSteps.map((step, idx) => {
              const isCompleted = idx < currentStepIdx;
              const isActive = idx === currentStepIdx;

              return (
                <div
                  key={step.key}
                  className={`tracking-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <div className="tracking-dot">
                    {step.icon}
                  </div>
                  <span className="tracking-label">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Helper Tips */}
          <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-light-brown)', marginTop: '3rem' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--color-chocolate-dark)', marginBottom: '0.5rem' }} className="flex align-center gap-1">
              <ChefHat size={16} /> Interactive Testing Hint
            </h4>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              Want to see the tracking progress bar move? Log in as Admin <strong>(admin@bakery.com / admin123)</strong>, go to the <strong>Admin Dashboard</strong>, and update the status of this order. When you return to this page, the status will update dynamically!
            </p>
            <div className="flex gap-2" style={{ marginTop: '1rem' }}>
              <button onClick={() => setView('admin-dashboard')} className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                Go to Admin Dashboard
              </button>
              <button onClick={() => setView('billing')} className="btn btn-outline btn-sm" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                View Order Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
