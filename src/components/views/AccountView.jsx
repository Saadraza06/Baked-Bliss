import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { User, LogIn, Key, Compass, Heart, History, MapPin, Eye, Check } from 'lucide-react';

export default function AccountView({ setView, setSelectedProductId, setCustomOrderId }) {
  const {
    currentUser,
    loginUser,
    registerUser,
    logoutUser,
    saveAddress,
    toggleFavoriteProduct,
    products,
    showToast
  } = useContext(BakeryContext);

  const [activeTab, setActiveTab] = useState('profile'); // profile, orders, addresses, favorites
  const [authMode, setAuthMode] = useState('login'); // login, register, forgot

  // Auth Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Address Inputs
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Faisalabad');
  const [zip, setZip] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser(name, email, password);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    showToast(`Password reset link sent to: ${email}`, 'success');
    setAuthMode('login');
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    const newAddress = {
      id: 'addr-' + Date.now(),
      houseNo,
      street,
      city,
      zip
    };
    saveAddress(newAddress);
    // Reset fields
    setHouseNo('');
    setStreet('');
    setZip('');
  };

  // Auth screens if not logged in
  if (!currentUser) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', maxWidth: '500px' }}>
        {authMode === 'login' && (
          <div className="card" style={{ padding: '2.5rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <span className="logo" style={{ justifyContent: 'center', marginBottom: '0.5rem', gap: '0.5rem' }}>
                <div className="logo-img-container" style={{ width: '32px', height: '32px' }}>
                  <img src="/logo.png" alt="Baked Bliss Logo" />
                </div>
                Baked Bliss
              </span>
              <h2>Customer Login</h2>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>Access your order history and saved delivery addresses.</p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  className="form-control"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full flex align-center justify-center gap-2" style={{ padding: '0.9rem' }}>
                Sign In <LogIn size={18} />
              </button>
            </form>
            <div className="text-center text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
              <p>Don't have an account? <span onClick={() => setAuthMode('register')} style={{ color: 'var(--color-light-brown)', cursor: 'pointer', fontWeight: 'bold' }}>Register Here</span></p>
              <p style={{ marginTop: '0.5rem' }}><span onClick={() => setAuthMode('forgot')} style={{ color: 'var(--color-chocolate-light)', cursor: 'pointer' }}>Forgot Password?</span></p>
            </div>
          </div>
        )}

        {authMode === 'register' && (
          <div className="card" style={{ padding: '2.5rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <h2>Create Account</h2>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>Sign up to save favorite items and speed up checkout.</p>
            </div>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sara@example.com"
                  className="form-control"
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full flex align-center justify-center gap-2">
                Register <Check size={18} />
              </button>
            </form>
            <div className="text-center text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
              Already have an account? <span onClick={() => setAuthMode('login')} style={{ color: 'var(--color-light-brown)', cursor: 'pointer', fontWeight: 'bold' }}>Login Here</span>
            </div>
          </div>
        )}

        {authMode === 'forgot' && (
          <div className="card" style={{ padding: '2.5rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <h2>Reset Password</h2>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>Enter email below. We will send you instructions shortly.</p>
            </div>
            <form onSubmit={handleForgot}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full flex align-center justify-center gap-2">
                Reset Password <Key size={18} />
              </button>
            </form>
            <div className="text-center text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
              <span onClick={() => setAuthMode('login')} style={{ color: 'var(--color-light-brown)', cursor: 'pointer', fontWeight: 'bold' }}>Back to Login</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged-in Dashboard
  const favoritesList = products.filter(p => currentUser.favoriteProducts?.includes(p.id));

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Welcome Banner */}
      <div className="card flex justify-between align-center wrap gap-3" style={{ padding: '2rem 3rem', backgroundColor: 'var(--color-chocolate)', color: 'var(--color-white)', borderRadius: 'var(--radius-lg)', marginBottom: '3rem' }}>
        <div>
          <span style={{ color: 'var(--color-pink)', fontWeight: '600' }}>WELCOME BACK</span>
          <h2 style={{ color: 'var(--color-white)', margin: '0.2rem 0 0.5rem' }}>{currentUser.name}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Email: {currentUser.email} {currentUser.isAdmin && <strong style={{ color: 'var(--color-pink)' }}>(Store Admin)</strong>}</p>
        </div>
        <button onClick={logoutUser} className="btn btn-secondary btn-sm" style={{ alignSelf: 'center' }}>
          Logout Account
        </button>
      </div>

      {/* Tabs */}
      <div className="tab-container">
        <button onClick={() => setActiveTab('profile')} className={`tab-btn ${activeTab === 'profile' ? 'active' : ''} flex align-center gap-2`}>
          <User size={16} /> Profile Details
        </button>
        <button onClick={() => setActiveTab('orders')} className={`tab-btn ${activeTab === 'orders' ? 'active' : ''} flex align-center gap-2`}>
          <History size={16} /> Order History ({currentUser.orderHistory?.length || 0})
        </button>
        <button onClick={() => setActiveTab('addresses')} className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''} flex align-center gap-2`}>
          <MapPin size={16} /> Saved Addresses
        </button>
        <button onClick={() => setActiveTab('favorites')} className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''} flex align-center gap-2`}>
          <Heart size={16} /> Favorites ({favoritesList.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'profile' && (
          <div className={currentUser.isAdmin ? "grid grid-2 animate-fade-in" : "animate-fade-in"} style={{ gap: '2.5rem', maxWidth: currentUser.isAdmin ? 'none' : '600px' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Your Account Details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }} className="text-muted">
                <div>👤 <strong>Name:</strong> {currentUser.name}</div>
                <div>📧 <strong>Email Address:</strong> {currentUser.email}</div>
                <div>🔑 <strong>Password:</strong> ••••••••</div>
              </div>
            </div>
            {currentUser.isAdmin && (
              <div className="card animate-fade-in" style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Admin Access Dashboard</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '0.95rem' }} className="text-muted">
                  <p style={{ color: 'var(--color-chocolate-dark)', fontWeight: '500', lineHeight: '1.6' }}>
                    Access the administrative control center to manage products, view sales analytics, and update order statuses.
                  </p>
                  <button onClick={() => setView('admin-dashboard')} className="btn btn-primary btn-sm" style={{ width: 'fit-content' }}>
                    Open Management Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Past Purchase Orders</h3>
            {(!currentUser.orderHistory || currentUser.orderHistory.length === 0) ? (
              <div className="card text-center" style={{ padding: '3rem 2rem' }}>
                <p className="text-muted">You haven't ordered anything yet!</p>
                <button onClick={() => setView('menu')} className="btn btn-outline btn-sm" style={{ marginTop: '1rem' }}>
                  Browse Product Catalog
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {currentUser.orderHistory.map(ord => (
                  <div key={ord.id} className="card flex justify-between align-center wrap gap-3" style={{ padding: '1.5rem 2rem' }}>
                    <div>
                      <span className="badge badge-brown" style={{ marginBottom: '0.5rem' }}>ID: {ord.id}</span>
                      <h4 style={{ fontSize: '1.1rem' }}>Order placed on {ord.date}</h4>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                        Items: {ord.items.map(item => `${item.product.name} (x${item.quantity})`).join(', ')}
                      </p>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                        Delivery status: <strong style={{ color: 'var(--color-chocolate)' }}>{ord.status}</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-chocolate-dark)' }}>PKR {ord.total.toFixed(0)}</span>
                      <div className="flex gap-2" style={{ marginTop: '0.75rem' }}>
                        <button
                          onClick={() => {
                            setCustomOrderId(ord.id);
                            setView('billing');
                          }}
                          className="btn btn-outline btn-sm flex align-center gap-1"
                          style={{ padding: '0.35rem 0.75rem' }}
                        >
                          <Eye size={12} /> Receipt
                        </button>
                        <button
                          onClick={() => {
                            setCustomOrderId(ord.id);
                            setView('tracking');
                          }}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '0.35rem 0.75rem' }}
                        >
                          Track
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="animate-fade-in grid grid-2" style={{ gap: '2.5rem' }}>
            {/* Left: Address List */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Saved Addresses</h3>
              {(!currentUser.savedAddresses || currentUser.savedAddresses.length === 0) ? (
                <p className="text-muted">No saved delivery addresses yet. Add one using the form on the right.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {currentUser.savedAddresses.map((addr) => (
                    <div key={addr.id} className="card flex align-center gap-3" style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ color: 'var(--color-chocolate)' }}><MapPin size={24} /></div>
                      <div>
                        <p style={{ fontWeight: '600' }}>House {addr.houseNo}, {addr.street}</p>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>{addr.city}, {addr.zip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Add Address form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Add New Address</h3>
              <form onSubmit={handleSaveAddress}>
                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>House / Flat No.</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 14"
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
                      placeholder="e.g. Gulberg Main"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>City</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="form-control">
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>Postal Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 54000"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-secondary btn-full">
                  Save Address Details
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Your Favorite Bakes</h3>
            {favoritesList.length === 0 ? (
              <p className="text-muted">You haven't favorited any products yet. View the menu and click the heart icon on any card!</p>
            ) : (
              <div className="grid grid-3">
                {favoritesList.map(prod => (
                  <div key={prod.id} className="card flex flex-col justify-between" style={{ padding: '1rem' }}>
                    <div>
                      <div className="product-image-container">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          style={{ cursor: 'pointer' }}
                          onClick={() => { setSelectedProductId(prod.id); setView('product-details'); }}
                        />
                      </div>
                      <span className="badge badge-pink" style={{ fontSize: '0.75rem' }}>{prod.category}</span>
                      <h4
                        style={{ fontSize: '1.05rem', margin: '0.25rem 0 0.5rem', cursor: 'pointer' }}
                        onClick={() => { setSelectedProductId(prod.id); setView('product-details'); }}
                      >
                        {prod.name}
                      </h4>
                    </div>
                    <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--color-chocolate)' }}>PKR {prod.price.toFixed(0)}</span>
                      <button
                        onClick={() => { setSelectedProductId(prod.id); setView('product-details'); }}
                        className="btn btn-secondary btn-sm"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
