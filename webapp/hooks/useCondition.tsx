import React, { useContext } from "react";
import { useState } from "react";

interface ConditionInterface {
  appTokenAddress: string[];
  setAppTokenAddress: (data:string[]) => void;
  appUserAddress: string;
  setAppUserAddress: (address:string) => void;
  appCollectionCursor: string;
  setAppCollectionCursor: (data:string) => void;
  appAssetCursor: string;
  setAppAssetCursor: (cursor:string) => void;
}

const ConditionContext: React.Context<null | ConditionInterface> =
  React.createContext<null | ConditionInterface>(null);

export function ConditionProvider({children}:any) {

  const [tokenAddess, setTokenAddress] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("0xd8da6bf26964af9d7eed9e03e53415d37aa96045");
  const [cursor, setCursor] = useState<string>("");
  const [collectionCursor, setCollectionCursor] = useState<string>("");
  return(
    <ConditionContext.Provider
      value={{
        appTokenAddress:tokenAddess,
        setAppTokenAddress:setTokenAddress,
        appUserAddress:address,
        setAppUserAddress:setAddress,
        appCollectionCursor:cursor,
        setAppCollectionCursor:setCursor,
        appAssetCursor:collectionCursor,
        setAppAssetCursor: setCollectionCursor,
      }}    
    >
        {children}
    </ConditionContext.Provider>
  );
}

export function useCondition() {
  const context = useContext(ConditionContext);
  if (!context) {
    throw new Error("Missing Condition context");
  }

  return context;
}