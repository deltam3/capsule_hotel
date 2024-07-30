import { useState, useEffect } from "react";

export function useLocalStorageState<T>(
  initialState: T,
  key: string
): [T, (value: T | ((prevState: T) => T)) => void] {
  const [value, setValue] = useState<T>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
