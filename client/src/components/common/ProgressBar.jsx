// src/components/common/ProgressBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Responsive Progress Bar component with different styles and animations
 */
const ProgressBar = ({
  value = 0,
  max = 100,
  height = 'md',
  variant = 'default',
  showValue = false,
  valuePosition = 'right',
  label,
  animated = true,
  striped = false,
  className = '',
  valuePrefix = '',
  valueSuffix = '',
  formatValue,
}) => {
  // Calculate progress percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Format the displayed value
  const formattedValue = formatValue ? formatValue(value) : `${valuePrefix}${value}${valueSuffix}`;
  
  // Height variations
  const heightClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-5',
  };
  
  // Variant styling (background colors)
  const variantClasses = {
    default: 'bg-indigo-600', 
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    warning: 'bg-gradient-to-r from-yellow-400 to-amber-600',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600',
  };
  
  // Create striped pattern if enabled
  const stripedPattern = striped ? {
    backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
    backgroundSize: '1rem 1rem',
  } : {};
  
  // Value position classes
  const valuePositionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    hide: 'hidden',
  };
  
  return (
    <div className={`w-full ${className}`}>
      {/* Label and value display */}
      {(label || (showValue && valuePosition === 'top')) && (
        <div className="flex justify-between items-center mb-1 text-sm">
          {label && <div className="font-medium text-gray-300">{label}</div>}
          {showValue && valuePosition === 'top' && (
            <div className="text-gray-400">{formattedValue}</div>
          )}
        </div>
      )}
      
      {/* Progress bar container */}
      <div className={`w-full ${heightClasses[height]} bg-gray-700 rounded-full overflow-hidden relative`}>
        {/* Progress bar fill */}
        <motion.div
          className={`h-full rounded-full ${variantClasses[variant]}`}
          style={{
            width: `${percentage}%`,
            ...stripedPattern,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.5 : 0 }}
        >
          {/* Value display inside bar */}
          {showValue && (valuePosition === 'inside') && percentage > 10 && (
            <div className="h-full px-2 flex items-center justify-end">
              <span className="text-xs text-white font-medium">{formattedValue}</span>
            </div>
          )}
          
          {/* Animated shine effect */}
          {animated && (
            <motion.div 
              className="absolute inset-0 w-full h-full"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                backgroundSize: '50% 100%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}
        </motion.div>
      </div>
      
      {/* Value shown below */}
      {showValue && valuePosition === 'bottom' && (
        <div className={`flex text-xs mt-1 ${valuePositionClasses[valuePosition === 'bottom' ? 'right' : valuePosition]}`}>
          <span className="text-gray-400">{formattedValue}</span>
        </div>
      )}
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  height: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  showValue: PropTypes.bool,
  valuePosition: PropTypes.oneOf(['top', 'right', 'bottom', 'inside', 'hide']),
  label: PropTypes.node,
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  className: PropTypes.string,
  valuePrefix: PropTypes.string,
  valueSuffix: PropTypes.string,
  formatValue: PropTypes.func,
};

export default ProgressBar;