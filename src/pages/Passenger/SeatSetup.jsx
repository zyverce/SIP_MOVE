import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { BusFront, ArrowRight } from 'lucide-react';

export default function SeatSetup() {
  const [inputVal, setInputVal] = useState('');
  const { setSeatNumber } = useOrders();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSeatNumber(inputVal.trim());
      navigate('/');
    }
  };

  return (
    <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ background: 'var(--ksrtc-red)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(211,47,47,0.4)' }}>
          <BusFront size={32} color="#fff" />
        </div>
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>SIP <span className="text-gradient">& MOVE</span></h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please enter your seat number to begin.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Seat Number</label>
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. 12A" 
              style={{
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px',
                border: '1px solid var(--glass-border)',
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                fontSize: '1.2rem',
                fontFamily: 'Outfit',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--ksrtc-red)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={!inputVal.trim()} style={{ width: '100%' }}>
            Continue to Menu <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
