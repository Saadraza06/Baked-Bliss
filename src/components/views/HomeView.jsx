import React, { useContext, useEffect, useRef } from 'react';
import { BakeryContext } from '../../context/BakeryContext';
import { Star, Truck, ShieldCheck, Heart, Sparkles, Cake, ChefHat, ShoppingBag, ArrowRight } from 'lucide-react';

export default function HomeView({ setView, setSelectedProductId }) {
  const { products, addToCart, toggleFavoriteProduct, currentUser } = useContext(BakeryContext);

  const bestSellers = products.slice(0, 4);
  const cupcakesOnly = products.filter(p => p.category === 'Cupcakes').slice(0, 2);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let mouse = { x: null, y: null, radius: 120 };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Particle class simulating flour dust/warm golden embers
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 2.5 + 0.8; // fine specs of dust
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -(Math.random() * 0.5 + 0.2); // rise slowly
        this.alpha = Math.random() * 0.4 + 0.15;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.y += this.speedY;
        this.wobble += this.wobbleSpeed;
        
        let dx = 0;
        let dy = 0;
        
        if (mouse.x !== null && mouse.y !== null) {
          const mdx = this.x - mouse.x;
          const mdy = this.y - mouse.y;
          const dist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            dx = (mdx / dist) * force * 1.8;
            dy = (mdy / dist) * force * 1.8;
          }
        }
        
        this.x += this.speedX + Math.sin(this.wobble) * 0.25 + dx;
        this.y += dy;

        // Fade out near the top
        const fadeHeight = height * 0.7;
        if (this.y < fadeHeight) {
          this.alpha = (this.y / fadeHeight) * 0.55;
        }

        if (this.y < 0 || this.x < 0 || this.x > width || this.alpha <= 0.02) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        const hue = 32 + Math.random() * 8; // Warm baking copper/golden tones
        ctx.fillStyle = `hsla(${hue}, 85%, 68%, ${this.alpha})`;
        
        if (this.size > 2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `hsla(${hue}, 85%, 68%, ${this.alpha})`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Soft warm background glowing orbs simulating oven fires or cozy shop lighting
    class Orb {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 120 + 90;
        this.alpha = 0;
        this.alphaTarget = Math.random() * 0.08 + 0.03;
        this.fadeSpeed = Math.random() * 0.001 + 0.0005;
        this.state = 'in';
        this.holdTimer = Math.random() * 400 + 150;
      }

      update() {
        if (this.state === 'in') {
          this.alpha += this.fadeSpeed;
          if (this.alpha >= this.alphaTarget) {
            this.alpha = this.alphaTarget;
            this.state = 'hold';
          }
        } else if (this.state === 'hold') {
          this.holdTimer--;
          if (this.holdTimer <= 0) {
            this.state = 'out';
          }
        } else if (this.state === 'out') {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0) {
            this.alpha = 0;
            this.reset();
          }
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(253, 235, 208, ${this.alpha})`);
        gradient.addColorStop(0.5, `rgba(245, 183, 177, ${this.alpha * 0.35})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());
    const orbs = Array.from({ length: 4 }, () => new Orb());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      orbs.forEach(orb => {
        orb.update();
        orb.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Banner */}
      <section className="hero">
        <div className="hero-bg-image-pan" style={{ backgroundImage: `url('/cake_setup_hero.png')` }}></div>
        <canvas ref={canvasRef} className="hero-particles-canvas"></canvas>
        <div className="container">
          <div className="hero-content">
            <h1>Freshly Baked Daily with Love & Butter</h1>
            <div className="flex gap-3 wrap">
              <button onClick={() => setView('menu')} className="btn btn-primary">
                Shop Our Menu <ShoppingBag size={18} />
              </button>
              <button onClick={() => setView('custom-cake')} className="btn btn-secondary animate-float">
                Design Custom Cake <Cake size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-cream-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>OUR TRADITION</span>
            <h2 className="decorated" style={{ marginTop: '0.5rem' }}>Why Choose Baked Bliss?</h2>
          </div>
          <div className="grid grid-3">
            <div className="card text-center" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--color-pink-light)', color: 'var(--color-chocolate)', marginBottom: '1.5rem' }}>
                <ChefHat size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Handcrafted from Scratch</h3>
              <p className="text-muted">
                No box mixes or artificial preservatives. We whip, fold, and bake everything daily from authentic ingredients.
              </p>
            </div>
            <div className="card text-center" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--color-pink-light)', color: 'var(--color-chocolate)', marginBottom: '1.5rem' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>100% Organic Ingredients</h3>
              <p className="text-muted">
                We source local farm-fresh eggs, organic grass-fed cream, and real unbleached stoneground flours.
              </p>
            </div>
            <div className="card text-center" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--color-pink-light)', color: 'var(--color-chocolate)', marginBottom: '1.5rem' }}>
                <Truck size={32} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Same-Day Delivery</h3>
              <p className="text-muted">
                Craving pastries? We offer warm-from-the-oven home delivery straight to your doorstep in the local area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="flex justify-between align-center wrap gap-3" style={{ marginBottom: '3.5rem' }}>
            <div>
              <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>CELEBRATION HIGHLIGHTS</span>
              <h2 className="decorated-left" style={{ marginTop: '0.5rem' }}>Featured Cupcakes</h2>
            </div>
            <button onClick={() => setView('menu')} className="btn btn-outline">
              View All Products <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-2">
            {cupcakesOnly.map(cake => (
              <div key={cake.id} className="card flex wrap gap-4 align-center" style={{ padding: '2rem' }}>
                <div style={{ flex: '1', minWidth: '220px' }}>
                  <img
                    src={cake.images[0]}
                    alt={cake.name}
                    style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/chocolate_cake.jpg';
                    }}
                  />
                </div>
                <div style={{ flex: '1.2', minWidth: '240px' }}>
                  <span className="badge badge-pink" style={{ marginBottom: '0.5rem' }}>{cake.flavour}</span>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{cake.name}</h3>
                  <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>{cake.description}</p>
                  <div className="flex align-center gap-1" style={{ marginBottom: '0.75rem' }}>
                    <div className="rating-stars">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>(5.0)</span>
                  </div>
                  <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-chocolate)' }}>PKR {cake.price.toFixed(0)}</span>
                    <button
                      onClick={() => {
                        setSelectedProductId(cake.id);
                        setView('product-details');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Special Banner */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--color-pink-light) 0%, var(--color-cream-dark) 100%)', borderTop: '1px solid rgba(198, 134, 66, 0.1)', borderBottom: '1px solid rgba(198, 134, 66, 0.1)' }}>
        <div className="container">
          <div className="flex wrap gap-4 align-center justify-between">
            <div style={{ maxWidth: '600px' }}>
              <div className="flex align-center gap-2" style={{ color: 'var(--color-chocolate)', marginBottom: '0.5rem' }}>

                <span style={{ fontWeight: '600', fontFamily: 'var(--font-subheading)' }}>TODAY'S SWEET SPECIAL</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Custom Anniversary & Birthday Cake Packages</h2>

              <button onClick={() => setView('custom-cake')} className="btn btn-primary">
                Customize Your Cake Now
              </button>
            </div>
            <div style={{ width: '400px', height: '500px', overflow: 'hidden', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
              <img src="/chocolate_mud_messy_cake.jpg" alt="Chocolate Mud Messy Cake" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>CUSTOMER FAVORITES</span>
            <h2 className="decorated" style={{ marginTop: '0.5rem' }}>Our Best Selling Products</h2>
          </div>
          <div className="grid grid-4">
            {bestSellers.map(product => (
              <div key={product.id} className="card flex flex-col justify-between" style={{ padding: '1rem' }}>
                <div className="product-image-container">
                  <button
                    onClick={() => toggleFavoriteProduct(product.id)}
                    className={`favorite-btn ${currentUser?.favoriteProducts?.includes(product.id) ? 'favorited' : ''}`}
                    title="Add to Favorites"
                  >
                    <Heart size={18} fill={currentUser?.favoriteProducts?.includes(product.id) ? 'currentColor' : 'none'} />
                  </button>
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    onClick={() => { setSelectedProductId(product.id); setView('product-details'); }} 
                    style={{ cursor: 'pointer' }} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/chocolate_cake.jpg';
                    }}
                  />
                </div>
                <div>
                  <span className="text-muted" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-subheading)' }}>{product.category}</span>
                  <h4
                    onClick={() => { setSelectedProductId(product.id); setView('product-details'); }}
                    style={{ fontSize: '1.05rem', margin: '0.3rem 0 0.5rem', cursor: 'pointer', height: '2.4rem', overflow: 'hidden' }}
                  >
                    {product.name}
                  </h4>
                  <div className="flex align-center gap-1" style={{ marginBottom: '1rem' }}>
                    <div className="rating-stars">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>({product.reviews?.length || 0})</span>
                  </div>
                </div>
                <div className="flex justify-between align-center" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '0.8rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '1.15rem', color: 'var(--color-chocolate)' }}>PKR {product.price.toFixed(2)}</span>
                  <button onClick={() => addToCart(product, 1)} className="btn btn-secondary btn-sm" style={{ padding: '0.4rem 0.8rem' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <button onClick={() => setView('menu')} className="btn btn-outline" style={{ padding: '0.8rem 2.5rem' }}>
              Explore Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-cream-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <span className="text-brown" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '600' }}>WORDS FROM THE LOVERS</span>
            <h2 className="decorated" style={{ marginTop: '0.5rem' }}>What Our Happy Customers Say</h2>
          </div>
          <div className="grid grid-3">
            <div className="card flex flex-col justify-between" style={{ padding: '2rem' }}>
              <div>
                <div className="rating-stars" style={{ marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "We ordered our wedding cake here and it was absolutely magnificent! Everyone complimented the design and the delicious fresh raspberry chocolate truffle flavor. Highly recommended!"
                </p>
              </div>
              <div className="flex align-center gap-2" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-chocolate)' }}>S</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Sarah & David</h4>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Local Customers</span>
                </div>
              </div>
            </div>
            <div className="card flex flex-col justify-between" style={{ padding: '2rem' }}>
              <div>
                <div className="rating-stars" style={{ marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "The sourdough bread here is out of this world! Crunchy, tangy, and perfect for morning toast. I buy a loaf every Wednesday without fail. It is a local treasure."
                </p>
              </div>
              <div className="flex align-center gap-2" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-chocolate)' }}>A</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Ali Haider</h4>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Weekly Buyer</span>
                </div>
              </div>
            </div>
            <div className="card flex flex-col justify-between" style={{ padding: '2rem' }}>
              <div>
                <div className="rating-stars" style={{ marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-muted" style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "The online customizer made designing a birthday cake so simple. I uploaded an inspiration photo, chose red velvet and white chocolate icing, and it arrived exactly as requested!"
                </p>
              </div>
              <div className="flex align-center gap-2" style={{ borderTop: '1px solid var(--color-cream-dark)', paddingTop: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-chocolate)' }}>A</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Amina Khan</h4>
                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>Local Parent</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <button onClick={() => setView('reviews')} className="btn btn-outline btn-sm">
              Read More Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section style={{ padding: '4rem 3rem', backgroundColor: 'var(--color-cream)', border: '2px dashed var(--color-pink)', borderRadius: 'var(--radius-xl)' }} className="container">
        <div className="flex wrap align-center justify-between gap-4">
          <div style={{ flex: '1.2', minWidth: '300px' }}>
            <span className="text-pink" style={{ fontFamily: 'var(--font-subheading)', fontWeight: '700', letterSpacing: '2px' }}>BAKED BLISS REWARDS</span>
            <h2 style={{ color: 'var(--color-chocolate-dark)', fontSize: '2.6rem', marginTop: '0.5rem', marginBottom: '1rem' }}>Sweet Perks Await!</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Join our exclusive loyalty program to earn points on every pastry, get a complimentary custom cake on your birthday, and enjoy early VIP access to our seasonal holiday menus.
            </p>
            <button onClick={() => setView('account')} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Join Now for Free
            </button>
          </div>
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', gap: '1rem' }}>
            <img src="/coconut_cake.jpg" alt="Coconut Cake" style={{ width: '50%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', marginTop: '2rem', boxShadow: 'var(--shadow-md)' }} />
            <img src="/cinnamon_rolls.jpg" alt="Cinnamon Rolls" style={{ width: '50%', height: '240px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }} />
          </div>
        </div>
      </section>
    </div>
  );
}
