import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function LocationView({ setView }) {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>OUR OUTLET</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Find Our Bakery</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Stop by our cozy café and bakery outlet to enjoy hot bakes directly from the brick ovens, paired with artisanal coffees.
        </p>
      </div>

      {/* Grid: Details & Map */}
      <div className="grid grid-2" style={{ gap: '3rem', marginBottom: '4rem' }}>
        {/* Contact Info and Opening Hours */}
        <div className="flex flex-col justify-between" style={{ gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }} className="flex align-center gap-2">
              <MapPin className="text-brown" /> Our Address
            </h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              12 Bakery Lane, Main Boulevard Gulberg III,<br />
              Faisalabad, Punjab, Pakistan
            </p>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              <strong>Landmark:</strong> Opposite Gulberg Galleria, next to Coffee Bean.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }} className="flex align-center gap-2">
              <Clock className="text-pink" /> Opening Hours
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }} className="text-muted">
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
                  <td style={{ padding: '0.6rem 0', fontWeight: '600' }}>Monday - Thursday</td>
                  <td style={{ padding: '0.6rem 0' }}>8:00 AM - 10:00 PM</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
                  <td style={{ padding: '0.6rem 0', fontWeight: '600' }}>Friday - Saturday</td>
                  <td style={{ padding: '0.6rem 0' }}>8:00 AM - 11:30 PM</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.6rem 0', fontWeight: '600' }}>Sunday</td>
                  <td style={{ padding: '0.6rem 0' }}>9:00 AM - 9:00 PM (Brunch Special)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }} className="flex align-center gap-2">
              <Phone className="text-brown" /> Quick Contact
            </h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              📞 <strong>Hotline:</strong> 03290747880<br />
              📸 <strong>Instagram:</strong> <a href="https://www.instagram.com/baked_bliss_by_amna" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>@baked_bliss_by_amna</a>
            </p>
          </div>
        </div>

        {/* Mock Google Map */}
        <div className="map-mockup">
          {/* Mock Map Background grid/art */}
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(var(--color-cream-dark) 20%, transparent 20%), radial-gradient(var(--color-cream-dark) 20%, transparent 20%)',
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0, 15px 15px',
              backgroundColor: '#ECEFF1',
              position: 'relative'
            }}
          >
            {/* Draw some mock roads */}
            <div style={{ position: 'absolute', top: '150px', left: '0', width: '100%', height: '30px', backgroundColor: '#FFFFFF', transform: 'rotate(-5deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}></div>
            <div style={{ position: 'absolute', top: '0', left: '200px', width: '40px', height: '100%', backgroundColor: '#FFFFFF', transform: 'rotate(10deg)', boxShadow: '2px 0 4px rgba(0,0,0,0.05)' }}></div>
            
            {/* Map Pin Marker */}
            <div
              className="animate-float"
              style={{
                position: 'absolute',
                top: '135px',
                left: '215px',
                color: '#C62828',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: '5'
              }}
            >
              <MapPin size={40} fill="#C62828" style={{ color: '#FFFFFF' }} />
              <div style={{ backgroundColor: 'var(--color-chocolate-dark)', color: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', marginTop: '2px' }}>
                Baked Bliss Bakery
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact CTA */}
      <div className="text-center">
        <p className="text-muted" style={{ marginBottom: '1rem' }}>Have questions about a custom cake order, or feedback for us?</p>
        <button onClick={() => setView('contact')} className="btn btn-outline btn-sm">
          Get in Touch
        </button>
      </div>
    </div>
  );
}
