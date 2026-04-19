import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setStaffAuth } from '../../App';
import { BadgeCheck } from 'lucide-react';

export default function Login() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock auth
    if (pin === '1234') {
      setStaffAuth(true);
      navigate('/staff/dashboard');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ background: 'var(--ksrtc-yellow)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(255,202,40,0.3)' }}>
          <BadgeCheck size={32} color="#000" />
        </div>
        
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Staff <span className="text-gradient">Portal</span></h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter PIN to access the dashboard</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (1234)" 
              maxLength="4"
              style={{
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px',
                border: `1px solid ${error ? 'var(--ksrtc-red)' : 'var(--glass-border)'}`,
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                fontSize: '1.5rem',
                letterSpacing: '10px',
                fontFamily: 'monospace',
                textAlign: 'center',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              autoFocus
            />
            {error && <p style={{ color: 'var(--ksrtc-red)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Invalid PIN</p>}
          </div>
          
          <button type="submit" className="btn-primary" disabled={pin.length < 4} style={{ width: '100%' }}>
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
