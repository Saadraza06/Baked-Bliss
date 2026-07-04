import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    question: 'How long does delivery take?',
    answer: 'Standard bakery deliveries take between 45 to 120 minutes depending on your delivery zone. Zone A (Gulberg & DHA) usually arrives within an hour, whereas Johar Town might take up to 2 hours. For custom wedding and birthday cake orders, we deliver at your scheduled date and selected time slot.'
  },
  {
    question: 'Can I customize cakes?',
    answer: 'Yes, absolutely! We offer a dedicated Custom Cake Builder page where you can choose the cake size (1.0kg, 1.5kg, 2.0kg), shape (round, square, heart-shaped), flavor, frosting type, and thematic decorations. You can also write a customized lettering message and upload an inspiration reference image.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We support multiple payment methods for maximum convenience: Credit/Debit Cards (Visa, Mastercard), Cash on Delivery, and popular Pakistani mobile wallets including JazzCash and Easypaisa.'
  },
  {
    question: 'Do you offer same-day delivery?',
    answer: 'Yes! We offer same-day delivery on all standard menu products (cupcakes, cookies, standard breads, and simple pre-made cakes) provided you place your order before 4:00 PM, Monday through Saturday. Custom design cakes require a minimum of 48 hours notice.'
  },
  {
    question: 'How do I cancel an order?',
    answer: 'You can cancel standard bakery orders up to 1 hour before their scheduled delivery. Custom cake orders must be cancelled at least 24 hours in advance to receive a full refund, as our bakers begin custom decorations ahead of schedule. Please contact support at +92 300 9876543 for instant cancellations.'
  },
  {
    question: 'Are your products allergen-free?',
    answer: 'Our individual product detail pages include a list of ingredients and warnings for key allergens (Gluten, Dairy, Eggs, Nuts). While we take strict measures to prevent cross-contamination, all our products are prepared in a kitchen that handles wheat, milk, eggs, and nuts. If you have severe allergies, please notify us in the order notes.'
  }
];

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>
      {/* Title */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>FREQUENT QUESTIONS</span>
        <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Have questions about orders, customization times, or payment safety? Browse our answers below or contact support.
        </p>
      </div>

      {/* Accordion Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="card"
              style={{
                padding: '0',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: isOpen ? '1.5px solid var(--color-light-brown)' : '1px solid var(--color-cream-dark)',
                boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)'
              }}
            >
              {/* Question Header */}
              <div
                onClick={() => toggleFaq(idx)}
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: isOpen ? 'var(--color-pink-light)' : 'var(--color-white)',
                  transition: 'var(--transition-fast)'
                }}
              >
                <h4 style={{ fontSize: '1.05rem', margin: '0', color: 'var(--color-chocolate-dark)' }} className="flex align-center gap-2">
                  <HelpCircle size={18} className="text-brown" /> {faq.question}
                </h4>
                <div>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Answer Body */}
              {isOpen && (
                <div
                  style={{
                    padding: '1.5rem',
                    borderTop: '1.5px solid var(--color-cream-dark)',
                    backgroundColor: 'var(--color-cream-light)',
                    fontSize: '0.92rem',
                    color: 'var(--color-text-muted)',
                    animation: 'fadeInUp 0.25s ease'
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
