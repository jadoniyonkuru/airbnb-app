import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { StoreProvider } from './store/storeContext';
import { AuthProvider } from './features/listings/auth/context/Authcontext';
import App from './App';
import './index.css';

// Provider order matters — outer providers are available to inner ones
// BrowserRouter → AuthProvider → StoreProvider → App
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <App />
          {/* Toaster outside App so toasts show on every page */}
          <Toaster position="bottom-right" />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);