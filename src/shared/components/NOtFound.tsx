import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      textAlign: 'center',
      padding: '24px',
    }}>
      {/* Large 404 number as visual anchor */}
      <h1 style={{ fontSize: '6rem', fontWeight: 800, color: '#ff385c', margin: 0 }}>
        404
      </h1>
      <h2 style={{ color: '#222', margin: 0 }}>Page not found</h2>
      <p style={{ color: '#717171', maxWidth: '360px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Link instead of button — it's a navigation action */}
      <Link
        to="/"
        style={{
          padding: '12px 28px',
          borderRadius: '24px',
          background: '#ff385c',
          color: '#fff',
          fontWeight: 600,
          textDecoration: 'none',
          marginTop: '8px',
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}