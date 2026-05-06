import { useMemo } from 'react';
import { useStore } from '../../../store/storeContext';
import { useListings } from '../hooks/useListings';
import { useFavorites } from '../hooks/useFavorites';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import SavedBadge from '../components/SavedBadge';
import SavedListings from '../components/SavedListings';
import Spinner from '../../../shared/components/spinner';
import './ListingsPage.css';

export default function ListingsPage() {
  const { isLoading, isError, refetch } = useListings();

  const { state } = useStore();
  const { filter } = state;
  const { toggle, count, isSaved } = useFavorites();

  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    return state.listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q)
    );
  }, [state.listings, filter]);

  return (
    <div className="listings-page">
      <div className="listings-header">
        <h1 className="listings-title">Find your next stay</h1>
        <div className="listings-controls">
          <SearchBar />
          <SavedBadge count={count} />
          <SavedListings />
        </div>
      </div>

      {isLoading && <Spinner />}

      {isError && (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ color: '#c0392b', marginBottom: '16px' }}>
            Failed to load listings. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            style={{
              padding: '10px 24px',
              borderRadius: '24px',
              background: '#ff385c',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <p className="listings-count">
            {filtered.length}{' '}
            {filtered.length === 1 ? 'listing' : 'listings'} found
          </p>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No listings match your search.</p>
            </div>
          ) : (
            <div className="listings-grid">
              {filtered.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  saved={isSaved(listing.id)}
                  onToggleSave={() => toggle(listing.id, listing.title)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
