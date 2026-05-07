import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '../../../store/storeContext';

// Simulate a POST /saved/:id — replace with api.post() when backend exists
const toggleSavedRequest = async (id: number): Promise<{ id: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { id };
};

export function useToggleSaved() {
  const queryClient = useQueryClient();
  const { dispatch } = useStore();

  return useMutation({
    mutationFn: toggleSavedRequest,

    // onMutate runs before the request — this is the optimistic update
    onMutate: async (id: number) => {
      // Cancel any in-flight ['saved'] queries so they don't overwrite the optimistic update
      await queryClient.cancelQueries({ queryKey: ['saved'] });

      // Snapshot the current cache so we can roll back on error
      const previousSaved = queryClient.getQueryData<number[]>(['saved']) ?? [];

      // Immediately toggle the id in the cache — UI updates before request completes
      const newSaved = previousSaved.includes(id)
        ? previousSaved.filter((s) => s !== id)
        : [...previousSaved, id];
      queryClient.setQueryData(['saved'], newSaved);

      // Also keep the global store in sync for components that read from it
      dispatch({ type: 'TOGGLE_FAVORITE', payload: id });

      // Return snapshot so onError can roll back
      return { previousSaved };
    },

    // onError rolls back the optimistic update if the request fails
    onError: (_err, id, context) => {
      if (context?.previousSaved) {
        queryClient.setQueryData(['saved'], context.previousSaved);
      }
      // Undo the store update as well
      dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    },

    // onSettled always runs — syncs cache with server regardless of success/failure
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['saved'] });
    },
  });
}
