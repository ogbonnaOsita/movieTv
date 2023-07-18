import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const search = setTimeout(() => {
      console.log("setting debounced value");
      setDebounceValue(value);
    }, delay);

    return () => {
      console.log("removing debounced value");
      clearTimeout(search);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
