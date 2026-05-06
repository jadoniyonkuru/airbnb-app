import { createContext, useContext, useReducer, Dispatch } from 'react';
import { State, Action } from './types';
import { reducer } from './reducer';

interface StoreContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext<StoreContextType | null>(null);

const initialState: State = {
  listings: [],
  loading: true,
  filter: '',
  saved: [],
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextType {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside a StoreProvider');
  }
  return context;
}