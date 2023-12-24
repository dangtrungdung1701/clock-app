import { useEffect, useState } from "react";

const useInterval = (callback, delay = 1000, isReturnData = false) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const interval = setInterval(() => {
      callback;
      if (isReturnData) {
        setData(callback());
      } else {
        callback();
      }
    }, delay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { data };
};

export default useInterval;
