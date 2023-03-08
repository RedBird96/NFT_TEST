import { Assets, Collection, OrderBy, OrderDirection } from "../types";
import constants from "../lib/constants";
import axios from "axios";

const API_SERVER = constants.API_URL || "https://localhost:3000";

export function getImgUrl(metadata:any) {

  let meta = JSON.parse(metadata);
 
  if (meta == null || (!meta.image && !meta.image_url)) return "";

  const img = meta.image || meta.image_url;
  
  if (!img.includes("ipfs://")) {
    return img;
  } else {
    return "https://ipfs.io/ipfs/" + img.substring(7);
  }
}

export function getOpenSeaUrl(asset:Assets) {
  if (asset == null || asset.token_address == null || asset.token_id == null)
    return "";
  const url = constants.OPENSEA_URL + asset.token_address + "/" + asset.token_id;
  return url;
}


export function makeShortAddress(address: string, limitLen = 7, showlen = 9): string {
  if (address.length > limitLen && address.length > showlen)
    return address.substring(0, showlen) + "..." + address.substring(address.length - showlen + 1, address.length);
  return address;
}

export async function getCollection(address:string, chain:number, cursor:string) {
  try{
    const response = await axios.get(`${API_SERVER}/allCollections/?address=${address}&chain=${chain}&cursor=${cursor}`);
    const error = response.data.result.error;
    let rcursor = "";
    let collections :Collection[] = [];

    if (!error && response.data.result.data.length > 0) {
      collections = response.data.result.data as Collection[];
      rcursor = response.data.result.cursor;
    }

    return {
      data: collections,
      cursor: rcursor,
      error: error
    }
  } catch (error) {
    
    return {
      data: [],
      cursor: '',
      error: true
    }
  }

}

export async function getNFTs(address:string, chain:number, collections: string[], cursor:string) {

  try{
    const col = collections.join('*');
    let url = collections.length == 0 ? 
      `${API_SERVER}/allNFTs/?address=${address}&chain=${chain}&cursor=${cursor}`:
      `${API_SERVER}/allNFTsByCollections/?address=${address}&chain=${chain}&collections=${col}&cursor=${cursor}`;

    const response = await axios.get(url);
    const error = response.data.result.error;
    let data :Assets[] = [];
    let rcursor = "";
    if (!error && response.data.result.data.length > 0) {
      data = response.data.result.data as Assets[];
      rcursor = response.data.result.cursor;
    }

    return {
      data: data,
      cursor:rcursor,
      error: error
    } 
  } catch (error) {
    
    return {
      data: [],
      cursor:'',
      error: true
    } 
  }
}

export function sortNFTs(asset:Assets[], orderby:OrderBy, orderdi:OrderDirection) {
  
  let result:Assets[] = [];
  if (orderdi == 'asc') {
    result = asset.sort((element1:Assets, element2:Assets) => Number(element1.block_number_minted) - Number(element2.block_number_minted));
  } else {
    result = asset.sort((element1:Assets, element2:Assets) => Number(element2.block_number_minted) - Number(element1.block_number_minted));
  }

  return result;

}