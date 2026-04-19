import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, LayoutDashboard, UtensilsCrossed, Settings, Bell, 
  Search, ChevronRight, Plus, Minus, Trash2, Coffee, CupSoda, Droplet, Flame, Star, X, User, MoreHorizontal, Sun, Moon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TRANSLATIONS = {
  en: {
    dashboard: "Dashboard",
    orders: "Orders",
    rateUs: "RATE US",
    categories: "CATEGORIES",
    searchPlaceholder: "Search Restaurant, Food, Cuisine or a Dish",
    startingFrom: "Starting From",
    sales: "Sales",
    orderReports: "Order Reports",
    newOrdersGotThisWeek: "order got this week",
    viewMore: "View More",
    customer: "Customer",
    orderNumber: "Order number",
    address: "Address",
    amount: "Amount",
    status: "Status",
    cart: "Cart",
    orderId: "Order ID",
    subTotal: "Sub Total",
    deliveryCharge: "Delivery Charge",
    total: "TOTAL",
    confirmOrder: "Confirm Order",
    cartEmpty: "Your cart is empty",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    notifications: "Notifications",
    rateUsTitle: "Rate Us",
    rateUsSub: "We value your opinions and suggestions!",
    submitFeedback: "Submit Feedback",
    tellUs: "Tell us what you think..."
  },
  ml: {
    dashboard: "ഡാഷ്‌ബോർഡ്",
    orders: "ഓർഡറുകൾ",
    rateUs: "വിലയിരുത്തുക",
    categories: "വിഭാഗങ്ങൾ",
    searchPlaceholder: "റെസ്റ്റോറൻ്റ്, ഭക്ഷണം അല്ലെങ്കിൽ വിഭവം തിരയുക...",
    startingFrom: "തുടങ്ങുന്നത്",
    sales: "വിൽപന",
    orderReports: "ഓർഡർ റിപ്പോർട്ടുകൾ",
    newOrdersGotThisWeek: "ഓർഡറുകൾ ഈ ആഴ്ച ലഭിച്ചു",
    viewMore: "കൂടുതൽ കാണുക",
    customer: "ഉപഭോക്താവ്",
    orderNumber: "ഓർഡർ നമ്പർ",
    address: "വിലാസം",
    amount: "തുക",
    status: "സ്റ്റാറ്റസ്",
    cart: "കാർട്ട്",
    orderId: "ഓർഡർ ഐഡി",
    subTotal: "ഉപതുക",
    deliveryCharge: "ഡെലിവറി ചാർജ്",
    total: "മൊത്തം",
    confirmOrder: "സ്ഥിരീകരിക്കുക",
    cartEmpty: "നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്",
    settings: "ക്രമീകരണങ്ങൾ",
    language: "ഭാഷ",
    theme: "തീം",
    dark: "ഇരുണ്ട",
    light: "വെളിച്ചം",
    notifications: "അറിയിപ്പുകൾ",
    rateUsTitle: "ഞങ്ങളെ വിലയിരുത്തുക",
    rateUsSub: "നിങ്ങളുടെ അഭിപ്രായങ്ങൾ ഞങ്ങൾ വിലമതിക്കുന്നു!",
    submitFeedback: "സമർപ്പിക്കുക",
    tellUs: "നിങ്ങളുടെ അഭിപ്രായം പറയുക..."
  }
};

const popularDishes = [
  { id: 1, name: 'TEA', price: 10.00, rating: 4.5, sales: 1360, icon: CupSoda, color: '#f57c00' },
  { id: 2, name: 'COFFEE', price: 15.00, rating: 4.8, sales: 2100, icon: Coffee, color: '#6d4c41' },
  { id: 3, name: 'HORLIKS', price: 20.00, rating: 4.6, sales: 850, icon: CupSoda, color: '#fbc02d' },
  { id: 4, name: 'BOOST', price: 22.00, rating: 4.7, sales: 1100, icon: Flame, color: '#d32f2f' },
  { id: 5, name: 'GREEN TEA', price: 12.00, rating: 4.3, sales: 600, icon: Droplet, color: '#388e3c' },
  { id: 6, name: 'HOT WATER', price: 5.00, rating: 4.1, sales: 300, icon: Droplet, color: '#0288d1' }
];

const mockReports = [
  { id: '01845723200573', customer: 'Jamsed Jhon', address: 'Karang Teagha Hills', amount: 120.45, status: 'Completed', avatar: 'https://i.pravatar.cc/150?u=jamsed' },
  { id: '01976854823047', customer: 'Peter Parker', address: 'City Center, CA', amount: 140.45, status: 'Pending', avatar: 'https://i.pravatar.cc/150?u=peter' }
];

