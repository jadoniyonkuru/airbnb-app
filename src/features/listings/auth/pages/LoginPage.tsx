import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  // useNavigate gives us programmatic navigation
  const navigate = useNavigate();

  // Called by LoginForm after login() succeeds
  const handleSuccess = () => {
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f7f7f7',
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ marginBottom: '8px', color: '#222' }}>Welcome back</h1>
        <p style={{ color: '#717171', marginBottom: '28px' }}>
          Sign in to your account
        </p>

        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}