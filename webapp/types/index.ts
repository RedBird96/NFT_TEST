type Assets = {
  token_address: string,
  token_id: string,
  amount: string,
  owner_of: string,
  token_hash: string,
  block_number_minted:string,
  block_number:string,
  contract_type:string,
  name:string,
  symbol:string,
  token_uri:string,
  metadata:{
    name:string,
    description:string,
    image:string,
    edition:number,
    attributes:any[]
  },
  last_token_uri_sync:string,
  last_metadata_sync:string,
  minter_address:string
};
type Collection = {
  tokenAddress:string,
  contractType:string,
  name:string,
  symbol:string,
  chain:string
};
type OrderBy = "sale_date" | "sale_count" | "sale_price";
type OrderDirection = "asc" | "desc";

export type { Assets, Collection, OrderBy, OrderDirection };
