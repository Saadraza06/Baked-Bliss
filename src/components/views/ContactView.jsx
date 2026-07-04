import React, { useState } from 'react';
import { Phone, Send } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactView({ setView }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${name}! Your contact message has been sent. We will get back to you within 24 hours.`);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem' }}>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>TALK TO US</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Contact Our Team</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Have general inquiries, wedding cake consultation requests, or feedback? Drop us a message, and we'll reply shortly.
        </p>
      </div>

      <div className="grid grid-2" style={{ gap: '3rem', marginBottom: '4rem' }}>
        {/* Left Column: Form Card */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'var(--color-chocolate-dark)' }}>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
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
                placeholder="e.g. name@example.com"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Wedding Cake Consultation"
                className="form-control"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label>Message details</label>
              <textarea
                rows="4"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message details here..."
                className="form-control"
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-full flex align-center justify-center gap-2">
              Send Message <Send size={16} />
            </button>
          </form>
        </div>

        {/* Right Column: Address and Socials */}
        <div className="flex flex-col justify-between" style={{ gap: '2rem' }}>
          {/* Quick Info cards */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }} className="flex align-center gap-2">
              <Phone className="text-brown" /> Phone Support
            </h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              📞 Call: 03290747880<br />
              💬 WhatsApp Support: 03290747880
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }} className="flex align-center gap-2">
              <InstagramIcon className="text-pink" /> Instagram Page
            </h3>
            <p className="text-muted" style={{ fontSize: '0.95rem' }}>
              📸 Instagram ID: <a href="https://www.instagram.com/baked_bliss_by_amna" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>@baked_bliss_by_amna</a>
            </p>
          </div>


          {/* Social media connections */}
          <div className="card text-center" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Follow Our Socials</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              We post fresh baking videos, cake styling reels, and flash discount announcements daily!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/baked_bliss_by_amna"
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn"
                title="Follow us on Instagram @baked_bliss_by_amna"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  color: '#fff',
                  borderRadius: '2rem',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(220,39,67,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(220,39,67,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(220,39,67,0.35)'; }}
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="20" width="20">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
                @baked_bliss_by_amna
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
