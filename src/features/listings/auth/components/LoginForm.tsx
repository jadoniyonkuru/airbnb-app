import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginFormProps {
  // Called after successful login so LoginPage can redirect
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  // Local state — form fields only live here, not in global store
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    // Prevent browser from reloading the page on form submit
    e.preventDefault();

    // Basic validation before calling login
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Call login from AuthContext — sets isAuthenticated to true
    login(email, password);

    // Tell the parent (LoginPage) login succeeded so it can redirect
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Show validation error if fields are empty */}
      {error && (
        <p style={{ color: '#c0392b', fontSize: '0.9rem', margin: 0 }}>{error}</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1.5px solid #ddd',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontWeight: 600, color: '#222' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1.5px solid #ddd',
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          padding: '12px',
          borderRadius: '8px',
          background: '#ff385c',
          color: '#fff',
          border: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        Log In
      </button>
    </form>
  );
}