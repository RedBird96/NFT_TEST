import { Image } from "@chakra-ui/image";
import { Box, Flex, VStack,Link as Chakralink, AspectRatio } from "@chakra-ui/react";
import { Assets } from "../types";
import { getImgUrl, makeShortAddress } from "../lib/utils";

const ETHERSCAN_URL = "https://etherscan.io/address/";

type Props = {
  asset: Assets;
};

const DetailItem = ({...props}) => {
  return (
  <Box 
    justifyContent={'space-between'} 
    display={'flex'} 
    flexDirection={'row'} 
    width={'100%'} 
    borderBottom={'1px'} 
    {...props}
  />);
}

const ModalAsset = (props: Props) => {
  const { asset } = props;

  const lastupdate = new Date(asset.last_metadata_sync);
  const showdates = lastupdate.toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
  
  let img = getImgUrl(asset.metadata);

  console.log('asset', asset);
  return (
    <VStack width={'100%'}>
      <Box mb={2}>
        <Image src={img} alt="" borderRadius={"lg"} />
      </Box>
      <VStack width={'100%'}>
        <Box p={1} width={'100%'}>
          <DetailItem>
            <p>Contract Address</p>
            <a 
              href={ETHERSCAN_URL + asset.token_address} 
              target="_blank" 
              style={{color:'#2C95F2'}}
            >{makeShortAddress(asset.token_address)}</a>
          </DetailItem>
          <DetailItem>
            <p>Token ID</p>
            <a 
              href={asset.token_uri} 
              target="_blank" 
              style={{color:'#2C95F2'}}
            >{makeShortAddress(asset.token_id)}</a>
          </DetailItem>
          <DetailItem>
            <p>Token Standard</p>
            <p>{asset.contract_type}</p>
          </DetailItem>
          <DetailItem>
            <p>Chain</p>
            <p>Ethereum</p>
          </DetailItem>
          <DetailItem>
            <p>Last Updated</p>
            <p>{showdates}</p>
          </DetailItem>
        </Box>
      </VStack>
    </VStack>
  );
};

export default ModalAsset;
