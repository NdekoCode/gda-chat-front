import { useEffect, useLayoutEffect, useState } from "react";
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

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
export function useProfile() {
  const [state, setState] = useState({
    visible: false,
  });
  const [profile, setProfile] = useState(false);
  const handleProfile = () => {
    setProfile((p) => !p);
    setState((d) => ({ ...d, visible: false }));
  };
  const handleStickyVisible = () => {
    setState((d) => ({ ...d, visible: !state.visible }));
  };
  return [state, profile, handleProfile, handleStickyVisible];
}
