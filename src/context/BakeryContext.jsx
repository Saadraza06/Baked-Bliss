import React, { createContext, useState, useEffect } from 'react';

export const BakeryContext = createContext();

const MENU_VERSION = 'v18';

const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Mug Cake',
    category: 'Cakes',
    price: 980,
    weight: '1 piece',
    flavour: 'Vanilla Cream',
    availability: true,
    description: 'A charming mug-shaped cake decorated with smooth white fondant and adorable red heart details. Perfect for Valentine\'s Day, anniversaries, or any special occasion.',
    ingredients: 'Vanilla Sponge, Fondant, Buttercream, Red Edible Hearts, Sugar Decorations',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/mug_cake.jpg'],
    reviews: []
  },
  {
    id: 'p2',
    name: 'Artisian Special Cupcakes',
    category: 'Cupcakes',
    price: 420,
    weight: '1 piece',
    flavour: 'Vanilla Cream',
    availability: true,
    description: 'Creative and colorful artisian special cupcakes topped with smooth white buttercream and vibrant fondant color circles with a paintbrush topper. A unique treat for art lovers and creative celebrations!',
    ingredients: 'Vanilla Sponge, White Buttercream, Colored Fondant Discs, Sugar Brush Decorations, Edible Colors',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/artisian_special_cupcakes.jpg'],
    reviews: []
  },
  {
    id: 'p3',
    name: 'Chocolate Mud Messy Cake',
    category: 'Cakes',
    price: 1870,
    weight: '1 kg',
    flavour: 'Chocolate',
    availability: true,
    description: 'A rich, indulgent chocolate mud cake covered in luscious chocolate ganache swirls, adorned with gold star sprinkles and a Happy Birthday topper. The ultimate treat for chocolate lovers!',
    ingredients: 'Chocolate Sponge, Chocolate Ganache, Butter, Cocoa Powder, Gold Star Sprinkles, Sugar',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/chocolate_mud_messy_cake.jpg'],
    reviews: []
  },
  {
    id: 'p4',
    name: 'Special Customized Cupcakes',
    category: 'Cupcakes',
    price: 420,
    weight: '6 pieces',
    flavour: 'Chocolate & Vanilla',
    availability: true,
    description: 'Elegant customized cupcakes featuring gold leaf accents, chocolate frosting, personalized messaging, and classic birthday greetings. Pack of 6.',
    ingredients: 'Cocoa Sponge, Vanilla Buttercream, Gold Leaf, Fondant, Gold Pearls, Sugar',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/special_customized_cupcakes.jpg'],
    reviews: []
  },
  {
    id: 'p5',
    name: 'Chocolate Babka Bread',
    category: 'Breads',
    price: 690,
    weight: '1 loaf',
    flavour: 'Chocolate Cinnamon',
    availability: true,
    description: 'A beautifully braided, sweet yeast bread swirled with a rich chocolate filling and finished with a shiny sugar syrup glaze.',
    ingredients: 'Wheat Flour, Yeast, Cocoa, Chocolate Chips, Butter, Sugar, Cinnamon',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/chocolate_babka_bread.jpg'],
    reviews: []
  },
  {
    id: 'p6',
    name: 'Special Chocolate Tacos',
    category: 'Cookies',
    price: 280,
    weight: '1 piece',
    flavour: 'Chocolate Fudge',
    availability: true,
    description: 'Unique chocolate tacos featuring soft folded chocolate sponge shells filled with rich whipped chocolate ganache and topped with a crispy chocolate cookie.',
    ingredients: 'Chocolate Sponge, Cocoa Powder, Buttercream, Chocolate Cookie, Sugar',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/special_chocolate_tacos.jpg'],
    reviews: []
  },
  {
    id: 'p7',
    name: 'Disney Princess Cupcake',
    category: 'Cupcakes',
    price: 420,
    weight: '1 piece',
    flavour: 'Assorted Flavours',
    availability: true,
    description: 'Magical Disney Princess cupcakes with vibrant colored buttercream swirls and princess character toppers. Available in Cinderella blue, Belle yellow, Ariel pink and more!',
    ingredients: 'Vanilla Sponge, Buttercream, Food Color, Princess Toppers, Sugar, Eggs, Butter',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/disney_princess_cupcakes.jpg'],
    reviews: []
  },
  {
    id: 'p8',
    name: 'Chocolate Cookie',
    category: 'Cookies',
    price: 180,
    weight: '1 piece',
    flavour: 'Double Chocolate Fudge',
    availability: true,
    description: 'Rich, soft-baked chocolate cookies loaded with chocolate chips and chocolate chunks. Super gooey in the center with a crinkly top.',
    ingredients: 'Wheat Flour, Cocoa Powder, Butter, Brown Sugar, Chocolate Chips, Eggs, Vanilla',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/chocolate_cookie_new.jpg'],
    reviews: []
  },
  {
    id: 'p9',
    name: 'Lotus cookie',
    category: 'Cookies',
    price: 180,
    weight: '1 piece',
    flavour: 'Lotus Biscoff Caramel',
    availability: true,
    description: 'Thick, gooey cookie packed with rich Biscoff caramel flavor, topped with a signature Lotus biscuit.',
    ingredients: 'Biscoff Spread, Wheat Flour, Brown Sugar, Butter, Eggs, Lotus Biscuit, Vanilla',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/lotus_cookie_new.jpg'],
    reviews: []
  },
  {
    id: 'p10',
    name: 'Cinnamon Rolls',
    category: 'Breads',
    price: 120,
    weight: '1 piece',
    flavour: 'Cinnamon Glaze',
    availability: true,
    description: 'Warm, fluffy, fresh-baked cinnamon rolls swirled with sweet cinnamon sugar and drizzled with smooth vanilla cream cheese glaze.',
    ingredients: 'Wheat Flour, Butter, Brown Sugar, Cinnamon, Cream Cheese, Yeast, Eggs, Milk',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/cinnamon_rolls.jpg'],
    reviews: []
  },
  {
    id: 'p11',
    name: 'Coconut Cake',
    category: 'Cakes',
    price: 120,
    weight: '1 piece',
    flavour: 'Coconut Vanilla',
    availability: true,
    description: 'A classic, moist bundt cake packed with sweet coconut flavor and dusted with fine shredded coconut on top.',
    ingredients: 'Wheat Flour, Shredded Coconut, Coconut Milk, Butter, Sugar, Eggs, Vanilla Extract',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/coconut_cake.jpg'],
    reviews: []
  },
  {
    id: 'p12',
    name: 'Customized Cake',
    category: 'Cakes',
    price: 2000,
    weight: '1 kg',
    flavour: 'Vanilla Caramel',
    availability: true,
    description: 'A beautiful, custom-designed white frosted cake featuring gold sprinkles and an elegant "Hajj Mubarak" topper.',
    ingredients: 'Wheat Flour, Butter, Sugar, Cream, Vanilla, Gold Sprinkles, Fondant Topper',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/customized_cake_hajj.jpg'],
    reviews: []
  },
  {
    id: 'p13',
    name: 'Customized Different cupcakes',
    category: 'Cupcakes',
    price: 1500,
    weight: '6 pieces',
    flavour: 'Chocolate & Vanilla',
    availability: true,
    description: 'A beautiful set of 6 customized cupcakes with elegant Ramadan Kareem fondant decorations, gold calligraphy, and festive icons.',
    ingredients: 'Wheat Flour, Cocoa, Sugar, Butter, Eggs, Fondant Toppers, Edible Gold Calligraphy',
    allergens: 'Gluten, Dairy, Eggs',
    images: ['/customized_different_cupcakes.jpg'],
    reviews: []
  }
];

