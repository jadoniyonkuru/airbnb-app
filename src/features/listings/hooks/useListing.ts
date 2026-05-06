import { useQuery } from '@tanstack/react-query';
import { listings as mockListings } from '../../../data/listings';
import { Listing } from '../types';

// Fetch a single listing by ID
const fetchListing = async (id: number): Promise<Listing> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const listing = mockListings.find((l) => l.id === id);
  if (!listing) throw new Error('Listing not found');
  return listing;
};

export function useListing(id: number | undefined) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListing(id!),
    // Only run query when id is actually provided
    // !!id converts undefined/0 to false, a real id to true
    enabled: !!id,
  });
}