// src/context/InventoryContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

/**
 * Context for managing player inventory across the game
 */
const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [equippedItems, setEquippedItems] = useState({});
  const [inventoryStats, setInventoryStats] = useState({
    totalItems: 0,
    itemsByRarity: {},
    itemsByType: {},
    equippedCount: 0
  });

  // Get user from auth context
  const { user } = useAuth();

  // Fetch inventory on mount or when user changes
  useEffect(() => {
    if (!user?.id) return;
    fetchInventory();
  }, [user?.id]);

  // Calculate inventory stats whenever inventory changes
  useEffect(() => {
    calculateInventoryStats();
  }, [inventory]);

  // Fetch user's inventory
  const fetchInventory = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/game/inventory`, {
        params: { userId: user.id }
      });

      setInventory(response.data);

      // Track equipped items for quick access
      const equipped = {};
      response.data.forEach(item => {
        if (item.isEquipped) {
          equipped[item.type] = item.id;
        }
      });
      setEquippedItems(equipped);
    } catch (err) {
      console.error('Error fetching inventory:', err);
      setError('Failed to load inventory. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Calculate inventory statistics
  const calculateInventoryStats = () => {
    const stats = {
      totalItems: inventory.length,
      itemsByRarity: {},
      itemsByType: {},
      equippedCount: 0
    };

    inventory.forEach(item => {
      // Count by rarity
      stats.itemsByRarity[item.rarity] = (stats.itemsByRarity[item.rarity] || 0) + 1;
      
      // Count by type
      stats.itemsByType[item.type] = (stats.itemsByType[item.type] || 0) + 1;
      
      // Count equipped items
      if (item.isEquipped) {
        stats.equippedCount++;
      }
    });

    setInventoryStats(stats);
  };

  // Add a new item to inventory
  const addItem = useCallback(async (item) => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/api/game/inventory/add`, {
        userId: user.id,
        item
      });

      if (response.data.success) {
        // If the same item exists, increase quantity
        const existingItem = inventory.find(i => i.itemId === item.itemId);
        
        if (existingItem) {
          setInventory(inventory.map(i => 
            i.itemId === item.itemId 
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ));
        } else {
          // Otherwise add as new item
          setInventory([...inventory, { ...item, id: response.data.itemId }]);
        }
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding item to inventory:', err);
      setError('Failed to add item to inventory.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, user?.id]);

  // Remove an item from inventory
  const removeItem = useCallback(async (itemId, quantity = 1) => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/api/game/inventory/remove`, {
        userId: user.id,
        itemId,
        quantity
      });

      if (response.data.success) {
        // Find the item
        const itemToUpdate = inventory.find(i => i.id === itemId);
        
        if (itemToUpdate) {
          if (itemToUpdate.quantity <= quantity) {
            // Remove entirely if quantity is exhausted
            setInventory(inventory.filter(i => i.id !== itemId));
            
            // If this was equipped, update equipped items
            if (itemToUpdate.isEquipped) {
              const newEquipped = { ...equippedItems };
              delete newEquipped[itemToUpdate.type];
              setEquippedItems(newEquipped);
            }
          } else {
            // Otherwise just decrease quantity
            setInventory(inventory.map(i => 
              i.id === itemId 
                ? { ...i, quantity: i.quantity - quantity }
                : i
            ));
          }
        }
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error removing item from inventory:', err);
      setError('Failed to remove item from inventory.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, user?.id, equippedItems]);

  // Use an item
  const useItem = useCallback(async (itemId) => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/api/game/inventory/use`, {
        userId: user.id,
        itemId
      });

      if (response.data.success) {
        // Check if item should be removed after use
        const item = inventory.find(i => i.id === itemId);
        
        if (item && item.consumable) {
          // Remove or decrease quantity for consumable items
          await removeItem(itemId, 1);
        }
        
        // Return any effects or results from using the item
        return response.data.effects || true;
      }
      return false;
    } catch (err) {
      console.error('Error using item:', err);
      setError('Failed to use item.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, removeItem, user?.id]);

  // Equip or unequip an item
  const toggleEquipItem = useCallback(async (itemId) => {
    if (!user?.id) return;

    const item = inventory.find(i => i.id === itemId);
    if (!item) return false;

    setIsLoading(true);
    setError(null);

    try {
      // Determine if we're equipping or unequipping
      const isEquipping = !item.isEquipped;
      
      const response = await axios.post(`/api/game/inventory/equip`, {
        userId: user.id,
        itemId,
        equip: isEquipping
      });

      if (response.data.success) {
        // Update local state
        if (isEquipping) {
          // Unequip any other item of the same type
          if (equippedItems[item.type]) {
            setInventory(inventory.map(i => 
              i.id === equippedItems[item.type] 
                ? { ...i, isEquipped: false }
                : i
            ));
          }
          
          // Set this as the equipped item for this type
          setEquippedItems({ ...equippedItems, [item.type]: itemId });
        } else {
          // Remove this as the equipped item for this type
          const newEquipped = { ...equippedItems };
          delete newEquipped[item.type];
          setEquippedItems(newEquipped);
        }
        
        // Update the item's equipped status
        setInventory(inventory.map(i => 
          i.id === itemId 
            ? { ...i, isEquipped: isEquipping }
            : i
        ));
        
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error toggling equip status:', err);
      setError('Failed to equip/unequip item.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [inventory, equippedItems, user?.id]);

  // Get equipped item of a certain type
  const getEquippedItemByType = useCallback((type) => {
    const equippedId = equippedItems[type];
    if (!equippedId) return null;
    return inventory.find(item => item.id === equippedId) || null;
  }, [inventory, equippedItems]);

  // Filter inventory by type, rarity, etc.
  const filterInventory = useCallback(({ type, rarity, usable, equipped }) => {
    return inventory.filter(item => {
      if (type && item.type !== type) return false;
      if (rarity && item.rarity !== rarity) return false;
      if (usable !== undefined && item.usable !== usable) return false;
      if (equipped !== undefined && item.isEquipped !== equipped) return false;
      return true;
    });
  }, [inventory]);

  // Sort inventory by various criteria
  const sortInventory = useCallback((criteria = 'name', direction = 'asc') => {
    const sortedInventory = [...inventory].sort((a, b) => {
      let valueA, valueB;
      
      switch (criteria) {
        case 'name':
          valueA = a.name.toLowerCase();
          valueB = b.name.toLowerCase();
          break;
        case 'rarity':
          // Custom rarity ordering
          const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
          valueA = rarityOrder[a.rarity] || 0;
          valueB = rarityOrder[b.rarity] || 0;
          break;
        case 'level':
          valueA = a.level || 0;
          valueB = b.level || 0;
          break;
        case 'acquired':
          valueA = new Date(a.acquiredDate).getTime();
          valueB = new Date(b.acquiredDate).getTime();
          break;
        default:
          valueA = a[criteria] || '';
          valueB = b[criteria] || '';
      }
      
      // Compare based on direction
      if (direction === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    return sortedInventory;
  }, [inventory]);

  // Calculate player's total stats based on equipped items
  const calculateEquippedStats = useCallback(() => {
    const equippedItems = inventory.filter(item => item.isEquipped);
    
    const totalStats = equippedItems.reduce((stats, item) => {
      if (!item.stats) return stats;
      
      // Combine all stats from equipped items
      Object.entries(item.stats).forEach(([key, value]) => {
        stats[key] = (stats[key] || 0) + value;
      });
      
      return stats;
    }, {});
    
    return totalStats;
  }, [inventory]);

  // Context value
  const value = {
    inventory,
    isLoading,
    error,
    fetchInventory,
    addItem,
    removeItem,
    useItem,
    toggleEquipItem,
    getEquippedItemByType,
    filterInventory,
    sortInventory,
    inventoryStats,
    calculateEquippedStats,
    equippedItems
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook for using the inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export default InventoryContext;