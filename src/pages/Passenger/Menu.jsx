import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { Coffee, CupSoda, Loader2, CheckCircle2 } from 'lucide-react';

export default function Menu() {
  const { seatNumber, placeOrder } = useOrders();
  const navigate = useNavigate();
  
  const [selectedItem, setSelectedItem] = useState(null); // 'Tea' or 'Coffee'
  const [sugarLevel, setSugarLevel] = useState('Medium'); // 'Low', 'Medium', 'High'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrder = async () => {
    if (!selectedItem) return;
    setIsSubmitting(true);
    await placeOrder(selectedItem, sugarLevel);
    setIsSubmitting(false);
    navigate('/confirmation');
  };

  return (
    <div className="page-container">
      <header className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>SIP <span className="text-gradient">& MOVE</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome! Place your order from seat <strong style={{ color: 'var(--ksrtc-yellow)', fontSize: '1.2rem' }}>{seatNumber}</strong></p>
        </div>
      </header>

      <main>
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>1. Select Beverage</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
            
            {/* TEA CARD */}
            <div 
              className={`glass-panel ${selectedItem === 'Tea' ? 'selected' : ''}`}
              onClick={() => setSelectedItem('Tea')}
              style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedItem === 'Tea' ? '2px solid var(--ksrtc-red)' : '1px solid var(--glass-border)',
                background: selectedItem === 'Tea' ? 'rgba(211,47,47,0.1)' : 'var(--bg-surface)'
              }}
            >
              <CupSoda size={48} color={selectedItem === 'Tea' ? 'var(--ksrtc-red)' : 'var(--text-muted)'} style={{ marginBottom: '1rem' }} />
              <h3 style={{ margin: 0 }}>Masala Tea</h3>
            </div>

            {/* COFFEE CARD */}
            <div 
              className={`glass-panel ${selectedItem === 'Coffee' ? 'selected' : ''}`}
              onClick={() => setSelectedItem('Coffee')}
              style={{
                padding: '2rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                border: selectedItem === 'Coffee' ? '2px solid var(--ksrtc-yellow)' : '1px solid var(--glass-border)',
                background: selectedItem === 'Coffee' ? 'rgba(255,202,40,0.1)' : 'var(--bg-surface)'
              }}
            >
              <Coffee size={48} color={selectedItem === 'Coffee' ? 'var(--ksrtc-yellow)' : 'var(--text-muted)'} style={{ marginBottom: '1rem' }} />
              <h3 style={{ margin: 0 }}>Filter Coffee</h3>
            </div>
            
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: selectedItem ? 1 : 0.5, pointerEvents: selectedItem ? 'auto' : 'none', transition: 'all 0.3s' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>2. Sugar Level</h3>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            {['Low', 'Medium', 'High'].map(level => (
              <button
                key={level}
                className={`btn-secondary ${sugarLevel === level ? 'active' : ''}`}
                onClick={() => setSugarLevel(level)}
                style={{ flex: 1 }}
              >
                {level}
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="animate-fade-in" style={{ marginTop: 'auto', animationDelay: '0.3s' }}>
        <button 
          className="btn-primary" 
          onClick={handleOrder}
          disabled={!selectedItem || isSubmitting}
          style={{ width: '100%', padding: '20px', fontSize: '1.3rem', borderRadius: '16px' }}
        >
          {isSubmitting ? <Loader2 className="spinner" size={24} style={{ animation: 'spin 1s linear infinite' }} /> : <CheckCircle2 size={24} />}
          {isSubmitting ? 'Placing Order...' : `Order ${selectedItem || 'Beverage'} Now`}
        </button>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
