import { useRef, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useStore } from '../../../store/StoreContext';

export default function SearchBar() {
  const { dispatch } = useStore();

  // Ref to directly access the input DOM element
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when the component first mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // debounce wraps the dispatch so it only fires 300ms
  // after the user STOPS typing — not on every keystroke.
  // useMemo ensures we create the debounced function only once,
  // not on every render
  const handleChange = useMemo(
    () =>
      debounce((value: string) => {
        dispatch({ type: 'SET_FILTER', payload: value });
      }, 300),
    [dispatch]
  );

  return (
    <input
      ref={inputRef}
      type="text"
      className="search-bar"
      placeholder="Search listings..."
      // Call the debounced dispatch on every keystroke
      // but it only actually runs 300ms after typing stops
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}