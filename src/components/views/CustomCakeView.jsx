import React, { useState, useContext, useRef } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Calendar, Upload, Sparkles, Check, Wallet, Banknote } from 'lucide-react';

// Owner's WhatsApp number
const OWNER_WHATSAPP = '923008749322';

const sendCustomCakeToWhatsApp = (order, details) => {
  const lines = [
    '🎂 *CUSTOM CAKE ORDER — Baked Bliss*',
    `🆔 Order ID: ${order.id}`,
    `📅 Date: ${order.date}`,
    '',
    '👤 *Customer Details*',
    `  Name: ${order.customer?.name || 'N/A'}`,
    `  Phone: ${order.customer?.phone || 'N/A'}`,
    `  Email: ${order.customer?.email || 'N/A'}`,
    '',
    '🎨 *Cake Specifications*',
    `  Size: ${details.size}`,
    `  Shape: ${details.shape}`,
    `  Flavour: ${details.flavour}`,
    `  Frosting: ${details.frosting}`,
    `  Theme: ${details.theme}`,
    details.message ? `  Message on Cake: "${details.message}"` : null,
    '',
    '🏠 *Delivery Info*',
    `  Address: ${details.deliveryAddress}`,
    `  Delivery Date: ${details.deliveryDate}`,
    details.specialInstructions ? `  Special Instructions: ${details.specialInstructions}` : null,
    '',
    '💰 *Payment Summary*',
    `  Subtotal: PKR ${order.subtotal?.toFixed(0)}`,
    `  Delivery Fee: PKR ${order.deliveryFee?.toFixed(0)}`,
    `  *TOTAL: PKR ${order.total?.toFixed(0)}*`,
    `  Payment Method: ${order.paymentMethod}`,

    '',
    '✅ Please confirm this custom cake order with the customer.'
  ].filter(line => line !== null).join('\n');

  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(lines)}`;
  window.open(url, '_blank');
};

export default function CustomCakeView({ setView }) {
  const { addCustomCakeOrder, currentUser, showToast } = useContext(BakeryContext);

  const [size, setSize] = useState('1.0 kg');
  const [shape, setShape] = useState('Round');
  const [flavour, setFlavour] = useState('Chocolate Truffle');
  const [frosting, setFrosting] = useState('Buttercream');
  const [theme, setTheme] = useState('Birthday');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [inspirationImage, setInspirationImage] = useState('');
  const [inspirationFileName, setInspirationFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod] = useState('Cash on Delivery');

  const fileInputRef = useRef(null);

  // Customer guest details if not logged in
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');

  // Live pricing
  const basePrice = size === '2.0 kg' ? 6000 : size === '1.5 kg' ? 4500 : 3000;
  const premiumFrosting = frosting === 'Chocolate Ganache' ? 500 : 300;
  const total = basePrice + premiumFrosting;

  // Real Upload & File Reader handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setInspirationFileName(file.name);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);

          const reader = new FileReader();
          reader.onloadend = () => {
            setInspirationImage(reader.result);
            showToast('Inspiration image uploaded successfully!', 'success');
          };
          reader.readAsDataURL(file);

          return 100;
        }
        return prev + 30;
      });
    }, 120);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deliveryDate) {
      alert('Please choose a delivery date.');
      return;
    }

    if (!deliveryAddress) {
      alert('Please enter your delivery address.');
      return;
    }


    const orderDetails = {
      size,
      shape,
      flavour,
      frosting,
      theme,
      message,
      deliveryDate,
      specialInstructions,
      inspirationImage: inspirationImage || '/chocolate_cake.jpg',
      name,
      email,
      phone,
      deliveryAddress,
      paymentMethod
    };

    const newOrder = addCustomCakeOrder(orderDetails);
    // 🚀 Send custom cake order to owner's WhatsApp!
    if (newOrder) {
      sendCustomCakeToWhatsApp(newOrder, orderDetails);
    }
    setView('billing'); // Redirect directly to the invoice page for their custom cake order!
  };

  return (
    <div className="animate-fade-in container" style={{ padding: '3rem 1.5rem' }}>
      {/* Page Title */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>CREATIVE STUDIO</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Design Your Custom Cake</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Have a vision for your special day? Choose your sizes, shapes, flavors, and frosting, or upload an inspiration photo. Our master bakers will bring it to life!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="custom-cake-grid">
        {/* Left Column: Form Fields */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '2rem' }}>Cake Specifications</h2>

          {/* Size Select */}
          <div className="form-group">
            <label>Cake Size</label>
            <div className="flex gap-2 wrap">
              {['1.0 kg (Serves 8-10)', '1.5 kg (Serves 12-15)', '2.0 kg (Serves 18-22)'].map(s => {
                const value = s.split(' ')[0] + ' ' + s.split(' ')[1];
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(value)}
                    className="btn btn-outline btn-sm"
                    style={{
                      flex: '1',
                      minWidth: '130px',
                      backgroundColor: size === value ? 'var(--color-light-brown)' : 'transparent',
                      color: size === value ? 'var(--color-white)' : 'var(--color-chocolate)'
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Shape Select */}
          <div className="form-group">
            <label>Cake Shape</label>
            <select value={shape} onChange={(e) => setShape(e.target.value)} className="form-control">
              <option value="Round">Classic Round</option>
              <option value="Square">Modern Square</option>
              <option value="Heart-shaped">Romantic Heart-shaped</option>
            </select>
          </div>

          {/* Flavour & Frosting row */}
          <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Cake Flavour</label>
              <select value={flavour} onChange={(e) => setFlavour(e.target.value)} className="form-control">
                <option value="Chocolate Truffle">Chocolate Truffle (Rich)</option>
                <option value="Vanilla Sponge">Vanilla Sponge (Light & Fruity)</option>
                <option value="Red Velvet">Classic Red Velvet</option>
                <option value="Strawberry Dream">Strawberry Cream</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Frosting Style</label>
              <select value={frosting} onChange={(e) => setFrosting(e.target.value)} className="form-control">
                <option value="Buttercream">Sweet Buttercream</option>
                <option value="Cream Cheese">Velvety Cream Cheese</option>
                <option value="Chocolate Ganache">Rich Chocolate Ganache (+ PKR 500)</option>
                <option value="Whipped Cream">Fresh Light Whipped Cream</option>
              </select>
            </div>
          </div>

          {/* Theme & Message row */}
          <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Cake Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="form-control">
                <option value="Birthday">Birthday Party</option>
                <option value="Wedding">Elegant Wedding</option>
                <option value="Anniversary">Anniversary Celebration</option>
                <option value="Baby Shower">Baby Shower / Gender Reveal</option>
                <option value="Custom Graphic">Custom Theme (Specify Below)</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '0' }}>
              <label>Message on Cake (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Happy 30th Birthday Sara!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* Delivery Date */}
          <div className="form-group">
            <label>Delivery / Pick-Up Date</label>
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                required
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="form-control"
                min={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]} // Min 2 days notice
              />
            </div>
            <small className="text-muted">Note: Custom cakes require at least 48 hours preparation time.</small>
          </div>

          {/* Upload inspiration image */}
          <div className="form-group">
            <label>Upload Inspiration Image (Optional)</label>
            <div
              style={{
                border: '2.5px dashed var(--color-cream-dark)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'center',
                backgroundColor: 'var(--color-cream-light)'
              }}
            >
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {inspirationImage ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '2px solid var(--color-cream-dark)' }}>
                    <img
                      src={inspirationImage}
                      alt="Inspiration Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex align-center justify-center gap-2" style={{ color: '#2E7D32', fontSize: '0.9rem' }}>
                    <Check size={18} />
                    <span>Attached: <strong>{inspirationFileName || 'inspiration.jpg'}</strong></span>
                    <button
                      type="button"
                      onClick={() => {
                        setInspirationImage('');
                        setInspirationFileName('');
                        setUploadProgress(0);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="text-pink"
                      style={{ fontSize: '0.85rem', marginLeft: '0.75rem', textDecoration: 'underline', fontWeight: '600' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload size={24} className="text-muted" style={{ margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }} className="text-muted">
                    Have a reference photo of the design? Click upload to attach.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="btn btn-secondary btn-sm"
                  >
                    {uploadProgress > 0 && uploadProgress < 100 ? `Uploading (${uploadProgress}%)` : 'Select Inspiration Photo'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Special instructions */}
          <div className="form-group">
            <label>Special Decoration Instructions</label>
            <textarea
              rows="3"
              placeholder="Tell us about the colors, style, flower details, toppers, or dietary modifications..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="form-control"
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          {/* Delivery Address */}
          <div className="form-group">
            <label>Delivery Address</label>
            <textarea
              rows="3"
              required
              placeholder="Enter your full delivery address (House No., Street, Area, City)..."
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="form-control"
              style={{ resize: 'vertical' }}
            ></textarea>
          </div>

          {/* Payment Method */}
          <div className="form-group" style={{ marginBottom: '2rem' }}>
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
                <p style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--color-chocolate-dark)', marginBottom: '0.2rem' }}>Cash on Delivery</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>You'll pay in cash when your order is delivered. No online payment is required.</p>
              </div>
            </div>
          </div>

          {/* Guest fields if not logged in */}
          {!currentUser && (
            <div style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Your Contact Information</h3>
              <div className="grid grid-2" style={{ gap: '1rem' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter contact number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Pricing & Summary */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div className="card" style={{ padding: '2.5rem', border: '2px solid var(--color-light-brown)' }}>
            <div className="flex align-center gap-1 text-brown" style={{ marginBottom: '0.5rem' }}>
              <img src="/logo.png" alt="Website Logo" style={{ height: '24px', width: 'auto' }} />
              <span style={{ fontWeight: '600', fontFamily: 'var(--font-subheading)', fontSize: '0.85rem' }}>ORDER SUMMARY</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Custom Design Estimate</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid var(--color-cream-dark)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="flex justify-between">
                <span className="text-muted">Base Cake ({size})</span>
                <span style={{ fontWeight: '500' }}>PKR {basePrice.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shape selection ({shape})</span>
                <span style={{ color: '#2E7D32', fontWeight: '500' }}>Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Flavor profile ({flavour})</span>
                <span style={{ color: '#2E7D32', fontWeight: '500' }}>Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Frosting style ({frosting})</span>
                <span style={{ fontWeight: '500' }}>{frosting === 'Chocolate Ganache' ? '+PKR 500' : '+PKR 300'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Message lettering</span>
                <span style={{ color: '#2E7D32', fontWeight: '500' }}>Free</span>
              </div>
            </div>

            <div className="flex justify-between align-center" style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-chocolate-dark)' }}>Estimated Subtotal</span>
              <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--color-chocolate)' }}>PKR {total.toFixed(0)}</span>
            </div>

            <button type="submit" className="btn btn-primary btn-full" style={{ padding: '1rem' }}>
              Confirm Custom Design
            </button>
            <p className="text-center text-muted" style={{ fontSize: '0.75rem', marginTop: '1rem' }}>
              *Final prices may vary slightly based on highly complex designs. Delivery will be added during billing.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
