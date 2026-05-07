import { useState } from 'react';
import { useStore } from '../../../store/storeContext';
import { useFavorites } from '../hooks/useFavorites';
import numeral from 'numeral';

export default function SavedListings() {
  const [isOpen, setIsOpen] = useState(false);

  const { state } = useStore();
  const { count } = useFavorites();

  const savedListings = state.listings.filter((l) =>
    state.saved.includes(l.id)
  );

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          padding: '10px 20px',
          borderRadius: '24px',
          border: '1.5px solid #222',
          background: isOpen ? '#222' : '#fff',
          color: isOpen ? '#fff' : '#222',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {isOpen ? 'Close' : `Saved (${count})`}
      </button>

      {isOpen && (
        <>
          {/* Backdrop — click anywhere outside panel to close */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.3)',
              zIndex: 99,
            }}
          />

          {/* Side panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '320px',
              background: '#fff',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.12)',
              padding: '24px',
              overflowY: 'auto',
              zIndex: 100,
            }}
          >
            {/* Header with close button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#222' }}>Saved Listings</h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.6rem',
                  cursor: 'pointer',
                  color: '#717171',
                  lineHeight: 1,
                  padding: '0 4px',
                }}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {savedListings.length === 0 ? (
              <p style={{ color: '#717171' }}>No saved listings yet.</p>
            ) : (
              savedListings.map((listing) => (
                <div
                  key={listing.id}
                  style={{
                    borderBottom: '1px solid #f0f0f0',
                    paddingBottom: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <p style={{ fontWeight: 600, margin: '0 0 4px', color: '#222' }}>
                    {listing.title}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#717171', margin: '0 0 4px' }}>
                    {listing.location}
                  </p>
                  <p style={{ fontWeight: 700, color: '#ff385c', margin: 0 }}>
                    {numeral(listing.price).format('$0,0')} / night
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  );
}
