// src/components/game/InventoryItem.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaInfoCircle, FaCheck, FaCog } from 'react-icons/fa';

/**
 * Game inventory item component with detailed view and use functionality
 */
const InventoryItem = ({
  id,
  name,
  description,
  type,
  icon,
  rarity = 'common',
  level = 1,
  stats = {},
  acquiredDate,
  isEquipped = false,
  usable = false,
  onUse = () => {},
  onEquip = () => {},
  className = '',
  quantity = 1,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Type-based styles and icons
  const typeConfig = {
    weapon: {
      icon: '⚔️',
      color: 'text-red-500',
      bgColor: 'bg-red-900/20',
      border: 'border-red-800/50',
    },
    tool: {
      icon: '🛠️',
      color: 'text-blue-500',
      bgColor: 'bg-blue-900/20',
      border: 'border-blue-800/50',
    },
    artifact: {
      icon: '🏺',
      color: 'text-purple-500',
      bgColor: 'bg-purple-900/20',
      border: 'border-purple-800/50',
    },
    consumable: {
      icon: '🧪',
      color: 'text-green-500',
      bgColor: 'bg-green-900/20',
      border: 'border-green-800/50',
    },
    badge: {
      icon: '🏅',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-900/20',
      border: 'border-yellow-800/50',
    },
    skill: {
      icon: '📚',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-900/20',
      border: 'border-cyan-800/50',
    },
  };

  // Rarity styles
  const rarityStyles = {
    common: {
      bg: 'from-gray-600 to-gray-800',
      text: 'text-gray-300',
      border: 'border-gray-500',
    },
    uncommon: {
      bg: 'from-green-600 to-green-900',
      text: 'text-green-300',
      border: 'border-green-500',
    },
    rare: {
      bg: 'from-blue-600 to-blue-900',
      text: 'text-blue-300',
      border: 'border-blue-500',
    },
    epic: {
      bg: 'from-purple-600 to-purple-900',
      text: 'text-purple-300',
      border: 'border-purple-500',
    },
    legendary: {
      bg: 'from-yellow-500 to-amber-800',
      text: 'text-yellow-300',
      border: 'border-yellow-500',
    },
  };

  // Format date to readable string
  const formattedDate = acquiredDate
    ? new Date(acquiredDate).toLocaleDateString()
    : null;

  const typeStyle = typeConfig[type] || typeConfig.artifact;
  const rarityStyle = rarityStyles[rarity] || rarityStyles.common;

  // Default icon if none provided
  const defaultIcon = `https://img.icons8.com/fluency/96/000000/${
    type === 'weapon' ? 'sword' : 
    type === 'tool' ? 'wrench' : 
    type === 'artifact' ? 'treasure-chest' :
    type === 'consumable' ? 'potion' :
    type === 'badge' ? 'medal' : 'book'
  }.png`;

  return (
    <>
      <motion.div
        className={`
          relative rounded-lg overflow-hidden border 
          ${typeStyle.border}
          ${className}
          ${isEquipped ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-indigo-500' : ''}
        `}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setShowDetails(true)}
      >
        {/* Base item card */}
        <div className="bg-gray-800 flex items-center p-3">
          {/* Item icon */}
          <div className={`
            w-12 h-12 rounded-lg mr-3 p-1
            bg-gradient-to-br ${rarityStyle.bg}
            flex items-center justify-center
          `}>
            <img
              src={icon || defaultIcon}
              alt={name}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultIcon;
              }}
            />
          </div>

          {/* Item name and info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="font-semibold text-white text-sm truncate">
                {name}
              </h3>
              {quantity > 1 && (
                <span className="ml-2 bg-gray-700 px-2 py-0.5 rounded-full text-xs text-gray-300">
                  x{quantity}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs mt-1">
              <span className={`${typeStyle.color} mr-2`}>
                {typeStyle.icon} {type}
              </span>
              <span className={`${rarityStyle.text}`}>
                Lvl {level} • {rarity}
              </span>
            </div>
          </div>

          {/* Equipped indicator */}
          {isEquipped && (
            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
              <FaCheck size={12} className="text-white" />
            </div>
          )}
        </div>

        {/* Hover actions */}
        <AnimatePresence>
          {isHovering && (
            <motion.div 
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex space-x-2">
                <button 
                  className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}
                >
                  <FaInfoCircle className="text-white" size={14} />
                </button>
                {usable && (
                  <button 
                    className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUse(id);
                    }}
                  >
                    <FaCog className="text-white" size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Details modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowDetails(false)}
        >
          <motion.div 
            className="bg-gray-800 rounded-xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Item header */}
            <div className={`p-4 bg-gradient-to-r ${rarityStyle.bg}`}>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-lg bg-gray-900/50 flex items-center justify-center">
                  <img
                    src={icon || defaultIcon}
                    alt={name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultIcon;
                    }}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    {name}
                    {quantity > 1 && (
                      <span className="ml-2 bg-gray-700/50 px-2 py-0.5 rounded-full text-sm text-gray-300">
                        x{quantity}
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center text-sm">
                    <span className={`${typeStyle.color} mr-2`}>
                      {typeStyle.icon} {type}
                    </span>
                    <span className={`${rarityStyle.text}`}>
                      Level {level} • {rarity}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Item description */}
            <div className="p-4">
              <p className="text-gray-300 mb-4">{description}</p>
              
              {/* Item stats */}
              {Object.keys(stats).length > 0 && (
                <div className="mt-2 mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Statistics</h4>
                  <div className="bg-gray-700/30 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-400 text-sm capitalize">{key}:</span>
                          <span className="text-white text-sm font-medium">
                            {typeof value === 'number' && value > 0 ? `+${value}` : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Acquisition info */}
              {formattedDate && (
                <div className="text-xs text-gray-400 mb-4">
                  Acquired on {formattedDate}
                </div>
              )}

              {/* Status badges */}
              <div className="flex flex-wrap gap-2">
                {isEquipped && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/60 text-indigo-300 border border-indigo-700">
                    <FaCheck size={8} className="mr-1" /> Equipped
                  </span>
                )}
                {usable && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/60 text-green-300 border border-green-700">
                    Usable
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-gray-700 p-4 flex justify-end space-x-3">
              {usable && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUse(id);
                    setShowDetails(false);
                  }}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md"
                >
                  Use
                </button>
              )}

              {!isEquipped ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEquip(id);
                    setShowDetails(false);
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md"
                >
                  Equip
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEquip(id);
                    setShowDetails(false);
                  }}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md"
                >
                  Unequip
                </button>
              )}

              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

InventoryItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['weapon', 'tool', 'artifact', 'consumable', 'badge', 'skill']).isRequired,
  icon: PropTypes.string,
  rarity: PropTypes.oneOf(['common', 'uncommon', 'rare', 'epic', 'legendary']),
  level: PropTypes.number,
  stats: PropTypes.object,
  acquiredDate: PropTypes.string,
  isEquipped: PropTypes.bool,
  usable: PropTypes.bool,
  onUse: PropTypes.func,
  onEquip: PropTypes.func,
  className: PropTypes.string,
  quantity: PropTypes.number,
};

export default InventoryItem;