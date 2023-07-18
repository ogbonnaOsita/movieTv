import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const search = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(search);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
