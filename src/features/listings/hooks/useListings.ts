import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useStore } from '../../../store/storeContext';
import { listings as mockListings } from '../../../data/listings';
import { Listing } from '../types';
import api from '../../../lib/axios';

const fetchListings = async (): Promise<Listing[]> => {
  try {
    const { data } = await api.get<Listing[]>('/listings');
    return data;
  } catch {
    // No real backend yet — return mock data as fallback
    return mockListings;
  }
};

export function useListings() {
  const { dispatch } = useStore();

  const query = useQuery({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });

  // Sync fetched data into global store so other components (SavedListings etc.) can access it
  useEffect(() => {
    if (query.data) {
      dispatch({ type: 'SET_LISTINGS', payload: query.data });
    }
  }, [query.data, dispatch]);

  return query;
}
