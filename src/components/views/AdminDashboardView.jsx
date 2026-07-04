import React, { useState, useContext } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { LayoutDashboard, ShoppingCart, Cake, Tag, ClipboardList, Plus, Trash2, Edit3, Save, TrendingUp, DollarSign, Package } from 'lucide-react';

export default function AdminDashboardView({ setView, setSelectedProductId, setCustomOrderId }) {
  const {
    products,
    orders,
    coupons,
    adminUpdateOrderStatus,
    adminAddProduct,
    adminUpdateProduct,
    adminDeleteProduct,
    adminAddCoupon,
    adminDeleteCoupon,
    currentUser
  } = useContext(BakeryContext);

  const [adminTab, setAdminTab] = useState('analytics'); // analytics, orders, products, coupons, inventory

  // Add Product Form States
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Cakes');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdWeight, setNewProdWeight] = useState('');
  const [newProdFlavour, setNewProdFlavour] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdIngred, setNewProdIngred] = useState('');
  const [newProdAllergens, setNewProdAllergens] = useState('');
  const [newProdImage, setNewProdImage] = useState('/chocolate_cake.jpg');

  // Edit Product States
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editAvailability, setEditAvailability] = useState(true);

  // Coupon Form States
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('');
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Safeguard: Check admin permissions
  if (!currentUser?.isAdmin) {
    return (
      <div className="container text-center animate-fade-in" style={{ padding: '6rem 1.5rem', maxWidth: '500px' }}>
        <div className="card" style={{ padding: '3.5rem', borderTop: '6px solid #C62828' }}>
          <h2>Access Denied</h2>
          <p className="text-muted" style={{ marginTop: '0.75rem', marginBottom: '2rem' }}>
            You do not have administrative privileges to access this dashboard. Please log in using your administrator credentials.
          </p>
          <button onClick={() => setView('account')} className="btn btn-primary">
            Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  // Analytics stats
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const orderCount = orders.length;
  const averageOrder = orderCount > 0 ? (totalSales / orderCount) : 0;
  
  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const prod = {
      name: newProdName,
      category: newProdCategory,
      price: parseFloat(newProdPrice),
      weight: newProdWeight,
      flavour: newProdFlavour,
      availability: true,
      description: newProdDesc,
      ingredients: newProdIngred,
      allergens: newProdAllergens,
      images: [newProdImage]
    };
    adminAddProduct(prod);
    // Reset Form
    setNewProdName('');
    setNewProdPrice('');
    setNewProdWeight('');
    setNewProdFlavour('');
    setNewProdDesc('');
    setNewProdIngred('');
    setNewProdAllergens('');
  };

  const handleEditClick = (p) => {
    setEditingId(p.id);
    setEditPrice(p.price);
    setEditAvailability(p.availability);
  };

  const handleSaveClick = (product) => {
    const updated = {
      ...product,
      price: parseFloat(editPrice),
      availability: editAvailability
    };
    adminUpdateProduct(updated);
    setEditingId(null);
  };

  const handleAddCouponSubmit = (e) => {
    e.preventDefault();
    const coup = {
      code: newCouponCode.trim().toUpperCase(),
      discount: parseFloat(newCouponDiscount) / 100,
      description: newCouponDesc
    };
    adminAddCoupon(coup);
    setNewCouponCode('');
    setNewCouponDiscount('');
    setNewCouponDesc('');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Dashboard Title */}
      <div className="flex justify-between align-center wrap gap-2" style={{ marginBottom: '2.5rem' }}>
        <div>
          <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>CONTROL CENTER</span>
          <h1 style={{ fontSize: '2.5rem', marginTop: '0.2rem' }}>Admin Operations Dashboard</h1>
        </div>
        <button onClick={() => setView('menu')} className="btn btn-outline btn-sm">
          ← View Storefront
        </button>
      </div>

      {/* Admin tabs */}
      <div className="tab-container" style={{ marginBottom: '2.5rem' }}>
        <button onClick={() => setAdminTab('analytics')} className={`tab-btn ${adminTab === 'analytics' ? 'active' : ''} flex align-center gap-2`}>
          <TrendingUp size={16} /> Sales Analytics
        </button>
        <button onClick={() => setAdminTab('orders')} className={`tab-btn ${adminTab === 'orders' ? 'active' : ''} flex align-center gap-2`}>
          <ShoppingCart size={16} /> Manage Orders ({orders.length})
        </button>
        <button onClick={() => setAdminTab('products')} className={`tab-btn ${adminTab === 'products' ? 'active' : ''} flex align-center gap-2`}>
          <Cake size={16} /> Products Manager ({products.length})
        </button>
        <button onClick={() => setAdminTab('coupons')} className={`tab-btn ${adminTab === 'coupons' ? 'active' : ''} flex align-center gap-2`}>
          <Tag size={16} /> Promo Coupons ({coupons.length})
        </button>
        <button onClick={() => setAdminTab('inventory')} className={`tab-btn ${adminTab === 'inventory' ? 'active' : ''} flex align-center gap-2`}>
          <ClipboardList size={16} /> Quick Stock Sheet
        </button>
      </div>

      {/* Admin Panels */}
      <div>
        {/* Panel 1: Analytics */}
        {adminTab === 'analytics' && (
          <div className="animate-fade-in">
            {/* Cards row */}
            <div className="grid grid-3" style={{ marginBottom: '3rem' }}>
              <div className="card flex align-center gap-3" style={{ padding: '2rem' }}>
                <div style={{ backgroundColor: 'var(--color-pink-light)', padding: '1rem', borderRadius: '50%', color: 'var(--color-chocolate)' }}>
                  <DollarSign size={28} />
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>TOTAL REVENUE</span>
                  <h2 style={{ fontSize: '1.8rem', margin: '0' }}>PKR {totalSales.toFixed(0)}</h2>
                </div>
              </div>
              <div className="card flex align-center gap-3" style={{ padding: '2rem' }}>
                <div style={{ backgroundColor: 'var(--color-pink-light)', padding: '1rem', borderRadius: '50%', color: 'var(--color-chocolate)' }}>
                  <ShoppingCart size={28} />
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>TOTAL ORDERS PLACED</span>
                  <h2 style={{ fontSize: '1.8rem', margin: '0' }}>{orderCount}</h2>
                </div>
              </div>
              <div className="card flex align-center gap-3" style={{ padding: '2rem' }}>
                <div style={{ backgroundColor: 'var(--color-pink-light)', padding: '1rem', borderRadius: '50%', color: 'var(--color-chocolate)' }}>
                  <Package size={28} />
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>AVERAGE TRANSACTION</span>
                  <h2 style={{ fontSize: '1.8rem', margin: '0' }}>PKR {averageOrder.toFixed(0)}</h2>
                </div>
              </div>
            </div>

            {/* Sales detailed chart simulation */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Hourly Sales Density & Volume</h3>
              {/* Fake Graph lines */}
              <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '8px', borderBottom: '2.5px solid var(--color-cream-dark)', paddingBottom: '10px', position: 'relative' }}>
                {[30, 45, 60, 40, 75, 90, 85, 120, 95, 110, 130, 140, 160].map((val, idx) => (
                  <div key={idx} style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', height: `${(val/160)*180}px`, backgroundColor: 'var(--color-light-brown)', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', position: 'relative' }} className="animate-fade-in">
                      <span style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 'bold' }}>{val}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', marginTop: '8px', color: 'var(--color-text-muted)' }}>{8+idx}:00</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Panel 2: Manage Orders */}
        {adminTab === 'orders' && (
          <div className="animate-fade-in">
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Customer Orders Management</h3>
            {orders.length === 0 ? (
              <p className="text-muted text-center" style={{ padding: '3rem 0' }}>No customer orders placed in this session yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {orders.map(order => (
                  <div key={order.id} className="card flex justify-between align-center wrap gap-3" style={{ padding: '2rem' }}>
                    <div>
                      <div className="flex align-center gap-2" style={{ marginBottom: '0.5rem' }}>
                        <span className="badge badge-brown">Order ID: {order.id}</span>
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>{order.date}</span>
                      </div>
                      <h4 style={{ fontSize: '1.15rem' }}>Customer: {order.customer.name} ({order.customer.phone})</h4>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                        <strong>Items:</strong> {order.items.map(item => `${item.product.name} (x${item.quantity})`).join(', ')}
                      </p>
                      <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        <strong>Address:</strong> House {order.address.houseNo}, {order.address.street}, {order.address.city}
                      </p>
                      <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                        <strong>Notes:</strong> {order.notes || 'None'}
                      </p>
                    </div>

                    <div className="flex flex-col align-center gap-2 text-right" style={{ minWidth: '180px' }}>
                      <span style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--color-chocolate)' }}>PKR {order.total.toFixed(0)}</span>
                      
                      {/* Update status selector */}
                      <div className="form-group" style={{ marginBottom: '0', width: '100%' }}>
                        <select
                          value={order.status}
                          onChange={(e) => adminUpdateOrderStatus(order.id, e.target.value)}
                          className="form-control"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                        >
                          <option value="Received">Received</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Baking">Baking</option>
                          <option value="Ready">Ready</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>

                      {/* View Receipt button */}
                      <button
                        onClick={() => {
                          setCustomOrderId(order.id);
                          setView('billing');
                        }}
                        className="btn btn-outline btn-full btn-sm"
                        style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem' }}
                      >
                        View Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Panel 3: Products CRUD */}
        {adminTab === 'products' && (
          <div className="animate-fade-in grid custom-cake-grid" style={{ gap: '2.5rem' }}>
            {/* Left: Product List */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Product Catalog Editor</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map(p => (
                  <div key={p.id} className="card flex align-center justify-between gap-3" style={{ padding: '1rem 1.5rem' }}>
                    <div className="flex align-center gap-3">
                      <img src={p.images[0]} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                      <div>
                        <h4 style={{ fontSize: '1rem', margin: '0' }}>{p.name}</h4>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{p.category} | PKR {p.price.toFixed(0)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { setSelectedProductId(p.id); setView('product-details'); }}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => adminDeleteProduct(p.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', backgroundColor: '#C62828', color: '#FFFFFF' }}
                        title="Delete Product"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Add Product Form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }} className="flex align-center gap-1">
                <Plus size={18} /> Add New Product
              </h3>
              <form onSubmit={handleAddProductSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" required value={newProdName} onChange={(e) => setNewProdName(e.target.value)} className="form-control" placeholder="e.g. Classic Chocolate Cake" />
                </div>
                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>Category</label>
                    <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} className="form-control">
                      <option value="Cakes">Cakes</option>
                      <option value="Cupcakes">Cupcakes</option>
                      <option value="Cookies">Cookies</option>
                      <option value="Breads">Breads</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>Price (PKR)</label>
                    <input type="number" step="1" required value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} className="form-control" placeholder="e.g. 1500" />
                  </div>
                </div>
                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>Weight / Size</label>
                    <input type="text" required value={newProdWeight} onChange={(e) => setNewProdWeight(e.target.value)} className="form-control" placeholder="e.g. 1.0 kg or 80g" />
                  </div>
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>Flavour</label>
                    <input type="text" required value={newProdFlavour} onChange={(e) => setNewProdFlavour(e.target.value)} className="form-control" placeholder="e.g. Vanilla Strawberry" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <textarea rows="2" required value={newProdDesc} onChange={(e) => setNewProdDesc(e.target.value)} className="form-control" placeholder="Type customer-facing description..." style={{ resize: 'vertical' }}></textarea>
                </div>
                <div className="form-group">
                  <label>Ingredients</label>
                  <input type="text" required value={newProdIngred} onChange={(e) => setNewProdIngred(e.target.value)} className="form-control" placeholder="e.g. Flour, Butter, Cocoa, Eggs" />
                </div>
                <div className="form-group">
                  <label>Allergens</label>
                  <input type="text" required value={newProdAllergens} onChange={(e) => setNewProdAllergens(e.target.value)} className="form-control" placeholder="e.g. Gluten, Dairy, Eggs" />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Product Image</label>
                  {/* Dropdown of all available images */}
                  <select value={newProdImage} onChange={(e) => setNewProdImage(e.target.value)} className="form-control" style={{ marginBottom: '0.5rem' }}>
                    <optgroup label="🎂 Cakes">
                      <option value="/mug_cake.jpg">Mug Cake</option>
                      <option value="/chocolate_mud_messy_cake.jpg">Chocolate Mud Messy Cake</option>
                      <option value="/coconut_cake.jpg">Coconut Cake</option>
                      <option value="/customized_cake_hajj.jpg">Customized Cake (Hajj)</option>
                      <option value="/chocolate_cake.jpg">Chocolate Cake (Generic)</option>
                    </optgroup>
                    <optgroup label="🧁 Cupcakes">
                      <option value="/artisian_special_cupcakes.jpg">Artisian Special Cupcakes</option>
                      <option value="/special_customized_cupcakes.jpg">Special Customized Cupcakes</option>
                      <option value="/disney_princess_cupcakes.jpg">Disney Princess Cupcakes</option>
                      <option value="/customized_different_cupcakes.jpg">Customized Different Cupcakes</option>
                      <option value="/minnie_cupcakes.jpg">Minnie Cupcakes</option>
                      <option value="/strawberry_cupcake.jpg">Strawberry Cupcake</option>
                    </optgroup>
                    <optgroup label="🍪 Cookies">
                      <option value="/special_chocolate_tacos.jpg">Special Chocolate Tacos</option>
                      <option value="/chocolate_cookie_new.jpg">Chocolate Cookie</option>
                      <option value="/lotus_cookie_new.jpg">Lotus Cookie</option>
                      <option value="/chocolate_cookies.jpg">Chocolate Cookies (Generic)</option>
                    </optgroup>
                    <optgroup label="🍞 Breads">
                      <option value="/chocolate_babka_bread.jpg">Chocolate Babka Bread</option>
                      <option value="/cinnamon_rolls.jpg">Cinnamon Rolls</option>
                      <option value="/artisan_bread.jpg">Artisan Bread (Generic)</option>
                    </optgroup>
                  </select>
                  {/* Manual URL override */}
                  <input
                    type="text"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="form-control"
                    placeholder="Or type a custom image path e.g. /my_cake.jpg"
                    style={{ marginBottom: '0.75rem', fontSize: '0.85rem' }}
                  />
                  {/* Live preview */}
                  {newProdImage && (
                    <img
                      src={newProdImage}
                      alt="Preview"
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-cream-dark)' }}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-secondary btn-full">
                  Create Catalog Item
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Panel 4: Manage Coupons */}
        {adminTab === 'coupons' && (
          <div className="animate-fade-in grid custom-cake-grid" style={{ gap: '2.5rem' }}>
            {/* Coupon List */}
            <div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Active Promo Coupons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {coupons.map(c => (
                  <div key={c.code} className="card flex align-center justify-between" style={{ padding: '1.25rem 1.5rem' }}>
                    <div>
                      <span className="badge badge-pink" style={{ fontSize: '0.8rem' }}>{c.code}</span>
                      <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{c.description}</p>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Discount: {c.discount * 100}%</span>
                    </div>
                    <button
                      onClick={() => adminDeleteCoupon(c.code)}
                      style={{ color: '#C62828' }}
                      title="Delete Coupon"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Coupon Form */}
            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Create Promo Code</h3>
              <form onSubmit={handleAddCouponSubmit}>
                <div className="form-group">
                  <label>Coupon Code (Alphanumeric)</label>
                  <input type="text" required value={newCouponCode} onChange={(e) => setNewCouponCode(e.target.value)} className="form-control" placeholder="e.g. BAKE20" style={{ textTransform: 'uppercase' }} />
                </div>
                <div className="form-group">
                  <label>Discount Percentage (%)</label>
                  <input type="number" required value={newCouponDiscount} onChange={(e) => setNewCouponDiscount(e.target.value)} className="form-control" placeholder="e.g. 20" min="1" max="100" />
                </div>
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Description Details</label>
                  <input type="text" required value={newCouponDesc} onChange={(e) => setNewCouponDesc(e.target.value)} className="form-control" placeholder="e.g. 20% discount on summer cakes" />
                </div>
                <button type="submit" className="btn btn-secondary btn-full">
                  Generate Promo Coupon
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Panel 5: Quick Stock sheet */}
        {adminTab === 'inventory' && (
          <div className="animate-fade-in card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem' }}>Inventory Stock & Availability Sheet</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }} className="text-muted">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-cream-dark)', fontWeight: 'bold' }}>
                  <th style={{ padding: '0.8rem' }}>Product Name</th>
                  <th style={{ padding: '0.8rem' }}>Category</th>
                  <th style={{ padding: '0.8rem' }}>Weight</th>
                  <th style={{ padding: '0.8rem' }}>Price</th>
                  <th style={{ padding: '0.8rem' }}>Status</th>
                  <th style={{ padding: '0.8rem' }} className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const isEditing = editingId === p.id;

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
                      <td style={{ padding: '0.8rem', color: 'var(--color-chocolate-dark)', fontWeight: '600' }}>{p.name}</td>
                      <td style={{ padding: '0.8rem' }}>{p.category}</td>
                      <td style={{ padding: '0.8rem' }}>{p.weight}</td>
                      <td style={{ padding: '0.8rem' }}>
                        {isEditing ? (
                          <input
                            type="number"
                            step="1"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="form-control"
                            style={{ padding: '0.2rem 0.5rem', width: '80px', fontSize: '0.85rem' }}
                          />
                        ) : (
                          `PKR ${p.price.toFixed(0)}`
                        )}
                      </td>
                      <td style={{ padding: '0.8rem' }}>
                        {isEditing ? (
                          <select
                            value={editAvailability ? 'true' : 'false'}
                            onChange={(e) => setEditAvailability(e.target.value === 'true')}
                            className="form-control"
                            style={{ padding: '0.2rem 0.5rem', width: '100px', fontSize: '0.85rem' }}
                          >
                            <option value="true">In Stock</option>
                            <option value="false">Sold Out</option>
                          </select>
                        ) : (
                          p.availability ? (
                            <span style={{ color: '#2E7D32', fontWeight: 'bold' }}>In Stock</span>
                          ) : (
                            <span style={{ color: '#C62828', fontWeight: 'bold' }}>Sold Out</span>
                          )
                        )}
                      </td>
                      <td style={{ padding: '0.8rem' }} className="text-right">
                        {isEditing ? (
                          <button
                            onClick={() => handleSaveClick(p)}
                            className="btn btn-secondary btn-sm flex align-center gap-1"
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <Save size={12} /> Save
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditClick(p)}
                            className="btn btn-outline btn-sm flex align-center gap-1"
                            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                          >
                            <Edit3 size={12} /> Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
