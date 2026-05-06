import { useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { AutoSizer as _AutoSizer } from 'react-virtualized-auto-sizer';

// The @types package declares a default export but the JS ships a named export.
// Cast to a plain React component type so JSX compiles cleanly.
const AutoSizer = _AutoSizer as unknown as React.ComponentType<{
  children: (size: { height: number; width: number }) => React.ReactNode;
}>;
import { useStore } from '../../../store/storeContext';
import { useListings } from '../hooks/useListings';
import { useFavorites } from '../hooks/useFavorites';
import ListingCard from '../components/ListingCard';
import SearchBar from '../components/SearchBar';
import SavedBadge from '../components/SavedBadge';
import SavedListings from '../components/SavedListings';
import Spinner from '../../../shared/components/spinner';
import './ListingsPage.css';

const GAP = 24;
const MIN_CARD_WIDTH = 280;
const CARD_HEIGHT = 370;

export default function ListingsPage() {
  useListings();

  const { state } = useStore();
  const { listings, loading, filter } = state;
  const { toggle, count, isSaved } = useFavorites();

  const filtered = useMemo(() => {
    const q = filter.toLowerCase();
    return listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(q) ||
        listing.location.toLowerCase().includes(q)
    );
  }, [listings, filter]);

  // Stable callback — same reference every render so React.memo on ListingCard works
  const handleToggleSave = useCallback(
    (id: number, title: string) => toggle(id, title),
    [toggle]
  );

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
     // Fixed-height container — AutoSizer reads this to give FixedSizeList its dimensions
  <div style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}>
  <AutoSizer>
   {({ height, width }) => {
    // Match the CSS grid: minmax(280px, 1fr) auto-fill
   const cols = Math.max(1, Math.floor((width + GAP) / (MIN_CARD_WIDTH + GAP)));
    const rowCount = Math.ceil(filtered.length / cols);

  return (
  <List
    height={height}
    itemCount={rowCount}
     itemSize={CARD_HEIGHT + GAP}
     width={width}
                    >
                      {({ index, style }) => {
                        const start = index * cols;
                        const rowItems = filtered.slice(start, start + cols);

                        return (
                          <div style={{ ...style, display: 'flex', gap: `${GAP}px`, paddingBottom: `${GAP}px`, boxSizing: 'border-box' }}>
                            {rowItems.map((listing) => (
                              <div key={listing.id} style={{ flex: 1, minWidth: 0 }}>
                                <ListingCard
                                  listing={listing}
                                  saved={isSaved(listing.id)}
                                  onToggleSave={handleToggleSave}
                                />
                              </div>
                            ))}
                            {/* Pad empty slots in the last row so cards keep their width */}
                            {rowItems.length < cols &&
                              Array.from({ length: cols - rowItems.length }).map((_, i) => (
                                <div key={`pad-${i}`} style={{ flex: 1 }} />
                              ))}
                          </div>
                        );
                      }}
                    </List>
                  );
                }}
              </AutoSizer>
            </div>
          )}
        </>
      )}
    </div>
  );
}
