import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingCard from '../features/listings/components/ListingCard';
import { Listing } from '../features/listings/types';

// Mock listing used across all tests
const mockListing: Listing = {
  id: 1,
  title: 'Beachfront Villa',
  location: 'Malibu, California',
  price: 420,
  rating: 4.97,
  superhost: true,
  available: true,
  availableFrom: '2025-01-12',
  img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=260&fit=crop',
  category: 'beach',
};

// Helper — ListingCard uses useNavigate so it needs MemoryRouter
const renderCard = (props: Partial<Parameters<typeof ListingCard>[0]> = {}) => {
  return render(
    <MemoryRouter>
      <ListingCard
        listing={mockListing}
        saved={false}
        onToggleSave={vi.fn()}
        {...props}
      />
    </MemoryRouter>
  );
};

describe('ListingCard', () => {
  it('renders the listing title', () => {
    renderCard();
    // Assert title text is visible in the document
    expect(screen.getByText('Beachfront Villa')).toBeInTheDocument();
  });

  it('renders the formatted price', () => {
    renderCard();
    // numeral formats 420 as $420 — assert it appears
    expect(screen.getByText('$420')).toBeInTheDocument();
  });

  it('shows Superhost badge when superhost is true', () => {
    renderCard({ listing: { ...mockListing, superhost: true } });
    expect(screen.getByText('Superhost')).toBeInTheDocument();
  });

  it('does not show Superhost badge when superhost is false', () => {
    renderCard({ listing: { ...mockListing, superhost: false } });
    // queryByText returns null instead of throwing — correct for absence checks
    expect(screen.queryByText('Superhost')).not.toBeInTheDocument();
  });

  it('calls onToggleSave when heart button is clicked', () => {
    const onToggleSave = vi.fn();
    renderCard({ onToggleSave });

    // Find heart button by role and click it
    const heartBtn = screen.getByRole('button');
    fireEvent.click(heartBtn);

    // Assert callback was called exactly once
    expect(onToggleSave).toHaveBeenCalledTimes(1);
  });
});