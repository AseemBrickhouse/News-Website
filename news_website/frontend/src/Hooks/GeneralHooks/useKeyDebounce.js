import { useState, useEffect } from 'react';

function useKeyDebounce(value, key, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncedKey, setDebouncedKey] = useState(key);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncedKey(key);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, key, delay]);

  return { debouncedKey, debouncedValue };
}

export default useKeyDebounce;