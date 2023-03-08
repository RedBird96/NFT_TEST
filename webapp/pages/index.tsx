import React, { useEffect, useMemo, useState } from "react";
import { Grid, Box, Divider, Heading, Center, Flex, Link as Chakralink  } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Filter } from "react-feather";
import type { NextPage } from "next";
import Filters from "../components/Filters";
import Drawer from "../components/Drawer";
import { Assets, OrderBy, OrderDirection } from "../types";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import ModalAsset from "../components/ModalAsset";
import { useCondition } from "../hooks/useCondition";
import Asset from "../components/Asset";
import { getCollection, getNFTs, getImgUrl, getOpenSeaUrl, sortNFTs } from "../lib/utils";
import constants from "../lib/constants";
import { useAssets } from "../hooks/useAssets";

const Home: NextPage = () => {
  
  const {appAsset, setAppAsset, appCollection, setAppCollection} = useAssets();
  const {
    appUserAddress, 
    appTokenAddress, 
    appCollectionCursor, 
    setAppCollectionCursor, 
    appAssetCursor, 
    setAppAssetCursor
  } = useCondition();
  const [orderBy, setOrderBy] = React.useState<OrderBy>("sale_price");
  const [orderDirection, setOrderDirection] =
    React.useState<OrderDirection>("asc");
  // const { data, isLoading } = useFetchAssets({
  //   address: appUserAddress,
  //   chain: constants.NETWORKS.ETHEREUM.chainId,
  //   collections: appCollections,
  // });
  const [isReadNextCollection, setIsReadNextCollection] = useState<boolean>(false);
  const [isReadNextNft, setIsReadNextNft] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeAsset, setActiveAsset] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure();

  const fetchNFT = async() => {
    if (appAsset.length === 0)
      setLoading(true);
    const responseNFT = await getNFTs(appUserAddress, constants.NETWORKS.ETHEREUM.chainId, appTokenAddress, appAssetCursor===null?'':appAssetCursor)
    const asset = responseNFT.data;
    const temp = appAsset.concat(asset);
    setAppAsset(temp);
    setAppAssetCursor(responseNFT.cursor);
    setLoading(false);
    setIsReadNextNft(false);
  }

  const fetchCollection = async() => {
    const responseCollection = await getCollection(appUserAddress, constants.NETWORKS.ETHEREUM.chainId, appCollectionCursor===null?'':appCollectionCursor);
    const collection = responseCollection.data;
    const temp = appCollection.concat(collection);
    setAppCollection(temp);
    setAppCollectionCursor(responseCollection.cursor);
    setIsReadNextCollection(false);
  }
  
  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight
    if (bottom) {
      setIsReadNextNft(true);
    }
  };

  useMemo(() => {
    fetchCollection();
  }, [appUserAddress, isReadNextCollection]);
  useMemo(()=>{
    fetchNFT();
  }, [appUserAddress, appTokenAddress, isReadNextNft]);
  useMemo(() => {
    const temp = sortNFTs(appAsset, orderBy, orderDirection);
    setAppAsset(temp);
  }, [orderDirection, orderBy])

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function clickAsset(asset_id:string) {
    if (appAsset == undefined)
      return;

    const asset = appAsset.find((element:Assets) => element.token_id == asset_id);
    setActiveAsset(asset);
    onModalOpen();
  }

  function modalAssest() {
    return (
      <Modal blockScrollOnMount={false} isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>NFT Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalAsset
              asset={activeAsset}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Chakralink href={getOpenSeaUrl(activeAsset)} isExternal>
              <Button variant='ghost'>Go to OpenSea</Button>
            </Chakralink>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  function renderFiltersButton() {
    return (
      <React.Fragment>
        <Button
          display={["inline-flex", "inline-flex", "none"]}
          size={"sm"}
          onClick={onOpen}
          leftIcon={<Filter />}
        >
          Filters
        </Button>
        <Drawer isOpen={isOpen} header="Filters" onClose={onClose}>
          <Filters
            collections={appCollection}
            setOrderBy={setOrderBy}
            setOrderDirection={setOrderDirection}
            setReadCollection={setIsReadNextCollection}
          />
        </Drawer>
      </React.Fragment>
    );
  }

  return (
    <Grid w={'100%'} gridGap={"4"} gridTemplateColumns={["1fr", "1fr", "256px 1fr"]}>
      <Box
        display={["none", "none", "block"]}
        position={"sticky"}
        top={"0"}
        alignSelf={"start"}
      >
        <Heading fontSize={"2xl"} textTransform={"uppercase"} mb={"2"}>
          Filter
        </Heading>
        <Divider mb={"4"} />
        <Filters
          collections={appCollection}
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
          setReadCollection={setIsReadNextCollection}
        />
      </Box>
      <Box>
        <Flex justifyContent={"space-between"}>
          <Heading fontSize={"2xl"} textTransform={"uppercase"} mb={"2"}>
            NFTs
          </Heading>
          {renderFiltersButton()}
        </Flex>
        <Divider mb={"4"} />
        {isLoading ? (
          <Center height={'100%'}>
            <Spinner />
          </Center>
        ) : (
          <Grid
            gridGap={"4"}
            gridTemplateColumns={"repeat(auto-fill, minmax(222px, 1fr))"}
          >
            {
              appAsset && appAsset.map((element:Assets, index) => {
                if (element.metadata == null)
                  return;
                return (
                  <Asset 
                    key = {index}
                    id={element.token_id} 
                    image_url={getImgUrl(element.metadata)} 
                    name={element.name} 
                    onClickAsset={clickAsset} 
                  />
                )
              })
            }
          </Grid>
        )}
        {modalAssest()}
      </Box>
    </Grid>
  );
};

export default Home;
