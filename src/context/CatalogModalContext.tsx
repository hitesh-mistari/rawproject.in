import React, { createContext, useContext, useState } from 'react';
import CatalogModal from '../components/common/CatalogModal';

interface CatalogModalContextType {
  isCatalogOpen: boolean;
  openCatalog: () => void;
  closeCatalog: () => void;
}

const CatalogModalContext = createContext<CatalogModalContextType | undefined>(undefined);

export const CatalogModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const openCatalog = () => setIsCatalogOpen(true);
  const closeCatalog = () => setIsCatalogOpen(false);

  return (
    <CatalogModalContext.Provider value={{ isCatalogOpen, openCatalog, closeCatalog }}>
      {children}
      <CatalogModal isOpen={isCatalogOpen} onClose={closeCatalog} />
    </CatalogModalContext.Provider>
  );
};

export const useCatalogModal = () => {
  const context = useContext(CatalogModalContext);
  if (!context) {
    throw new Error('useCatalogModal must be used within a CatalogModalProvider');
  }
  return context;
};
