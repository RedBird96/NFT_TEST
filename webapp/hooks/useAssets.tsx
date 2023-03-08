import React, { useContext } from "react";
import { useState } from "react";
import { Assets, Collection } from "../types";

interface AssetsInterface {
  appAsset: Assets[];
  setAppAsset: (data:Assets[]) => void;
  appCollection: Collection[];
  setAppCollection: (data:Collection[]) => void;
}

const AssetContext: React.Context<null | AssetsInterface> =
  React.createContext<null | AssetsInterface>(null);

export function AssetProvider({children}:any) {

  const [assetsData, setAssetstData] = useState<Assets[]>([]);
  const [collectionData, setCollectionData] = useState<Collection[]>([]);
  return(
    <AssetContext.Provider
      value={{
        appAsset:assetsData,
        setAppAsset:setAssetstData,
        appCollection:collectionData,
        setAppCollection:setCollectionData
      }}    
    >
        {children}
    </AssetContext.Provider>
  );
}

export function useAssets() {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("Missing Asset context");
  }

  return context;
}