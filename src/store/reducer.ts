import { State, Action } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LISTINGS':
      return { ...state, listings: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'TOGGLE_FAVORITE':
      const isAlreadySaved = state.saved.includes(action.payload);
      return {
        ...state,
        saved: isAlreadySaved
          ? state.saved.filter((id) => id !== action.payload)
          : [...state.saved, action.payload],
      };

    // RESET clears filter and saved — listings and loading stay untouched
    case 'RESET':
      return { ...state, filter: '', saved: [] };

    default:
      return state;
  }
}