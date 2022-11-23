import { useEffect, useState } from "react";
export default function useFetch(url, setData, token) {
  const [state, setState] = useState({
    data: [],
    isLoading: true,
  });
  let params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  useEffect(() => {
    (async () => {
      const response = await fetch(url, params);
      const responseData = await response.json();
      if (response.ok) {
        setState((state) => ({
          ...state,
          data: responseData,
          isLoading: false,
        }));
      } else {
        setState((state) => ({ ...state, isLoading: false }));
      }
    })();
  }, [state.data, state.isLoading]);
  return [state.data, state.isLoading];
}
