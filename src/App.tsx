import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Navbar from './shared/components/Navbar';
import Spinner from './shared/components/spinner';
import NotFound from './shared/components/NOtFound';
import ProtectedRoute from './shared/components/protectedRoute';
import { ListingsPage } from './features/listings';
import { LoginPage } from './features/listings/auth';

// Lazy load heavy pages — these are only downloaded when the user
// navigates to them, keeping the initial JS bundle small
const ListingDetail = lazy(() => import('./features/listings/pages/ListingDetail'));
const DashboardPage = lazy(() => import('./features/listings/auth/pages/DashboardPage'));

export default function App() {
  // useLocation gives us the current route — we watch it for changes
  const location = useLocation();

  // NProgress — runs on every route change
  // start() shows the slim bar, done() completes and hides it
  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 100);

    // Clean up timer if component unmounts mid-navigation
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return (
    <>
      {/* Navbar sits outside Routes so it shows on every page */}
      <Navbar />

      {/* Suspense catches lazy-loaded pages while they download
          and shows the Spinner fallback in the meantime */}
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Home — eager loaded, always in the bundle */}
          <Route path="/" element={<ListingsPage />} />

          {/* Detail — lazy loaded, separate JS chunk */}
          <Route path="/listings/:id" element={<ListingDetail />} />

          {/* Login — eager loaded */}
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboard — lazy loaded + protected
              ProtectedRoute checks isAuthenticated before rendering */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all — renders when no route matches */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}