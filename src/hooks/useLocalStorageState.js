import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  // use callback lazy initialization. if we directly use fn, it will be called every render
  // but state default value is set only first render
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
