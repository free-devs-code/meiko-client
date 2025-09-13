import React, { createContext, useContext, useState } from "react";
import { FolderItem, FileItem } from "../types/serviceTypes";

type BagContextType = {
  bagItems: Array<FolderItem | FileItem>;
  setBagItems: React.Dispatch<React.SetStateAction<Array<FolderItem | FileItem>>>;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const BagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bagItems, setBagItems] = useState<Array<FolderItem | FileItem>>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <BagContext.Provider value={{ bagItems, setBagItems, isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) throw new Error("useBag must be used inside BagProvider");
  return context;
};