const mockNotifications = [
  { id: 1, text: 'Order conformed', date: '24 Oct 2026', time: '10:30 AM' },
  { id: 2, text: 'Order Delivered', date: '24 Oct 2026', time: '09:45 AM' },
  { id: 3, text: 'Rating submitted', date: '23 Oct 2026', time: '08:15 PM' }
];

function FluidNavigationMenu({ lang, setLang, theme, setTheme, t, mockNotifications }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();

  const toggle = () => {
    setIsExpanded(!isExpanded);
    setActiveDropdown(null);
  };

  const toggleDropdown = (e, menu) => {
    e.stopPropagation();
    setActiveDropdown(prev => prev === menu ? null : menu);
  };

  const baseStyle = {
    position: 'absolute', left: 0, top: 0,
    width: '52px', height: '52px',
    background: 'var(--pos-icon-bg)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
    willChange: 'transform, opacity',
    boxShadow: '0 4px 12px var(--pos-shadow)',
    backfaceVisibility: 'hidden',
    WebkitFontSmoothing: 'antialiased'
  };

  return (
    <div style={{ position: 'relative', width: '52px', height: '52px', marginBottom: '1rem', zIndex: 40, marginTop: 'auto' }}>
      {/* Settings */}
      <div 
        onClick={(e) => toggleDropdown(e, 'settings')}
        style={{
          ...baseStyle,
          transform: `translateY(${isExpanded ? -200 : 0}px)`,
          opacity: isExpanded ? 1 : 0,
          zIndex: 41,
          transition: `transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${isExpanded ? '300ms' : '350ms'}`,
          pointerEvents: isExpanded ? 'auto' : 'none'
        }}
      >
        <Settings size={22} color={activeDropdown === 'settings' ? 'var(--ksrtc-red)' : 'var(--text-muted)'} />
        {activeDropdown === 'settings' && (
          <div style={{ position: 'absolute', left: '70px', top: '50%', transform: 'translateY(-50%)', background: 'var(--pos-card)', borderRadius: '16px', border: '1px solid var(--pos-border)', padding: '16px', minWidth: '220px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '1.2rem', zIndex: 100, cursor: 'default' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{t.language}</span>
              <div style={{ display: 'flex', background: 'var(--pos-input)', borderRadius: '10px', padding: '4px' }}>
                <button onClick={() => setLang('en')} style={{ background: lang === 'en' ? 'var(--ksrtc-red)' : 'transparent', color: lang === 'en' ? 'white' : 'var(--text-muted)', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: '0.2s', fontSize: '0.85rem', fontWeight: 600 }}>En</button>
                <button onClick={() => setLang('ml')} style={{ background: lang === 'ml' ? 'var(--ksrtc-red)' : 'transparent', color: lang === 'ml' ? 'white' : 'var(--text-muted)', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', transition: '0.2s', fontSize: '0.85rem', fontWeight: 600 }}>മ</button>
              </div>
            </div>
            <div style={{ height: '1px', background: 'var(--pos-border)' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>{t.theme}</span>
              <div style={{ display: 'flex', background: 'var(--pos-input)', borderRadius: '24px', padding: '4px', cursor: 'pointer', border: '1px solid var(--pos-border)' }} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <div style={{ padding: '6px', borderRadius: '50%', background: theme === 'light' ? 'white' : 'transparent', color: theme === 'light' ? '#f57c00' : 'var(--text-muted)', boxShadow: theme === 'light' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none', transition: '0.3s' }}>
                  <Sun size={16} />
                </div>
                <div style={{ padding: '6px', borderRadius: '50%', background: theme === 'dark' ? 'var(--pos-card)' : 'transparent', color: theme === 'dark' ? '#64b5f6' : 'var(--text-muted)', boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.3)' : 'none', transition: '0.3s' }}>
                  <Moon size={16} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div 
        onClick={(e) => toggleDropdown(e, 'user')}
        style={{
          ...baseStyle,
          transform: `translateY(${isExpanded ? -140 : 0}px)`,
          opacity: isExpanded ? 1 : 0,
          zIndex: 42,
          transition: `transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${isExpanded ? '300ms' : '350ms'}`,
          pointerEvents: isExpanded ? 'auto' : 'none'
        }}
      >
        <User size={22} color={activeDropdown === 'user' ? 'var(--ksrtc-red)' : 'var(--text-muted)'} />
        {activeDropdown === 'user' && (
          <div style={{ position: 'absolute', left: '70px', top: '50%', transform: 'translateY(-50%)', background: 'var(--pos-card)', borderRadius: '12px', border: '1px solid var(--pos-border)', padding: '8px', minWidth: '180px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 100, cursor: 'default' }} onClick={e => e.stopPropagation()}>
            <button style={{ background: 'transparent', border: 'none', padding: '10px 12px', textAlign: 'left', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--pos-card-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <User size={16} color="var(--ksrtc-yellow)" /> Seat no : 12
            </button>
            <button onClick={() => navigate('/staff/dashboard')} style={{ background: 'transparent', border: 'none', padding: '10px 12px', textAlign: 'left', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--pos-card-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Star size={16} color="var(--ksrtc-red)" /> Staff
            </button>
            <button onClick={() => navigate('/admin/dashboard')} style={{ background: 'transparent', border: 'none', padding: '10px 12px', textAlign: 'left', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--pos-card-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Settings size={16} color="var(--text-muted)" /> Admin
            </button>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div 
        onClick={(e) => toggleDropdown(e, 'notifications')}
        style={{
          ...baseStyle,
          transform: `translateY(${isExpanded ? -80 : 0}px)`,
          opacity: isExpanded ? 1 : 0,
          zIndex: 43,
          transition: `transform 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${isExpanded ? '300ms' : '350ms'}`,
          pointerEvents: isExpanded ? 'auto' : 'none'
        }}
      >
        <div style={{ position: 'relative' }}>
          <Bell size={22} color={activeDropdown === 'notifications' ? 'var(--ksrtc-red)' : 'var(--text-muted)'} />
          <span style={{ position: 'absolute', top: -2, right: -2, background: 'var(--ksrtc-red)', width: 8, height: 8, borderRadius: '50%' }}></span>
        </div>
        {activeDropdown === 'notifications' && (
          <div style={{ position: 'absolute', left: '70px', bottom: '-50px', background: 'var(--pos-card)', borderRadius: '16px', border: '1px solid var(--pos-border)', minWidth: '320px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', pointerEvents: 'auto', display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 100, cursor: 'default' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--pos-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.notifications}</h3>
              <button style={{ background: 'var(--pos-input)', border: 'none', padding: '6px 12px', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', transition: '0.2s', fontWeight: 500 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Mark all as read</button>
            </div>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="scroll-hidden">
              {mockNotifications.map(n => (
                <div key={n.id} style={{ padding: '16px', borderBottom: '1px solid var(--pos-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--pos-card-hover)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--ksrtc-red)' }}></span>
                      {n.text}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{n.date}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '14px' }}>System message or update based on action.</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Toggle Button */}
      <div 
        onClick={toggle}
        style={{
          ...baseStyle,
          zIndex: 50,
          background: isExpanded ? 'rgba(211,47,47,0.1)' : 'var(--pos-icon-bg)',
          transition: 'all 0.3s ease'
        }}
      >
        {isExpanded ? <X size={24} color="var(--ksrtc-red)" /> : <MoreHorizontal size={24} color="var(--text-muted)" />}
      </div>
    </div>
  );
}

export default function POSDashboard() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [cart, setCart] = useState([
    { id: 1, name: 'TEA', subtext: 'Standard', price: 10.00, qty: 2 },
    { id: 2, name: 'COFFEE', subtext: 'Standard', price: 15.00, qty: 1 }
  ]);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToCart = (dish) => {
    const existing = cart.find(item => item.id === dish.id);
    if (existing) {
      updateQty(dish.id, 1);
    } else {
      setCart([...cart, { id: dish.id, name: dish.name, subtext: 'Standard', price: dish.price, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const remove = (id) => setCart(cart.filter(item => item.id !== id));
  
  const subTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const deliveryCharge = 10;
  const total = subTotal + deliveryCharge;

  return (
    <div className="pos-layout">
      {/* SIDEBAR */}
      <div className="pos-sidebar scroll-hidden">
        <div style={{ background: 'linear-gradient(135deg, #ff416c, #ff4b2b)', borderRadius: '12px', padding: '12px', marginBottom: '3rem' }}>
          <Flame size={32} color="white" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--ksrtc-red)', cursor: 'pointer', borderRight: '3px solid var(--ksrtc-red)', width: '100%' }}>
            <LayoutDashboard size={24} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: lang === 'ml' ? '0.65rem' : '0.8rem', fontWeight: 600, textAlign: 'center', padding: '0 4px', wordBreak: 'break-word', width: '100%' }}>{t.dashboard}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', cursor: 'pointer', width: '100%' }}>
            <ShoppingBag size={24} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: lang === 'ml' ? '0.65rem' : '0.8rem', fontWeight: 600, textAlign: 'center', padding: '0 4px', wordBreak: 'break-word', width: '100%' }}>{t.orders}</span>
          </div>
          <div 
            onClick={() => setShowFeedback(true)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s', width: '100%' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Star size={24} style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: lang === 'ml' ? '0.65rem' : '0.8rem', fontWeight: 600, textAlign: 'center', padding: '0 4px', wordBreak: 'break-word', width: '100%' }}>{t.rateUs}</span>
          </div>
        </div>

        <FluidNavigationMenu 
          lang={lang} setLang={setLang}
          theme={theme} setTheme={setTheme}
          t={t} mockNotifications={mockNotifications}
        />
      </div>

      {/* FEEDBACK MODAL */}
      {showFeedback && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="animate-fade-in" style={{ background: 'var(--pos-card)', padding: '2rem', borderRadius: '24px', width: '400px', maxWidth: '90%', position: 'relative', border: '1px solid var(--pos-border)' }}>
            <button onClick={() => setShowFeedback(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Star color="var(--ksrtc-yellow)" /> {t.rateUsTitle}
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{t.rateUsSub}</p>
            <textarea 
              placeholder={t.tellUs}
              style={{ width: '100%', height: '120px', background: 'var(--pos-bg)', border: '1px solid var(--pos-border)', borderRadius: '12px', padding: '1rem', color: 'var(--text-primary)', fontFamily: 'Outfit', resize: 'none', marginBottom: '1.5rem' }}
            ></textarea>
            <button onClick={() => setShowFeedback(false)} className="btn-primary" style={{ width: '100%' }}>{t.submitFeedback}</button>
          </div>
        </div>
      )}



      {/* MAIN CONTENT */}
      <div className="pos-main scroll-hidden">
        {/* Header Search */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder={t.searchPlaceholder} className="search-input" />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', margin: '0 0 4px' }}>{t.categories}</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {popularDishes.map((dish) => {
            const Icon = dish.icon;
            return (
              <div key={dish.id} className="pos-card" onClick={() => addToCart(dish)}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `linear-gradient(135deg, ${dish.color}20, ${dish.color}50)`, border: `1px solid ${dish.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Icon size={40} color={dish.color} />
                </div>
                <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', textAlign: 'center' }}>{dish.name}</h3>
                
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{dish.price.toFixed(2)}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#ffb300', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      ★ {dish.rating}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Reports */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', margin: '0 0 4px' }}>{t.orderReports}</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}><span style={{ color: 'var(--ksrtc-red)', fontWeight: 600 }}>Wow!! 100+ New</span> {t.newOrdersGotThisWeek}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}>
            {t.viewMore} <ChevronRight size={16} />
          </div>
        </div>

        <table className="reports-table">
          <thead>
            <tr>
              <th>{t.customer}</th>
              <th>{t.orderNumber}</th>
              <th>{t.address}</th>
              <th>{t.amount}</th>
              <th>{t.status}</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map(report => (
              <tr key={report.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={report.avatar} alt={report.customer} style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{report.customer}</span>
                </td>
                <td style={{ color: 'var(--text-muted)' }}>{report.id}</td>
                <td style={{ color: 'var(--text-muted)' }}>{report.address}</td>
                <td style={{ fontWeight: 600 }}>₹{report.amount.toFixed(2)}</td>
                <td>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    background: report.status === 'Completed' ? 'rgba(76, 175, 80, 0.15)' : 'rgba(255, 152, 0, 0.15)',
                    color: report.status === 'Completed' ? '#4caf50' : '#ff9800'
                  }}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ height: '40px' }}></div> {/* Bottom spacer */}
      </div>

      {/* RIGHT CART */}
      <div className="pos-cart text-sm">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UtensilsCrossed size={20} /> {t.cart}
          </h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.orderId}: #1099</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }} className="scroll-hidden">
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--pos-icon-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coffee size={24} color="var(--ksrtc-yellow)" />
              </div>
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{item.name}</h4>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '8px' }}>{item.subtext}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button onClick={() => updateQty(item.id, -1)} style={{ background: 'var(--pos-input)', border: '1px solid var(--pos-border)', color: 'var(--text-primary)', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Minus size={14} /></button>
                  <span style={{ fontWeight: 600 }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} style={{ background: 'var(--pos-input)', border: '1px solid var(--pos-border)', color: 'var(--text-primary)', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={14} /></button>
                  <button onClick={() => remove(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: 'auto' }}><Trash2 size={16} /></button>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                ₹{(item.price * item.qty).toFixed(2)}
              </div>
            </div>
          ))}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
              <UtensilsCrossed size={48} style={{ opacity: 0.2, marginBottom: '1rem', display: 'inline-block' }} />
              <p>{t.cartEmpty}</p>
            </div>
          )}
        </div>

        <div style={{ borderTop: '1px solid var(--pos-border-high)', paddingTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span>{t.subTotal}</span>
            <span style={{ color: 'var(--text-primary)' }}>₹{subTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span>{t.deliveryCharge}</span>
            <span style={{ color: 'var(--text-primary)' }}>₹{deliveryCharge.toFixed(2)}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '1px' }}>{t.total}</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{total.toFixed(2)}</span>
          </div>

          <button className="btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.2rem', borderRadius: '16px' }}>
            {t.confirmOrder}
          </button>
        </div>
      </div>
    </div>
  );
}
