import useSWR from "swr";
import axios from "axios";
import { or, and } from "ramda";
import { Assets, Collection, OrderBy, OrderDirection } from "../types";
import constants from "../lib/constants";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const API_SERVER = constants.API_URL || "https://localhost:3000";

type Props = {
  address: string;
  chain: number;
  collections: string[];
};

function useFetchAssets(props: Props): {
  data: Assets[];
  isLoading: boolean;
  isError: boolean;
} {
  let nft_assets:Assets[] = [];
  const { address, chain, collections } = props;
  const col = collections.join('&');
  let url = collections.length == 0 ? 
    `${API_SERVER}/allNFTAndCollections/?address=${address}&chain=${chain}`:
    `${API_SERVER}/allNFTByCollections/?address=${address}&chain=${chain}&collections=${col}`;

  const { data, error } = useSWR(
    url,
    fetcher
  );
  console.log('data', data);
  if (!error && data != undefined && data.result.length != 0) {
    nft_assets = data.result.data as Assets[];
    nft_assets = nft_assets.filter((element:Assets) => element.symbol != null);
  }
  return {
    data: nft_assets,
    isLoading: and(!error, !data),
    isError: error,
  };
}

export default useFetchAssets;
