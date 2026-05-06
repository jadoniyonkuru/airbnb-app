import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useStore } from '../../store/storeContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { state, dispatch } = useStore();

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px',
      background: '#fff',
      borderBottom: '1px solid #f0f0f0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Brand */}
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ff385c' }}>
          airbnb clone
        </span>
      </NavLink>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* NavLink automatically adds aria-current="page" and we use
            the isActive callback to apply active styling */}
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            textDecoration: 'none',
            fontWeight: isActive ? 700 : 400,
            color: isActive ? '#ff385c' : '#222',
            borderBottom: isActive ? '2px solid #ff385c' : '2px solid transparent',
            paddingBottom: '2px',
          })}
        >
          Home
        </NavLink>

        {/* Only show Dashboard link when logged in */}
        {isAuthenticated && (
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontWeight: isActive ? 700 : 400,
              color: isActive ? '#ff385c' : '#222',
              borderBottom: isActive ? '2px solid #ff385c' : '2px solid transparent',
              paddingBottom: '2px',
            })}
          >
            Dashboard
          </NavLink>
        )}

        {/* Saved count badge */}
        {state.saved.length > 0 && (
          <span style={{
            background: '#ff385c',
            color: '#fff',
            borderRadius: '20px',
            padding: '2px 10px',
            fontSize: '0.8rem',
            fontWeight: 600,
          }}>
            {state.saved.length} saved
          </span>
        )}

        {/* RESET button — dispatches RESET action to clear filter and saved */}
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1.5px solid #ddd',
            background: '#fff',
            color: '#222',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          Clear All
        </button>

        {/* Auth button — login or logout depending on state */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: '#222',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Log Out
          </button>
        ) : (
          <NavLink
            to="/login"
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              background: '#ff385c',
              color: '#fff',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Log In
          </NavLink>
        )}
      </div>
    </nav>
  );
}