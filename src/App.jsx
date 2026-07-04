import React, { useState, useContext } from 'react';
import { BakeryProvider, BakeryContext } from './context/BakeryContext';
import HomeView from './components/views/HomeView';
import AboutView from './components/views/AboutView';
import MenuView from './components/views/MenuView';
import ProductDetailsView from './components/views/ProductDetailsView';
import CustomCakeView from './components/views/CustomCakeView';
import CartView from './components/views/CartView';
import CheckoutView from './components/views/CheckoutView';
import BillingView from './components/views/BillingView';
import PaymentView from './components/views/PaymentView';
import TrackingView from './components/views/TrackingView';
import DeliveryView from './components/views/DeliveryView';
import LocationView from './components/views/LocationView';
import ContactView from './components/views/ContactView';
import GalleryView from './components/views/GalleryView';
import ReviewsView from './components/views/ReviewsView';
import AccountView from './components/views/AccountView';
import AdminDashboardView from './components/views/AdminDashboardView';

import { ShoppingCart, User, Menu, X, Heart, Star, Sparkles, Home, UtensilsCrossed, Cake, Images, Truck, Info, Phone, ShieldCheck } from 'lucide-react';
import './App.css';

function MainApp() {
  const [view, setView] = useState('home'); // Current routing view
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [customOrderId, setCustomOrderId] = useState(null); // Track specific billing/tracking order
  const [checkoutData, setCheckoutData] = useState(null); // Pass billing details to payment gateway
  const [cartOpen, setCartOpen] = useState(false); // Sidebar cart drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile responsive nav hamburger

  const {
    cart,
    currentUser,
    toastNotification,
    updateCartQuantity,
    removeFromCart,
    activeCoupon,
    deliveryCity,
    setDeliveryCity
  } = useContext(BakeryContext);

  // Cart calculations for quick sidebar
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = activeCoupon ? (activeCoupon.discount * subtotal) : 0;
  const deliveryFee = activeCoupon?.freeShipping ? 0 : (subtotal > 2000 || subtotal === 0 ? 0 : (deliveryCity === 'Faisalabad' ? 200 : 300));
  const tax = (subtotal - discount) * 0.00; // No tax for PKR
  const total = subtotal - discount + deliveryFee;

  const navigateTo = (viewName) => {
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-wrapper flex flex-col" style={{ minHeight: '100vh' }}>
      {/* 1. Header & Navigation */}
      <header>
        <div className="container header-container">
          {/* Logo */}
          <div onClick={() => navigateTo('home')} className="logo" style={{ cursor: 'pointer' }}>
            <div className="logo-img-container" style={{ width: '48px', height: '48px' }}>
              <img src="/logo.png" alt="Baked Bliss Logo" />
            </div>
            <span style={{ color: 'var(--color-chocolate)' }}>Baked</span>
            <span style={{ color: 'var(--color-light-brown)' }}>Bliss</span>
          </div>

          {/* Desktop Navigation */}
          <nav>
            <ul>
              <li><a href="#" className={view === 'home' ? 'active' : ''} onClick={() => navigateTo('home')}>Home</a></li>
              <li><a href="#" className={view === 'menu' ? 'active' : ''} onClick={() => navigateTo('menu')}>Menu</a></li>
              <li><a href="#" className={view === 'custom-cake' ? 'active' : ''} onClick={() => navigateTo('custom-cake')}>Custom Cakes</a></li>
              <li><a href="#" className={view === 'gallery' ? 'active' : ''} onClick={() => navigateTo('gallery')}>Gallery</a></li>
              <li><a href="#" className={view === 'delivery' ? 'active' : ''} onClick={() => navigateTo('delivery')}>Delivery</a></li>
              <li><a href="#" className={view === 'about' ? 'active' : ''} onClick={() => navigateTo('about')}>About</a></li>
              <li><a href="#" className={view === 'contact' ? 'active' : ''} onClick={() => navigateTo('contact')}>Contact</a></li>
            </ul>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            {/* User Account */}
            <button
              onClick={() => navigateTo('account')}
              className="action-btn"
              title="User Account"
              style={{ color: view === 'account' ? 'var(--color-light-brown)' : 'inherit' }}
            >
              <User size={22} />
              {currentUser && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#2E7D32',
                    border: '2px solid var(--color-cream-light)'
                  }}
                ></span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button onClick={() => setCartOpen(true)} className="action-btn" title="Shopping Cart">
              <ShoppingCart size={22} />
              {cartItemCount > 0 && <span className="badge-count">{cartItemCount}</span>}
            </button>

            {/* Admin shortcut if logged in */}
            {currentUser?.isAdmin && (
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
              >
                Admin
              </button>
            )}

            {/* Mobile Hamburguer */}
            <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>

        {/* Full-Screen Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(43, 30, 22, 0.55)',
                backdropFilter: 'blur(4px)',
                zIndex: 150
              }}
            />

            {/* Slide-in Menu Panel */}
            <div
              className="animate-fade-in"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '280px',
                maxWidth: '85vw',
                height: '100vh',
                backgroundColor: 'var(--color-white)',
                zIndex: 151,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '-8px 0 40px rgba(43, 30, 22, 0.25)',
                overflowY: 'auto'
              }}
            >
              {/* Panel Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--color-cream-dark)',
                backgroundColor: 'var(--color-cream-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="logo-img-container" style={{ width: '36px', height: '36px' }}>
                    <img src="/logo.png" alt="Logo" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-chocolate-dark)' }}>Baked Bliss</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: 'var(--color-text-muted)', padding: '0.4rem' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Nav Items */}
              <div style={{ flex: 1, padding: '1rem 0' }}>
                {[
                  { label: 'Home', icon: <Home size={20} />, view: 'home' },
                  { label: 'Menu', icon: <UtensilsCrossed size={20} />, view: 'menu' },
                  { label: 'Custom Cakes', icon: <Cake size={20} />, view: 'custom-cake' },
                  { label: 'Gallery', icon: <Images size={20} />, view: 'gallery' },
                  { label: 'Delivery', icon: <Truck size={20} />, view: 'delivery' },
                  { label: 'About Us', icon: <Info size={20} />, view: 'about' },
                  { label: 'Contact', icon: <Phone size={20} />, view: 'contact' },
                ].map(item => (
                  <button
                    key={item.view}
                    onClick={() => navigateTo(item.view)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.75rem',
                      backgroundColor: view === item.view ? 'var(--color-pink-light)' : 'transparent',
                      color: view === item.view ? 'var(--color-chocolate-dark)' : 'var(--color-text-dark)',
                      fontWeight: view === item.view ? '700' : '500',
                      fontSize: '1rem',
                      borderLeft: view === item.view ? '4px solid var(--color-light-brown)' : '4px solid transparent',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ color: view === item.view ? 'var(--color-light-brown)' : 'var(--color-text-muted)' }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Panel Footer */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid var(--color-cream-dark)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <button
                  onClick={() => navigateTo('account')}
                  className="btn btn-outline btn-full"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <User size={16} /> {currentUser ? currentUser.name : 'Login / Sign Up'}
                </button>
                {currentUser?.isAdmin && (
                  <button
                    onClick={() => navigateTo('admin-dashboard')}
                    className="btn btn-secondary btn-full"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                  >
                    <ShieldCheck size={16} /> Admin Dashboard
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </header>

      {/* 2. Responsive Sidebar Cart Drawer Overlay */}
      {cartOpen && (
        <div className="overlay-backdrop" onClick={() => setCartOpen(false)}>
          <div className="sidebar-cart open" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-cart-header">
              <h3 style={{ fontSize: '1.25rem' }} className="flex align-center gap-2">
                <ShoppingCart size={20} /> Your Shopping Cart ({cartItemCount})
              </h3>
              <button onClick={() => setCartOpen(false)} style={{ color: 'var(--color-text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div className="sidebar-cart-body">
              {cart.length === 0 ? (
                <div className="text-center" style={{ marginTop: '5rem' }}>
                  <p className="text-muted">Your cart is empty.</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('menu');
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '1rem' }}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="cart-item-row">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/chocolate_cake.jpg';
                      }}
                    />
                    <div className="cart-item-info">
                      <span className="cart-item-title">{item.product.name}</span>
                      <p className="cart-item-meta">Flavour: {item.flavour} | Size: {item.weight}</p>
                      <div className="qty-control" style={{ marginTop: '0.35rem' }}>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.flavour, item.weight)}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.flavour, item.weight)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-between" style={{ minWidth: '70px' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                        PKR {(item.product.price * item.quantity).toFixed(0)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.flavour, item.weight)}
                        style={{ color: 'var(--color-pink-dark)', fontSize: '0.75rem', textDecoration: 'underline', marginTop: '0.5rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="sidebar-cart-footer">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
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
                  <div className="flex justify-between align-center" style={{ fontSize: '0.9rem' }}>
                    <span className="text-muted">Delivery City</span>
                    <select 
                      value={deliveryCity} 
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      style={{
                        padding: '0.2rem 0.4rem',
                        fontSize: '0.75rem',
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
                  <div className="flex justify-between text-muted" style={{ fontSize: '0.9rem' }}>
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee.toFixed(0)}`}</span>
                  </div>
                  <div className="flex justify-between" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '0.5rem', fontWeight: '700', color: 'var(--color-chocolate-dark)' }}>
                    <span>Total Due</span>
                    <span>PKR {total.toFixed(0)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('cart');
                    }}
                    className="btn btn-outline btn-full btn-sm"
                  >
                    View Cart
                  </button>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('checkout');
                    }}
                    className="btn btn-primary btn-full btn-sm"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Main Views Router Content Area */}
      <main style={{ flex: '1', paddingBottom: '4rem' }}>
        {view === 'home' && <HomeView setView={navigateTo} setSelectedProductId={setSelectedProductId} />}
        {view === 'about' && <AboutView setView={navigateTo} />}
        {view === 'menu' && <MenuView setView={navigateTo} setSelectedProductId={setSelectedProductId} />}
        {view === 'product-details' && (
          <ProductDetailsView
            setView={navigateTo}
            productId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />
        )}
        {view === 'custom-cake' && <CustomCakeView setView={navigateTo} />}
        {view === 'cart' && <CartView setView={navigateTo} />}
        {view === 'checkout' && <CheckoutView setView={navigateTo} setCheckoutData={setCheckoutData} />}
        {view === 'payment' && <PaymentView setView={navigateTo} checkoutData={checkoutData} />}
        {view === 'billing' && <BillingView setView={navigateTo} customOrderId={customOrderId} />}
        {view === 'tracking' && <TrackingView setView={navigateTo} customOrderId={customOrderId} />}
        {view === 'delivery' && <DeliveryView setView={navigateTo} />}
        {view === 'location' && <LocationView setView={navigateTo} />}
        {view === 'contact' && <ContactView setView={navigateTo} />}
        {view === 'gallery' && <GalleryView />}
        {view === 'reviews' && <ReviewsView />}
        {view === 'account' && (
          <AccountView
            setView={navigateTo}
            setSelectedProductId={setSelectedProductId}
            setCustomOrderId={setCustomOrderId}
          />
        )}
        {view === 'admin-dashboard' && (
          <AdminDashboardView
            setView={navigateTo}
            setSelectedProductId={setSelectedProductId}
            setCustomOrderId={setCustomOrderId}
          />
        )}
      </main>

      {/* 4. Toast Notification Overlay */}
      {toastNotification && (
        <div className="toast-container no-print">
          <div className={`toast ${toastNotification.type}`}>
            <span>
              {toastNotification.type === 'success' ? '✅' : toastNotification.type === 'error' ? '❌' : '💬'}
              {' '}{toastNotification.message}
            </span>
          </div>
        </div>
      )}

      {/* 5. Footer */}
      <footer className="no-print">
        <div className="container grid grid-3" style={{ gap: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-white)', fontFamily: 'var(--font-heading)' }}>Baked Bliss</h3>
            <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Handcrafted cakes, warm artisan breads, and delicious morning cupcakes baked with love and organic local ingredients.
            </p>
            <div className="flex gap-2">
              <span className="badge badge-brown" style={{ fontSize: '0.75rem' }}>ESTD. 2018</span>
              <span className="badge badge-pink" style={{ fontSize: '0.75rem' }}>Faisalabad, PK</span>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#" onClick={() => navigateTo('menu')}>Product Menu</a></li>
              <li><a href="#" onClick={() => navigateTo('custom-cake')}>Custom Cakes</a></li>
              <li><a href="#" onClick={() => navigateTo('gallery')}>Photo Gallery</a></li>
              <li><a href="#" onClick={() => navigateTo('reviews')}>Reviews Board</a></li>
            </ul>
          </div>
          <div>
            <h3>Support & Info</h3>
            <ul>
              <li><a href="#" onClick={() => navigateTo('delivery')}>Delivery Areas</a></li>
              <li><a href="#" onClick={() => navigateTo('contact')}>Contact Form</a></li>
            </ul>
          </div>

        </div>
        <div className="container footer-bottom text-center">
          <p>© 2026 Baked Bliss Bakery. Developed for modern web. All Rights Reserved.</p>
          <div className="flex gap-3 justify-center" style={{ marginTop: '0.5rem' }}>
            <a href="#" onClick={() => navigateTo('admin-dashboard')}>Admin Console</a>
            <span>•</span>
            <a href="#" onClick={() => navigateTo('account')}>Customer Account</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BakeryProvider>
      <MainApp />
    </BakeryProvider>
  );
}
