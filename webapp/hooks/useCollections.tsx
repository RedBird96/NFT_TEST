import useSWR from "swr";
import axios from "axios";
import { or, and } from "ramda";

import constants from "../lib/constants";

import { Collection } from "../types";
import { useEffect, useMemo } from "react";
import { useCondition } from "./useCondition";

const API_SERVER = constants.API_URL || "https://localhost:3000";

function useCollections(chain: number): {
  data: Collection[];
  isLoading: boolean;
  isError: boolean;
} {
  const {appUserAddress} = useCondition();

  return useMemo(() => {
    let collections :Collection[] = [];
    let error:boolean = false;
    let response;

    const fetchCollection = async () => {

      response = await axios.get(`${API_SERVER}/allCollections/?address=${appUserAddress}&chain=${chain}`);
      error = response.data.result.error;
      if (response.data.result.data.length > 0) {
        collections = response.data.result.data as Collection[];
      }
    }

    fetchCollection();

    return {
      data: or(collections, []),
      isLoading: and(!error, !response),
      isError: error,
    }
  }, [appUserAddress]);

}

export default useCollections;
