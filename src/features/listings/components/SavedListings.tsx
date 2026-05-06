import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { useStore } from '../../../store/StoreContext';
import { useFavorites } from '../hooks/useFavorites';
import numeral from 'numeral';

export default function SavedListings() {
  // Local state just for open/close — panel visibility
  const [isOpen, setIsOpen] = useState(false);

  const { state } = useStore();
  const { count } = useFavorites();

  // Derive full listing objects from saved IDs
  // saved is just numbers — we find matching listings from the store
  const savedListings = state.listings.filter((l) =>
    state.saved.includes(l.id)
  );

  return (
    <div>
      {/* Toggle button — shows count so user knows how many are saved */}
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

      {/* Headlessui Transition — animates panel sliding in from the right */}
      {/* show prop controls whether panel is visible */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-x-0"
        leaveTo="opacity-0 translate-x-full"
      >
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
          <h2 style={{ marginBottom: '20px', color: '#222' }}>
            Saved Listings
          </h2>

          {/* Empty state inside the panel */}
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
                {/* Show title, location, price for each saved listing */}
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
      </Transition>
    </div>
  );
}