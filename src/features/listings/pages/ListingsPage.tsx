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
  // Trigger simulated async fetch on mount
  useListings();

  const { state } = useStore();
  const { listings, loading, filter } = state;
  const { toggle, count, isSaved } = useFavorites();

  // Only recalculate when listings or filter changes
  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    return listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q)
    );
  }, [listings, filter]);

  return (
    <div className="listings-page">
      {/* Header */}
      <div className="listings-header">
        <h1 className="listings-title">Find your next stay</h1>
        <div className="listings-controls">
          <SearchBar />
          <SavedBadge count={count} />
          <SavedListings />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
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