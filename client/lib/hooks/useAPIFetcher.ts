import React from "react";

//recoil
import { APIFetcher } from "@/lib/services";

export function useAPIFetcher<T, E = undefined | null>(key: string) {
  const [state, setState] = React.useState({
    data: null,
    error: null,
  });

  const fetchData = React.useCallback(() => {
    APIFetcher(key)
      .then((data) => {
        setState({ data, error: null });
      })
      .catch((error) => {
        setState({ data: null, error });
      });
  }, [key]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return state;
}
