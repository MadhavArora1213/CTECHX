import React from 'react';
import { InventoryProvider } from '../../contexts/InventoryContext';

const GameRouteWrapper = ({ children }) => {
  return <InventoryProvider>{children}</InventoryProvider>;
};

export default GameRouteWrapper;