import { useState } from 'react';
import { listings } from '../../../data/listings';
import { Listing } from '../types';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import SavedBadge from '../components/SavedBadge';
import './ListingsPage.css';

export default function ListingsPage() {
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<number[]>([]);
  const [savedOnly, setSavedOnly] = useState(false);

  // Toggle a listing's saved state
  const handleToggleSave = (id: number) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  // Derive filtered list — no extra state
  const filtered: Listing[] = listings
    .filter((listing) => {
      const q = query.toLowerCase();
      return (
        listing.title.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q)
      );
    })
    .filter((listing) => (savedOnly ? saved.includes(listing.id) : true));

  return (
    <div className="listings-page">
      {/* Header */}
      <div className="listings-header">
        <h1 className="listings-title">Find your next stay</h1>

        <div className="listings-controls">
          <SearchBar value={query} onChange={setQuery} />

          <button
            className="toggle-btn"
            onClick={() => setSavedOnly((prev) => !prev)}
          >
            {savedOnly ? 'Show All' : 'Saved Only'}
          </button>

          <SavedBadge count={saved.length} />
        </div>
      </div>

      {/* Results count */}
      <p className="listings-count">
        {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} found
      </p>

      {/* Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No listings match your search.</p>
          <button onClick={() => { setQuery(''); setSavedOnly(false); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {filtered.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              saved={saved.includes(listing.id)}
              onToggleSave={() => handleToggleSave(listing.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}