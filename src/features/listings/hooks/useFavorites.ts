import toast from 'react-hot-toast';
import { useStore } from '../../../store/storeContext';

export function useFavorites() {
  const { state, dispatch } = useStore();

  const isSaved = (id: number): boolean => state.saved.includes(id);

  const toggle = (id: number, title: string) => {
    const alreadySaved = isSaved(id);
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    toast(alreadySaved ? `Removed: ${title}` : `Saved: ${title}`, {
      icon: alreadySaved ? '💔' : '❤️',
    });
  };

  return {
    toggle,
    count: state.saved.length,
    isSaved,
  };
}