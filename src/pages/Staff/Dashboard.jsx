import { useOrders } from '../../context/OrderContext';
import { LogOut, Coffee, CupSoda, Clock, CheckCircle2, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { orders, updateOrderStatus, pendingOrdersCount } = useOrders();
  const navigate = useNavigate();

  // Sort orders: Oldest first, filtering out "Delivered" if you want, 
  // but let's show all and just put Delivered at the bottom or greyed out.
  // Actually PRD says "Sorted by time (oldest first)". Let's sort oldest first.
  const activeOrders = orders.filter(o => o.status !== 'Delivered').sort((a, b) => a.timestamp - b.timestamp);
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').sort((a, b) => b.timestamp - a.timestamp);

  const displayOrders = [...activeOrders, ...deliveredOrders];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'var(--ksrtc-red)';
      case 'Preparing': return 'var(--ksrtc-yellow)';
      case 'Delivered': return '#4caf50';
      default: return 'var(--text-muted)';
    }
  };

  const cycleStatus = (id, currentStatus) => {
    if (currentStatus === 'Pending') updateOrderStatus(id, 'Preparing');
    else if (currentStatus === 'Preparing') updateOrderStatus(id, 'Delivered');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Staff <span className="text-gradient">Dashboard</span></h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pendingOrdersCount} active orders</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          <LogOut size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }}/> Exit
        </button>
      </header>

      <main className="animate-fade-in" style={{ animationDelay: '0.1s', flex: 1 }}>
        {displayOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No orders yet!</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {displayOrders.map(order => (
              <div 
                key={order.id} 
                className="glass-panel" 
                style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  opacity: order.status === 'Delivered' ? 0.6 : 1,
                  borderLeft: `4px solid ${getStatusColor(order.status)}`,
                  transition: 'all 0.3s'
                }}
              >
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                  {/* Seat Number Box */}
                  <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', width: '60px', height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Seat</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', lineHeight: 1 }}>{order.seatNumber}</span>
                  </div>
                  
                  {/* Item Details */}
                  <div>
                    <h3 style={{ margin: '0 0 0.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {order.item === 'Tea' ? <CupSoda size={18} color="var(--ksrtc-red)" /> : <Coffee size={18} color="var(--ksrtc-yellow)" />} 
                      {order.item}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Sugar: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{order.sugar}</span>
                    </p>
                    <p style={{ margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                {/* Status Action */}
                <div>
                  {order.status !== 'Delivered' ? (
                    <button 
                      className="btn-primary" 
                      onClick={() => cycleStatus(order.id, order.status)}
                      style={{ 
                        padding: '12px 20px', 
                        fontSize: '1rem', 
                        background: order.status === 'Pending' ? 'linear-gradient(135deg, var(--ksrtc-red), var(--ksrtc-red-dark))' : 'linear-gradient(135deg, var(--ksrtc-yellow), #f57f17)',
                        color: order.status === 'Pending' ? '#fff' : '#000',
                        boxShadow: `0 4px 15px ${order.status === 'Pending' ? 'rgba(211,47,47,0.3)' : 'rgba(255,202,40,0.3)'}`
                      }}
                    >
                      {order.status === 'Pending' ? 'Start Making' : 'Mark Delivered'}
                    </button>
                  ) : (
                    <div style={{ padding: '8px 16px', borderRadius: '20px', background: 'rgba(76, 175, 80, 0.2)', color: '#4caf50', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
                      <CheckCircle2 size={18} /> Delivered
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
