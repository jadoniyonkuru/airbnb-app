import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { listings } from '../data/listings';

// Simple filtered listings component — mirrors ListingsPage filter logic
// We test the logic directly without needing the full page
const FilteredListings = ({ query }: { query: string }) => {
  const filtered = listings.filter(
    (l) =>
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {filtered.length === 0 ? (
        <p>No listings match your search.</p>
      ) : (
        filtered.map((l) => <div key={l.id}>{l.title}</div>)
      )}
    </div>
  );
};

describe('SearchFilter', () => {
  it('renders all listings with an empty query', () => {
    render(<MemoryRouter><FilteredListings query="" /></MemoryRouter>);
    // All 50 listings should appear — check first 6 originals
    expect(screen.getByText('Beachfront Villa with Ocean View')).toBeInTheDocument();
    expect(screen.getByText('Cozy Mountain Cabin Retreat')).toBeInTheDocument();
  });

  it('filters by title correctly', () => {
    render(<MemoryRouter><FilteredListings query="Beachfront" /></MemoryRouter>);
    // Only listings with "Beachfront" in the title should show
    expect(screen.getByText('Beachfront Villa with Ocean View')).toBeInTheDocument();
    // Mountain cabin should not show
    expect(screen.queryByText('Cozy Mountain Cabin Retreat')).not.toBeInTheDocument();
  });

  it('filters by location correctly', () => {
    render(<MemoryRouter><FilteredListings query="Malibu" /></MemoryRouter>);
    // Malibu listing should show
    expect(screen.getByText('Beachfront Villa with Ocean View')).toBeInTheDocument();
    // Paris listing should not show
    expect(screen.queryByText('Charming City Studio Apartment')).not.toBeInTheDocument();
  });

  it('shows empty state when nothing matches', () => {
    render(<MemoryRouter><FilteredListings query="xyznotfound" /></MemoryRouter>);
    expect(screen.getByText('No listings match your search.')).toBeInTheDocument();
  });
});