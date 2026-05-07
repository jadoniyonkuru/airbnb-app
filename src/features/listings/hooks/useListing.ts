import { useQuery } from '@tanstack/react-query';
import { listings as mockListings } from '../../../data/listings';
import { Listing } from '../types';
import api from '../../../lib/axios';

const fetchListing = async (id: number): Promise<Listing> => {
  try {
    const { data } = await api.get<Listing>(`/listings/${id}`);
    return data;
  } catch {
    // No real backend yet — fall back to mock data
    const listing = mockListings.find((l) => l.id === id);
    if (!listing) throw new Error('Listing not found');
    return listing;
  }
};

export function useListing(id: number | undefined) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => fetchListing(id!),
    // Only run the query when a real id is provided
    enabled: !!id,
  });
}
