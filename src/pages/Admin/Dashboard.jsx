import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, Settings, FileText, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <header className="glass-panel animate-fade-in" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }}>Admin <span style={{ color: 'var(--ksrtc-red)' }}>Dashboard</span></h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>System Management & Overview</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          <LogOut size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }}/> Back to POS
        </button>
      </header>

      <main className="animate-fade-in" style={{ animationDelay: '0.1s', flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          
          <div className="pos-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(211,47,47,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Settings color="var(--ksrtc-red)" size={24} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Menu Management</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Edit entire contents shown in the Staff and Customer dashboards. Add, remove, or modify items.
            </p>
            <button className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.95rem' }}>Edit Menu Catalog</button>
          </div>

          <div className="pos-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,202,40,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Users color="var(--ksrtc-yellow)" size={24} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>User Profiles</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Manage access for Staff members, review roles and manage admin authentication overrides.
            </p>
            <button className="btn-secondary" style={{ width: '100%', padding: '10px', fontSize: '0.95rem' }}>Manage Users</button>
          </div>

          <div className="pos-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(76, 175, 80, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileText color="#4caf50" size={24} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>System Reports</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              View overall financial reports, order history logs, and export data over time.
            </p>
            <button className="btn-secondary" style={{ width: '100%', padding: '10px', fontSize: '0.95rem' }}>View Reports</button>
          </div>

          <div className="pos-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(33, 150, 243, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Activity color="#2196f3" size={24} />
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Live Activity</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>
              Monitor system performance, currently active sessions, and realtime notifications feed.
            </p>
            <button className="btn-secondary" style={{ width: '100%', padding: '10px', fontSize: '0.95rem' }}>System Health</button>
          </div>

        </div>
      </main>
    </div>
  );
}
