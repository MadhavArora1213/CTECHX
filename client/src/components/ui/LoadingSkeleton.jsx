import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingSkeleton Component
 * 
 * A customizable skeleton loading placeholder that can be configured for 
 * different UI elements throughout the application.
 * 
 * @param {string} type - Type of skeleton (text, card, planet, mission, etc)
 * @param {number} count - Number of skeleton items to display
 * @param {boolean} animated - Whether to show pulse animation
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles for customization
 * @param {number} height - Height of skeleton
 * @param {number} width - Width of skeleton
 */
const LoadingSkeleton = ({ 
  type = 'text', 
  count = 1, 
  animated = true, 
  className = '',
  style = {},
  height,
  width
}) => {
  // Base classes for all skeleton elements
  const baseClass = `bg-gray-700 rounded ${animated ? 'animate-pulse' : ''}`;
  
  // Convert count to array if needed
  const items = Array.from({ length: count }, (_, i) => i);

  // Generate skeleton based on type
  const renderSkeleton = (i) => {
    switch (type) {
      case 'text':
        return (
          <div 
            key={i}
            className={`${baseClass} h-4 ${width ? '' : 'w-full'} mb-2 ${className}`}
            style={{ ...style, height, width }}
          ></div>
        );
      
      case 'title':
        return (
          <div 
            key={i}
            className={`${baseClass} h-8 ${width ? '' : 'w-3/4'} mb-4 ${className}`}
            style={{ ...style, height, width }}
          ></div>
        );
      
      case 'avatar':
        return (
          <div 
            key={i}
            className={`${baseClass} rounded-full h-12 w-12 ${className}`}
            style={{ ...style, height, width }}
          ></div>
        );
      
      case 'button':
        return (
          <div 
            key={i}
            className={`${baseClass} h-10 ${width ? '' : 'w-24'} ${className}`}
            style={{ ...style, height, width }}
          ></div>
        );
      
      case 'card':
        return (
          <div key={i} className={`${baseClass} rounded-lg p-4 ${className}`} style={style}>
            <div className={`${baseClass} h-6 w-1/2 mb-4`}></div>
            <div className={`${baseClass} h-4 w-full mb-2`}></div>
            <div className={`${baseClass} h-4 w-full mb-2`}></div>
            <div className={`${baseClass} h-4 w-3/4 mb-4`}></div>
            <div className={`${baseClass} h-8 w-1/3`}></div>
          </div>
        );
      
      case 'planet':
        return (
          <div 
            key={i}
            className={`${baseClass} rounded-lg p-5 ${className}`} 
            style={{ ...style, height: height || '180px', width: width || '100%' }}
          >
            <div className="flex items-start">
              <div className={`${baseClass} rounded-full h-16 w-16 mr-4`}></div>
              <div className="flex-1">
                <div className={`${baseClass} h-6 w-3/4 mb-3`}></div>
                <div className={`${baseClass} h-4 w-full mb-2`}></div>
                <div className={`${baseClass} h-4 w-5/6 mb-4`}></div>
                <div className={`${baseClass} h-2 w-full mb-1`}></div>
              </div>
            </div>
          </div>
        );
      
      case 'mission':
        return (
          <div 
            key={i}
            className={`${baseClass} rounded-lg p-4 mb-4 border-l-4 border-gray-600 ${className}`} 
            style={{ ...style, height: height || 'auto', width: width || '100%' }}
          >
            <div className="flex justify-between">
              <div className="w-3/4">
                <div className={`${baseClass} h-5 w-2/3 mb-2`}></div>
                <div className={`${baseClass} h-4 w-full mb-3`}></div>
                <div className="flex space-x-4">
                  <div className={`${baseClass} h-3 w-20`}></div>
                  <div className={`${baseClass} h-3 w-16`}></div>
                  <div className={`${baseClass} h-3 w-24`}></div>
                </div>
              </div>
              <div className={`${baseClass} h-8 w-24 rounded-md`}></div>
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div 
            key={i}
            className={`${baseClass} rounded-lg ${className}`} 
            style={{ ...style, height: height || '350px', width: width || '100%' }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        );
        
      case 'stats':
        return (
          <div key={i} className={`flex flex-wrap gap-4 ${className}`} style={style}>
            {Array(4).fill(0).map((_, j) => (
              <div key={j} className={`${baseClass} rounded-lg p-3 flex-1`}>
                <div className={`${baseClass} h-4 w-16 mb-2`}></div>
                <div className={`${baseClass} h-6 w-12`}></div>
              </div>
            ))}
          </div>
        );
      
      case 'custom':
        return (
          <div 
            key={i}
            className={`${baseClass} ${className}`}
            style={{ ...style, height: height || '100px', width: width || '100%' }}
          ></div>
        );
      
      default:
        return (
          <div 
            key={i}
            className={`${baseClass} h-4 ${width ? '' : 'w-full'} mb-2 ${className}`}
            style={{ ...style, height, width }}
          ></div>
        );
    }
  };

  // Return single skeleton or array based on count
  return (
    <>
      {items.map((i) => renderSkeleton(i))}
    </>
  );
};

LoadingSkeleton.propTypes = {
  type: PropTypes.oneOf([
    'text', 
    'title', 
    'avatar', 
    'button', 
    'card',
    'planet',
    'mission',
    'map',
    'stats',
    'custom'
  ]),
  count: PropTypes.number,
  animated: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default LoadingSkeleton;