const DEFAULT_COUPONS = [
  { code: 'BAKE10', discount: 0.10, description: 'Save 10% on your bakery order' },
  { code: 'WELCOME15', discount: 0.15, description: 'Welcome offer - 15% discount' },
  { code: 'FREESHIP', discount: 0.00, freeShipping: true, description: 'Free shipping on orders' }
];

export const BakeryProvider = ({ children }) => {
  // Version-based reset: if menu version changed, clear stale product/coupon cache
  if (localStorage.getItem('bakery_menu_version') !== MENU_VERSION) {
    localStorage.removeItem('bakery_products');
    localStorage.removeItem('bakery_cart');
    localStorage.removeItem('bakery_coupons');
    localStorage.setItem('bakery_menu_version', MENU_VERSION);
  }

  // Load state from local storage or defaults
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('bakery_products');
    return local ? JSON.parse(local) : DEFAULT_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const local = localStorage.getItem('bakery_cart');
    return local ? JSON.parse(local) : [];
  });

  const [orders, setOrders] = useState(() => {
    const local = localStorage.getItem('bakery_orders');
    return local ? JSON.parse(local) : [];
  });

  const [coupons, setCoupons] = useState(() => {
    const local = localStorage.getItem('bakery_coupons');
    return local ? JSON.parse(local) : DEFAULT_COUPONS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const local = localStorage.getItem('bakery_user');
    return local ? JSON.parse(local) : null;
  });

  const [activeCoupon, setActiveCoupon] = useState(null);
  const [toastNotification, setToastNotification] = useState(null);
  const [currentOrderTrackingId, setCurrentOrderTrackingId] = useState(null);
  const [deliveryCity, setDeliveryCity] = useState('Faisalabad');

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('bakery_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bakery_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bakery_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('bakery_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Sync state across multiple tabs/windows in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'bakery_orders') {
        try {
          setOrders(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error("Error parsing synced orders:", err);
        }
      }
      if (e.key === 'bakery_products') {
        try {
          setProducts(e.newValue ? JSON.parse(e.newValue) : DEFAULT_PRODUCTS);
        } catch (err) {
          console.error("Error parsing synced products:", err);
        }
      }
      if (e.key === 'bakery_cart') {
        try {
          setCart(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (err) {
          console.error("Error parsing synced cart:", err);
        }
      }
      if (e.key === 'bakery_coupons') {
        try {
          setCoupons(e.newValue ? JSON.parse(e.newValue) : DEFAULT_COUPONS);
        } catch (err) {
          console.error("Error parsing synced coupons:", err);
        }
      }
      if (e.key === 'bakery_user') {
        try {
          setCurrentUser(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (err) {
          console.error("Error parsing synced user:", err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Utility toast
  const showToast = (message, type = 'info') => {
    setToastNotification({ message, type });
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // Cart operations
  const addToCart = (product, quantity = 1, flavour = '', weight = '') => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.flavour === flavour && item.weight === weight
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        showToast(`Updated quantity of ${product.name} in cart!`, 'success');
        return newCart;
      } else {
        showToast(`${product.name} added to cart!`, 'success');
        return [...prevCart, { product, quantity, flavour: flavour || product.flavour, weight: weight || product.weight }];
      }
    });
  };

  const updateCartQuantity = (productId, quantity, flavour, weight) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => !(item.product.id === productId && item.flavour === flavour && item.weight === weight));
      }
      return prevCart.map(item => 
        (item.product.id === productId && item.flavour === flavour && item.weight === weight)
          ? { ...item, quantity }
          : item
      );
    });
  };

  const removeFromCart = (productId, flavour, weight) => {
    setCart(prevCart => {
      const item = prevCart.find(i => i.product.id === productId && i.flavour === flavour && i.weight === weight);
      if (item) {
        showToast(`${item.product.name} removed from cart.`, 'info');
      }
      return prevCart.filter(i => !(i.product.id === productId && i.flavour === flavour && i.weight === weight));
    });
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const applyCoupon = (code) => {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (coupon) {
      setActiveCoupon(coupon);
      showToast(`Coupon "${coupon.code}" applied!`, 'success');
      return true;
    } else {
      showToast('Invalid promo code.', 'info');
      return false;
    }
  };

  // Checkout and orders
  const checkout = (customerInfo, deliveryAddress, orderNotes, paymentMethod) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = activeCoupon ? (activeCoupon.discount * subtotal) : 0;
    const city = deliveryAddress?.city || deliveryCity;
    const deliveryFee = activeCoupon?.freeShipping ? 0 : (subtotal > 2000 ? 0 : (city === 'Faisalabad' ? 200 : 300));
    const tax = 0;
    const total = subtotal - discount + deliveryFee;

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      id: orderId,
      customer: customerInfo,
      address: deliveryAddress,
      notes: orderNotes,
      items: [...cart],
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      status: 'Received', // Received -> Preparing -> Baking -> Ready -> Out for Delivery -> Delivered
      date: new Date().toISOString().split('T')[0],
      trackingStatus: 'Order Received'
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setCurrentOrderTrackingId(orderId);

    // Save to user history if logged in
    if (currentUser) {
      setCurrentUser(prevUser => ({
        ...prevUser,
        orderHistory: [newOrder, ...(prevUser.orderHistory || [])]
      }));
    }

    clearCart();
    return newOrder;
  };

  // Custom cake orders
  const addCustomCakeOrder = (details) => {
    const orderId = 'ORD-CUST-' + Math.floor(100000 + Math.random() * 900000);
    const basePrice = details.size === '2.0 kg' ? 6000 : details.size === '1.5 kg' ? 4500 : 3000;
    const frostingPremium = details.frosting === 'Chocolate Ganache' ? 500 : 300;
    const total = basePrice + frostingPremium;
    const customCity = details.deliveryAddress || details.address?.city || deliveryCity;
    const customDeliveryFee = customCity === 'Faisalabad' ? 200 : 300;

    const customOrder = {
      id: orderId,
      isCustom: true,
      cakeDetails: details,
      customer: {
        name: currentUser?.name || details.name || 'Guest Customer',
        phone: currentUser?.phone || details.phone || '',
        email: currentUser?.email || details.email || ''
      },
      address: details.deliveryAddress
        ? { houseNo: '', street: '', city: details.deliveryAddress, postalCode: '' }
        : (details.address || { houseNo: '', street: '', city: 'Local Delivery Area', postalCode: '' }),
      items: [{
        product: {
          id: 'custom-cake',
          name: `Custom Cake (${details.theme || 'Birthday'} Theme)`,
          price: total,
          category: 'Cakes',
          images: [details.inspirationImage || '/chocolate_cake.jpg']
        },
        quantity: 1,
        flavour: details.flavour,
        weight: details.size
      }],
      subtotal: total,
      discount: 0,
      deliveryFee: customDeliveryFee,
      tax: 0,
      total: total + customDeliveryFee,
      paymentMethod: details.paymentMethod || 'Cash on Delivery',
      paymentStatus: details.paymentMethod === 'JazzCash' ? 'Pending Verification' : details.paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid',
      jazzCashTxnId: details.jazzCashTxnId || '',
      notes: details.specialInstructions || '',
      status: 'Received',
      date: new Date().toISOString().split('T')[0],
      trackingStatus: 'Order Received'
    };

    setOrders(prevOrders => [customOrder, ...prevOrders]);
    setCurrentOrderTrackingId(orderId);

    if (currentUser) {
      setCurrentUser(prevUser => ({
        ...prevUser,
        orderHistory: [customOrder, ...(prevUser.orderHistory || [])]
      }));
    }

    return customOrder;
  };

  // Auth Operations
  const registerUser = (name, email, password) => {
    // Check if email already registered
    const existing = localStorage.getItem(`bakery_user_${email}`);
    if (existing) {
      showToast('Email is already registered.', 'info');
      return false;
    }

    const newUser = {
      name,
      email,
      password, // In a real app this should be hashed
      phone: '',
      savedAddresses: [],
      favoriteProducts: [],
      orderHistory: []
    };

    localStorage.setItem(`bakery_user_${email}`, JSON.stringify(newUser));
    setCurrentUser(newUser);
    showToast('Registration successful! Welcome to the bakery.', 'success');
    return true;
  };

  const loginUser = (email, password) => {
    // Admin login shortcut
    if (email === 'admin@bakery.com' && password === 'admin123') {
      const adminUser = {
        name: 'Bakery Admin',
        email: 'admin@bakery.com',
        isAdmin: true,
        favoriteProducts: [],
        orderHistory: []
      };
      setCurrentUser(adminUser);
      showToast('Admin logged in successfully.', 'success');
      return true;
    }

    const saved = localStorage.getItem(`bakery_user_${email}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.password === password) {
        setCurrentUser(parsed);
        showToast(`Welcome back, ${parsed.name}!`, 'success');
        return true;
      }
    }
    showToast('Invalid email or password.', 'info');
    return false;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.', 'info');
  };

  const saveAddress = (address) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      savedAddresses: [...(currentUser.savedAddresses || []), address]
    };
    setCurrentUser(updatedUser);
    localStorage.setItem(`bakery_user_${currentUser.email}`, JSON.stringify(updatedUser));
    showToast('Address saved successfully.', 'success');
  };

  const toggleFavoriteProduct = (productId) => {
    if (!currentUser) {
      showToast('Please login to save favorite products.', 'info');
      return;
    }

    const favorites = currentUser.favoriteProducts || [];
    let updatedFavorites;
    if (favorites.includes(productId)) {
      updatedFavorites = favorites.filter(id => id !== productId);
      showToast('Removed from favorites.', 'info');
    } else {
      updatedFavorites = [...favorites, productId];
      showToast('Added to favorites!', 'success');
    }

    const updatedUser = { ...currentUser, favoriteProducts: updatedFavorites };
    setCurrentUser(updatedUser);
    localStorage.setItem(`bakery_user_${currentUser.email}`, JSON.stringify(updatedUser));
  };

  // Reviews
  const addProductReview = (productId, rating, comment, username) => {
    const name = username || currentUser?.name || 'Anonymous';
    const newReview = {
      id: 'rev-' + Date.now(),
      user: name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(prevProducts => {
      return prevProducts.map(p => {
        if (p.id === productId) {
          return {
            ...p,
            reviews: [newReview, ...(p.reviews || [])]
          };
        }
        return p;
      });
    });
    showToast('Review submitted. Thank you!', 'success');
  };

  // Admin Functions
  const adminUpdateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status, trackingStatus: status } 
          : order
      )
    );

    // Sync order tracking status in user account
    if (currentUser) {
      setCurrentUser(prevUser => {
        const updatedHistory = (prevUser.orderHistory || []).map(order => 
          order.id === orderId 
            ? { ...order, status, trackingStatus: status } 
            : order
        );
        return { ...prevUser, orderHistory: updatedHistory };
      });
    }

    showToast(`Order ${orderId} status updated to: ${status}`, 'success');
  };

  const adminAddProduct = (product) => {
    const newProduct = {
      ...product,
      id: 'p-' + Date.now(),
      reviews: []
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Product "${product.name}" added successfully!`, 'success');
  };

  const adminUpdateProduct = (updatedProduct) => {
    setProducts(prev => 
      prev.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p)
    );
    showToast(`Product "${updatedProduct.name}" updated successfully!`, 'success');
  };

  const adminDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product deleted.', 'info');
  };

  const adminAddCoupon = (coupon) => {
    setCoupons(prev => [...prev, coupon]);
    showToast(`Coupon "${coupon.code}" added.`, 'success');
  };

  const adminDeleteCoupon = (code) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast(`Coupon "${code}" deleted.`, 'info');
  };

  return (
    <BakeryContext.Provider value={{
      products,
      cart,
      orders,
      coupons,
      currentUser,
      activeCoupon,
      toastNotification,
      currentOrderTrackingId,
      setCurrentOrderTrackingId,
      deliveryCity,
      setDeliveryCity,
      showToast,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
      checkout,
      addCustomCakeOrder,
      registerUser,
      loginUser,
      logoutUser,
      saveAddress,
      toggleFavoriteProduct,
      addProductReview,
      adminUpdateOrderStatus,
      adminAddProduct,
      adminUpdateProduct,
      adminDeleteProduct,
      adminAddCoupon,
      adminDeleteCoupon
    }}>
      {children}
    </BakeryContext.Provider>
  );
};
