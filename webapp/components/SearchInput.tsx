import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ChangeEvent, useMemo, useState } from "react";
import { useCondition } from "../hooks/useCondition";
import useDebounce from "../hooks/useDebounce";
import { useAssets } from "../hooks/useAssets";
import {MdSearch}  from 'react-icons/md';

const SearchInput = () => {

  const {appUserAddress, setAppUserAddress, setAppCollectionCursor, setAppAssetCursor} = useCondition();
  const [tempUserAddress, setTempUserAddress] = useState<string>(appUserAddress);
  const deboundUserAddress = useDebounce(tempUserAddress, 500);
  const {setAppAsset, setAppCollection} = useAssets();
  
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    const findAddress = event.target.value.toLowerCase();
    setTempUserAddress(findAddress);
  }

  useMemo(() => {
    setAppAssetCursor("");
    setAppCollectionCursor("");
    setAppCollection([]);
    setAppAsset([]);
    setAppUserAddress(deboundUserAddress);
  },[deboundUserAddress])

  return (
    <Box w="100%">
      <InputGroup>
        <InputLeftElement
          className="InputLeft"
          pointerEvents="none"
          children={<MdSearch/>}
          height={'32px'}
        />
        <Input 
          className="Input" 
          value={tempUserAddress} 
          onChange={handleSearchChange}
          variant="outline" 
          size="sm" 
          type="search"
          placeholder='Search user address...' 
        />
      </InputGroup>
    </Box>
  );

}


export default SearchInput;