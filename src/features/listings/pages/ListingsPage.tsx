import { useMemo } from 'react';
import { useStore } from '../../../store/StoreContext';
import { useListings } from '../hooks/useListings';
import { useFavorites } from '../hooks/useFavorites';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import SavedBadge from '../components/SavedBadge';
import Spinner from '../../../shared/components/Spinner';
import './ListingsPage.css';
import SavedListings from '../components/SavedListings';

export default function ListingsPage() {
  // Triggers the simulated async fetch on mount
  // dispatches SET_LOADING and SET_LISTINGS into the store
  useListings();

  // Read global state — no local state needed anymore
  const { state } = useStore();
  const { listings, loading, filter } = state;

  // useFavorites reads saved from store and returns helpers
  // no prop drilling — any component can call this hook
  const { toggle, count, isSaved } = useFavorites();

  // useMemo prevents recalculating the filtered list on every render
  // only recalculates when listings or filter actually changes
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
          {/* SearchBar now dispatches directly to store — no onChange prop */}
          <SearchBar />

          {/* SavedBadge reads count from useFavorites — no prop needed */}
          <SavedBadge count={count} />
          <SavedListings /> 
        </div>
      </div>

      {/* Show spinner while the simulated fetch is running */}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Results count */}
          <p className="listings-count">
            {filtered.length}{' '}
            {filtered.length === 1 ? 'listing' : 'listings'} found
          </p>

          {/* Empty state when nothing matches the search */}
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
                  // Derive saved state from store — no saved array prop
                  saved={isSaved(listing.id)}
                  // Pass toggle with id and title for the toast message
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