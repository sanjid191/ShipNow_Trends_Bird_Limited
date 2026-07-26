import React, { createContext, useContext, useState } from 'react';
import { shipmentsData } from '../data/shipmentsData';

const ShipmentsContext = createContext(null);

export function ShipmentsProvider({ children }) {
  const [shipments, setShipments] = useState(shipmentsData);

  const addShipment = (newShipment) => {
    setShipments((prev) => [
      {
        ...newShipment,
        dateSort: new Date().toISOString(), // Use current time for sorting
        progress: 0 // New shipments start at 0% progress
      },
      ...prev
    ]);
  };

  return (
    <ShipmentsContext.Provider value={{ shipments, addShipment }}>
      {children}
    </ShipmentsContext.Provider>
  );
}

export function useShipments() {
  const context = useContext(ShipmentsContext);
  if (!context) {
    throw new Error('useShipments must be used within a ShipmentsProvider');
  }
  return context;
}
