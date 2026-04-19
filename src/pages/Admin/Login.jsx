import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAdminAuth } from '../../App';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock auth for admin
    if (pin === '0000') {
      setAdminAuth(true);
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-body)' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ background: 'var(--ksrtc-red)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 15px rgba(211,47,47,0.3)' }}>
          <ShieldCheck size={32} color="#fff" />
        </div>
        
        <h2 style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Admin <span className="text-gradient">Portal</span></h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Enter Admin PIN to access the dashboard</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <input 
              type="password" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN (0000)" 
              maxLength="4"
              style={{
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px',
                border: `1px solid ${error ? 'var(--ksrtc-red)' : 'var(--pos-border)'}`,
                background: 'rgba(0,0,0,0.3)',
                color: 'var(--text-primary)',
                fontSize: '1.5rem',
                letterSpacing: '10px',
                fontFamily: 'monospace',
                textAlign: 'center',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              autoFocus
            />
            {error && <p style={{ color: 'var(--ksrtc-red)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Invalid Admin PIN</p>}
          </div>
          
          <button type="submit" className="btn-primary" disabled={pin.length < 4} style={{ width: '100%' }}>
            Access Admin Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
