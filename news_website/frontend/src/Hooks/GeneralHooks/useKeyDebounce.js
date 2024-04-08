import { useState, useEffect } from 'react';

function useKeyDebounce(value, key, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [debouncedKey, setDebouncedKey] = useState(key);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    setDebouncedKey(key);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, key, delay]);

  return { debouncedKey, debouncedValue };
}

export default useKeyDebounce;