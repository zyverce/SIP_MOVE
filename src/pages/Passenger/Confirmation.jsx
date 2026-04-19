import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { CheckCircle, Clock, ArrowLeft } from 'lucide-react';

export default function Confirmation() {
  const { seatNumber } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        
        <div style={{ margin: '0 auto 2rem', display: 'flex', justifyContent: 'center' }}>
          <CheckCircle size={80} color="var(--ksrtc-red)" />
        </div>
        
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, var(--ksrtc-red), var(--ksrtc-yellow))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Order Confirmed!
        </h2>
        
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Delivering to Seat</p>
          <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>{seatNumber}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--ksrtc-yellow)', marginBottom: '2.5rem' }}>
          <Clock size={24} />
          <span style={{ fontSize: '1.2rem', fontWeight: '600' }}>Estimated time: ~3 mins</span>
        </div>
        
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Place Another Order
        </button>
      </div>
    </div>
  );
}
