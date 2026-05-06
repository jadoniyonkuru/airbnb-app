import { useAuth } from '../hooks/useAuth';
import { useStore } from '../../../store/storeContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { logout } = useAuth();
  const { state } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '48px 24px',
    }}>
      <h1 style={{ color: '#222', marginBottom: '8px' }}>Dashboard</h1>
      <p style={{ color: '#717171', marginBottom: '32px' }}>
        Welcome back! Here's your activity.
      </p>

      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '24px',
      }}>
        <p style={{ fontSize: '0.85rem', color: '#717171', margin: '0 0 8px' }}>
          SAVED LISTINGS
        </p>
        <p style={{ fontSize: '2.5rem', fontWeight: 700, color: '#ff385c', margin: 0 }}>
          {state.saved.length}
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: '12px 24px',
          borderRadius: '8px',
          background: '#222',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Log Out
      </button>
    </div>
  );
}
