import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../utils/storage";

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
) => {
  const [value, setValue] = useState<T>(() => {
    return readStorage(key, initialValue);
  });

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
