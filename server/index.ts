import * as dotenv from 'dotenv';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import express, { Application } from "express";
import cors from "cors"
dotenv.config();

const app = express();
const port = process.env.API_SERVER_PORT || 3001;
const api_key = process.env.API_KEY;

app.use(express.json());
app.use(cors());

/**
 * Fetch all nfts
 * @param req - address, chain, cursor
 * @param res - nft, cursor, error
 */
app.get("/allNFTs", async(req, res) => {
  try{
    const {query} = req;
    let NFTs;

    if (query.cusor != "") {
      NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
        address: query.address as string,
        chain: query.chain as unknown as number,
        cursor: query.cursor as string,
        limit:100,
      });
    } else {
      NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
        address: query.address as string,
        chain: query.chain as unknown as number,
        limit:100,
      });
    }

    const result = 
    {
      data:NFTs.raw.result,
      cursor:NFTs.raw.cursor,
      error:false,
    };
    return res.status(200).json({result});
  } catch (e) {
    const result = 
    {
      data:[],
      cursor:"",
      error:true,
    };
    console.log('error', e);
    return res.status(400).json(result);
  }
});

/**
 * Fetch all nfts by collection info
 * @param req - address, chain, collections, cursor
 * @param res - nft, cursor, error
 */
app.get("/allNFTsByCollections", async(req, res) => {
  try{
    const {query} = req;
    let NFTs;
    const collections:string = query.collections as string;
    const tokenAddresses = collections.split('*');
    console.log('tokenAddresses', collections, tokenAddresses);
    if (query.cusor != "") {
      NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
        address: query.address as string,
        chain: query.chain as unknown as number,
        tokenAddresses: tokenAddresses,
        cursor: query.cursor as string,
        limit:50,
      });
    } else {
      NFTs = await Moralis.EvmApi.nft.getWalletNFTs({
        address: query.address as string,
        chain: query.chain as unknown as number,
        tokenAddresses: tokenAddresses,
        limit:50
      });
    }

    const result = 
    {
      data:NFTs.raw.result,
      cursor:NFTs.raw.cursor,
      error:false,
    };
    return res.status(200).json({result});
  } catch (e) {
    const result = 
    {
      data:[],
      cursor:"",
      error:true,
    };
    console.log(e);
    return res.status(400).json(result);
  }  
});

/**
 * Fetch all collections
 * @param req - address, chain, cursor
 * @param res - collections, cursor, error
 */
app.get("/allCollections", async(req, res) => {
  try{
    const {query} = req;
    let response;
    if (query.cursor != "") {
      response = await Moralis.EvmApi.nft.getWalletNFTCollections({
        address: query.address as string,
        chain: query.chain as unknown as number,
        cursor:query.cursor as string
      });
    } else {
      response = await Moralis.EvmApi.nft.getWalletNFTCollections({
        address: query.address as string,
        chain: query.chain as unknown as number
      });
    }

    const result = 
    {
      data:response.result,
      cursor:response.pagination.cursor,
      error:false,
    };

    return res.status(200).json({result});
  } catch (e) {
    const result = 
    {
      data:[],
      cursor:"",
      error:true,
    };
    console.log(e);
    return res.status(400).json(result);
  }
});

Moralis.start({
  apiKey: api_key,
}).then(() => {
  app.listen(port, () => {
    console.log(`Test Moralis server started:${port}`);
  });
});