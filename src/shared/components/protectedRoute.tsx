import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../features/auth/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Show toast before redirecting so user understands why
    toast.error('Please log in to access this page');

    // replace prevents the protected route from appearing
    // in browser history — back button won't return to it
    return <Navigate to="/login" replace />;
  }

  // User is authenticated — render the protected page
  return <>{children}</>;
}