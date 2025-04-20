import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInventory } from '../../contexts/InventoryContext';
import { FaBoxOpen, FaSearch, FaSortAmountDown, FaArrowUp, FaArrowDown, FaInfoCircle, FaChevronRight, FaTimes, FaFire, FaBolt, FaShieldAlt, FaBrain } from 'react-icons/fa';
import { GiSwordman, GiMagicHat, GiPotionBall, GiChest } from 'react-icons/gi';

const InventoryView = () => {
  const { 
    inventory, 
    isLoading, 
    error, 
    toggleEquipItem, 
    useItem, 
    getEquippedItemByType,
    calculateEquippedStats
  } = useInventory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortCriteria, setSortCriteria] = useState('rarity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Item categories
  const categories = [
    { id: 'all', name: 'All Items', icon: FaBoxOpen },
    { id: 'weapon', name: 'Weapons', icon: GiSwordman },
    { id: 'armor', name: 'Armor', icon: FaShieldAlt },
    { id: 'accessory', name: 'Accessories', icon: GiMagicHat },
    { id: 'consumable', name: 'Consumables', icon: GiPotionBall },
    { id: 'key', name: 'Key Items', icon: GiChest }
  ];
  
  // Mock inventory data (replace with real data from inventoryContext)
  const mockInventory = [
    {
      id: 'debug-glasses',
      name: 'Debugging Glasses',
      description: 'Enhances your ability to find bugs in your code.',
      type: 'accessory',
      rarity: 'rare',
      level: 10,
      stats: { intellect: 15, concentration: 10 },
      icon: '🕶️',
      usable: false,
      equippable: true,
      isEquipped: true,
      quantity: 1
    },
    {
      id: 'syntax-sword',
      name: 'Syntax Sword',
      description: 'A powerful weapon for slaying syntax errors.',
      type: 'weapon',
      rarity: 'epic',
      level: 12,
      stats: { power: 20, precision: 15 },
      icon: '⚔️',
      usable: false,
      equippable: true,
      isEquipped: false,
      quantity: 1
    },
    {
      id: 'code-coffee',
      name: 'Coder\'s Coffee',
      description: 'Temporarily increases coding speed by 25%.',
      type: 'consumable',
      rarity: 'common',
      stats: { energy: 25, focus: 15 },
      icon: '☕',
      usable: true,
      equippable: false,
      quantity: 5
    },
    {
      id: 'algorithm-armor',
      name: 'Algorithm Armor',
      description: 'Protects you from complex computational problems.',
      type: 'armor',
      rarity: 'rare',
      level: 15,
      stats: { defense: 25, problemSolving: 15 },
      icon: '🛡️',
      usable: false,
      equippable: true,
      isEquipped: true,
      quantity: 1
    },
    {
      id: 'logic-potion',
      name: 'Logic Potion',
      description: 'Enhances logical thinking for 30 minutes.',
      type: 'consumable',
      rarity: 'uncommon',
      stats: { logic: 20, problemSolving: 10 },
      icon: '🧪',
      usable: true,
      equippable: false,
      quantity: 3
    },
    {
      id: 'api-key',
      name: 'API Key',
      description: 'Grants access to special API endpoints on CodeForge planet.',
      type: 'key',
      rarity: 'epic',
      icon: '🔑',
      usable: true,
      equippable: false,
      quantity: 1
    },
    {
      id: 'framework-gloves',
      name: 'Framework Gloves',
      description: 'Increases coding efficiency when working with frameworks.',
      type: 'accessory',
      rarity: 'uncommon',
      level: 8,
      stats: { efficiency: 10, adaptability: 15 },
      icon: '🧤',
      usable: false,
      equippable: true,
      isEquipped: false,
      quantity: 1
    },
    {
      id: 'database-shield',
      name: 'Database Shield',
      description: 'Protects against SQL injection attacks.',
      type: 'armor',
      rarity: 'rare',
      level: 14,
      stats: { defense: 20, security: 25 },
      icon: '🛡️',
      usable: false,
      equippable: true,
      isEquipped: false,
      quantity: 1
    }
  ];

  // Calculate total stats from equipped items
  const equippedStats = useMemo(() => {
    const stats = {};
    mockInventory
      .filter(item => item.isEquipped)
      .forEach(item => {
        if (item.stats) {
          Object.entries(item.stats).forEach(([key, value]) => {
            stats[key] = (stats[key] || 0) + value;
          });
        }
      });
    return stats;
  }, [mockInventory]);
  
  // Filter and sort inventory
  const filteredInventory = useMemo(() => {
    return mockInventory
      .filter(item => {
        // Filter by search term
        const matchesSearch = searchTerm === '' || 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
          
        // Filter by category
        const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        // Sort based on criteria
        let comparison = 0;
        
        switch (sortCriteria) {
          case 'name':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'rarity':
            const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3, legendary: 4 };
            comparison = rarityOrder[b.rarity] - rarityOrder[a.rarity];
            break;
          case 'level':
            comparison = (b.level || 0) - (a.level || 0);
            break;
          case 'quantity':
            comparison = b.quantity - a.quantity;
            break;
          default:
            comparison = 0;
        }
        
        // Apply sort direction
        return sortDirection === 'asc' ? comparison * -1 : comparison;
      });
  }, [mockInventory, searchTerm, selectedCategory, sortCriteria, sortDirection]);

  // Toggle sort direction when clicking the same criteria
  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('desc');
    }
  };
  
  // Handle item selection for detail view
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  
  // Close detail view
  const closeItemDetails = () => {
    setSelectedItem(null);
  };
  
  // Handle item equip toggle
  const handleEquipToggle = (itemId) => {
    // In a real app, replace this with actual toggleEquipItem call
    console.log(`Toggle equip for item: ${itemId}`);
  };
  
  // Handle item use
  const handleUseItem = (itemId) => {
    // In a real app, replace this with actual useItem call
    console.log(`Use item: ${itemId}`);
  };
  
  // Get color class based on rarity
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'epic': return 'bg-purple-500 text-white';
      case 'legendary': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  // Get rarity display name
  const getRarityName = (rarity) => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const detailsVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    exit: { 
      x: 300, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-900/30 border border-red-800 rounded-lg p-6 text-center">
          <p className="text-red-300 text-lg">Failed to load inventory. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 relative">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Inventory</h1>
        <p className="text-gray-400">
          Manage your items, equipment, and consumables.
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Inventory Stats and Filters (Left Column) */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4">
            <h2 className="font-bold text-xl text-white mb-4">Equipped Stats</h2>
            
            <div className="space-y-2">
              {Object.entries(equippedStats).length > 0 ? (
                Object.entries(equippedStats).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between items-center">
                    <span className="text-gray-300 capitalize flex items-center">
                      {stat === 'power' && <FaFire className="mr-1 text-red-500" />}
                      {stat === 'defense' && <FaShieldAlt className="mr-1 text-blue-500" />}
                      {stat === 'intellect' && <FaBrain className="mr-1 text-purple-500" />}
                      {stat === 'efficiency' && <FaBolt className="mr-1 text-yellow-500" />}
                      {stat}
                    </span>
                    <span className="text-white font-medium">+{value}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm italic">No items equipped</p>
              )}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
            <h2 className="font-bold text-xl text-white mb-4">Filters</h2>
            
            {/* Search */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
                Search
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  id="search"
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Find items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center ${
                      selectedCategory === category.id 
                        ? 'bg-blue-900/50 text-blue-400 border-l-4 border-blue-500' 
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <category.icon className="mr-2" />
                    {category.name}
                    {category.id === 'all' ? (
                      <span className="ml-auto bg-gray-700 rounded-full px-2 py-0.5 text-xs">
                        {mockInventory.length}
                      </span>
                    ) : (
                      <span className="ml-auto bg-gray-700 rounded-full px-2 py-0.5 text-xs">
                        {mockInventory.filter(item => item.type === category.id).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Item Grid (Right Column) */}
        <div className="lg:col-span-3">
          {/* Sort Controls */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-bold text-xl text-white">
                Items ({filteredInventory.length})
              </h2>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <button 
                  className={`px-3 py-1 rounded text-sm ${sortCriteria === 'name' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => handleSort('name')}
                >
                  Name {sortCriteria === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button 
                  className={`px-3 py-1 rounded text-sm ${sortCriteria === 'rarity' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => handleSort('rarity')}
                >
                  Rarity {sortCriteria === 'rarity' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
                <button 
                  className={`px-3 py-1 rounded text-sm ${sortCriteria === 'quantity' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => handleSort('quantity')}
                >
                  Qty {sortCriteria === 'quantity' && (sortDirection === 'asc' ? '↑' : '↓')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Items Grid */}
          {filteredInventory.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredInventory.map((item) => (
                <motion.div
                  key={item.id}
                  className={`bg-gray-800 border ${item.isEquipped ? 'border-blue-500' : 'border-gray-700'} rounded-lg overflow-hidden cursor-pointer hover:border-gray-500 transition-colors`}
                  variants={itemVariants}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="p-4">
                    <div className="flex items-start mb-2">
                      {/* Item icon */}
                      <div className={`w-12 h-12 rounded flex items-center justify-center text-xl ${getRarityColor(item.rarity)}`}>
                        {item.icon}
                      </div>
                      
                      {/* Item details */}
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-white">{item.name}</h3>
                          {item.quantity > 1 && (
                            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
                              x{item.quantity}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${getRarityColor(item.rarity)}`}>
                            {getRarityName(item.rarity)}
                          </span>
                          {item.level && (
                            <span className="ml-2 text-xs text-gray-400">
                              Lvl {item.level}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-2 h-10">
                      {item.description}
                    </p>
                    
                    {/* Item type and status */}
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                      {item.isEquipped && (
                        <span className="text-xs text-blue-400">
                          Equipped
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
              <FaBackpack className="mx-auto text-4xl text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No items found</h3>
              <p className="text-gray-400">Try adjusting your filters or exploring more to find items.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Item Details Side Panel */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={closeItemDetails}
            />
            
            {/* Side panel */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-gray-900 border-l border-gray-700 z-50 overflow-y-auto"
              variants={detailsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
                <h2 className="font-bold text-xl text-white">Item Details</h2>
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white"
                  onClick={closeItemDetails}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="p-4">
                {/* Item header */}
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl ${getRarityColor(selectedItem.rarity)}`}>
                    {selectedItem.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">{selectedItem.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${getRarityColor(selectedItem.rarity)}`}>
                        {getRarityName(selectedItem.rarity)}
                      </span>
                      {selectedItem.level && (
                        <span className="ml-2 text-xs bg-gray-700 px-2 py-0.5 rounded">
                          Level {selectedItem.level}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-sm text-gray-400 mb-1">Description</h4>
                  <p className="text-white">{selectedItem.description}</p>
                </div>
                
                {/* Stats */}
                {selectedItem.stats && Object.keys(selectedItem.stats).length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm text-gray-400 mb-1">Stats</h4>
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(selectedItem.stats).map(([stat, value]) => (
                          <div key={stat} className="flex items-center">
                            <span className="text-gray-400 capitalize">{stat}:</span>
                            <span className="ml-2 text-green-400">+{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Item info */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Type</h4>
                    <p className="text-white capitalize">{selectedItem.type}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Quantity</h4>
                    <p className="text-white">{selectedItem.quantity}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Equippable</h4>
                    <p className="text-white">{selectedItem.equippable ? 'Yes' : 'No'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 mb-1">Usable</h4>
                    <p className="text-white">{selectedItem.usable ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3">
                  {selectedItem.equippable && (
                    <button
                      className={`flex-1 py-2 rounded-md flex items-center justify-center ${
                        selectedItem.isEquipped
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-blue-600 text-white hover:bg-blue-500'
                      }`}
                      onClick={() => handleEquipToggle(selectedItem.id)}
                    >
                      {selectedItem.isEquipped ? 'Unequip' : 'Equip'}
                    </button>
                  )}
                  
                  {selectedItem.usable && (
                    <button
                      className="flex-1 bg-green-600 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-500"
                      onClick={() => handleUseItem(selectedItem.id)}
                    >
                      Use
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InventoryView;