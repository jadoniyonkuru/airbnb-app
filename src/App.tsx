import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import Spinner from './shared/components/spinner';
import NotFound from './shared/components/NOtFound';
import ProtectedRoute from './shared/components/protectedRoute';
import { ListingsPage } from './features/listings';
import { LoginPage } from './features/auth';
import { useNProgress } from './shared/hooks/useNProgress';

const ListingDetail = lazy(() => import('./features/listings/pages/ListingDetail'));
const DashboardPage = lazy(() => import('./features/auth/pages/DashboardPage'));

export default function App() {
  useNProgress();

  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}