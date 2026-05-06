import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStore } from '../../../store/storeContext';
import { listings as mockListings } from '../../../data/listings';
import { Listing } from '../types';

// Simulate an API fetch using mock data
// In production replace this with: api.get<Listing[]>('/listings')
const fetchListings = async (): Promise<Listing[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return mockListings;
};

export function useListings() {
  const { dispatch } = useStore();

  // useQuery handles loading, error, caching automatically
  // No manual useState or useEffect needed for data fetching
  const query = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  // Sync fetched data into global store so other components can access it
  useEffect(() => {
    if (query.data) {
      dispatch({ type: 'SET_LISTINGS', payload: query.data });
    }
  }, [query.data, dispatch]);

  // Return full query result — page can access isLoading, isError, data
  return query;
}