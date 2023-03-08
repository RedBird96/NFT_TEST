import { ChangeEvent, useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Select } from "@chakra-ui/select";
import { Box, Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { map } from "ramda";

import constants from "../lib/constants";

import { Collection, OrderBy, OrderDirection } from "../types";
import { Checkbox, CheckboxGroup, InputGroup, InputLeftElement, VStack } from "@chakra-ui/react";
import { useCondition } from "../hooks/useCondition";
import useDebounce from "../hooks/useDebounce";
import { useAssets } from "../hooks/useAssets";
import { MdSearch } from "react-icons/md";

type Props = {
  collections: Collection[];
  setOrderBy: (val: OrderBy) => void;
  setOrderDirection: (val: OrderDirection) => void;
  setReadCollection: (val: boolean) => void;
};

type FilterCollection = {
  collection:Collection;
  status:boolean;
}

const Filters = (props: Props) => {

  const { collections, setOrderBy, setOrderDirection, setReadCollection } = props;
  const [allCollections, setAllCollection] = useState<FilterCollection[]>([]);
  const [showCollections, setShowCollection] = useState<FilterCollection[]>([]);
  const {appTokenAddress, setAppTokenAddress, setAppAssetCursor} = useCondition();
  const [tempCollections, setTempCollections] = useState<string[]>(appTokenAddress);
  const deboundCollections = useDebounce(tempCollections, 500);
  const [collectionName, setCollectionName] = useState<string>("");
  const {setAppAsset} = useAssets();

  const handleChangeSelection = (value: string[]) => {
    setTempCollections(value);
    value.forEach((oneSelection:string) => {
      const temp = allCollections.find((element:FilterCollection) => element.collection.tokenAddress.toLowerCase() == oneSelection.toLowerCase());
      if (temp != undefined) {
        temp.status = true;
      }
    });    
  }

  const handleScroll = async (e:any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= (e.target.clientHeight);
    if (bottom) { 
      setReadCollection(true);
    } else {
      setReadCollection(false);
    }
  }

  useMemo(() => {
    const temp = collections.map((element:Collection) => {
      return {
        collection:element,
        status:false
      }
    });
    setAllCollection(temp);
    setShowCollection(temp);
  }, [collections])

  useMemo(() => {
    setAppAssetCursor('');
    setAppAsset([]);
    setAppTokenAddress(deboundCollections);
  },[deboundCollections])

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    const findAddress = event.target.value;
    setCollectionName(findAddress);    
    if (findAddress == "") {
      setShowCollection(allCollections);
    } else {
      const res = allCollections.filter((element:FilterCollection) => element.collection.symbol != null && element.collection.symbol.startsWith(findAddress));
      if (res != undefined)
        setShowCollection(res);
    }
  }

  return (
    <Accordion defaultIndex={0} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Order
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Select
            size={"sm"}
            mb="2"
            variant={"filled"}
            onChange={(e:any) =>
              setOrderDirection(e.target.value as OrderDirection)
            }
          >
            {map(
              (item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ),
              constants.ORDER_DIRECTION
            )}
          </Select>
          <Select
            size={"sm"}
            variant={"filled"}
            onChange={(e:any) => setOrderBy(e.target.value as OrderBy)}
          >
            {map(
              (item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ),
              constants.ORDER_BY
            )}
          </Select>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Collections
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel 
          overflow={'auto'}
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'black',
              borderRadius: '24px',
            },
          }}
          onScroll={handleScroll}
        >
          <InputGroup mb={3}>
            <InputLeftElement
              className="InputLeft"
              pointerEvents="none"
              children={<MdSearch/>}
              height={'32px'}
            />
            <Input 
              className="Input" 
              value={collectionName}
              onChange={handleSearchChange}
              variant="outline" 
              size="sm" 
              type="search"
              placeholder='Search collection...' 
              borderRadius={10}
            />
          </InputGroup>
          <CheckboxGroup 
            onChange={handleChangeSelection} 
            value={tempCollections}
          >
            <VStack alignItems={'flex-start'} h={'xl'}>              
              {
                showCollections.length > 0 && showCollections.map((item:FilterCollection, index) => {
                  if (item.collection.symbol == null || item.collection.symbol == "")
                    return;
                  return (
                    <Checkbox key = {index} value={item.collection.tokenAddress} checked={item.status}>
                      {item.collection.symbol}
                    </Checkbox>
                  )
                })
              }
            </VStack>
          </CheckboxGroup>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Filters;
