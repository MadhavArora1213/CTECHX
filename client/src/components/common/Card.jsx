// src/components/common/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Responsive Card component with various styles and hover effects
 */
const Card = ({
  children,
  title,
  subtitle,
  image,
  footer,
  variant = 'default',
  hoverable = false,
  className = '',
  onClick,
  headerAction,
  badge,
  isLoading = false,
  loadingText = 'Loading...',
  animation = true,
  imageAspectRatio = 'aspect-video', // aspect-video, aspect-square
  imageFit = 'cover', // cover, contain
}) => {
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-800 border border-gray-700',
    primary: 'bg-gray-800 border border-indigo-500/30',
    secondary: 'bg-gray-900/70 backdrop-blur-sm border border-gray-800',
    success: 'bg-gray-800 border border-green-500/30',
    warning: 'bg-gray-800 border border-yellow-500/30',
    danger: 'bg-gray-800 border border-red-500/30',
    gradient: 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700',
    transparent: 'bg-transparent',
  };

  const cardClasses = `
    rounded-xl overflow-hidden ${variantStyles[variant]} ${className}
    transition-all duration-300
    ${hoverable ? 'hover:shadow-lg hover:shadow-indigo-900/20' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `;

  // Animation variants
  const animationProps = animation ? {
    whileHover: hoverable ? { y: -5, transition: { duration: 0.2 } } : {},
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  } : {};

  if (isLoading) {
    return (
      <motion.div 
        className={`${cardClasses} flex items-center justify-center p-6`}
        {...animationProps}
      >
        <div className="flex flex-col items-center space-y-3">
          <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-gray-400">{loadingText}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={cardClasses}
      onClick={onClick}
      {...animationProps}
    >
      {/* Card Image */}
      {image && (
        <div className={`relative ${imageAspectRatio}`}>
          <img 
            src={image} 
            alt={title || "Card image"}
            className={`w-full h-full object-${imageFit}`}
            loading="lazy"
          />
          {badge && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md">
              {badge}
            </div>
          )}
        </div>
      )}
      
      {/* Card Header */}
      {(title || subtitle || headerAction) && (
        <div className="px-4 pt-4 pb-0 flex justify-between items-start">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      
      {/* Card Content */}
      <div className="p-4">
        {children}
      </div>
      
      {/* Card Footer */}
      {footer && (
        <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-700">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  image: PropTypes.string,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'gradient', 'transparent']),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  headerAction: PropTypes.node,
  badge: PropTypes.node,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  animation: PropTypes.bool,
  imageAspectRatio: PropTypes.string,
  imageFit: PropTypes.string,
};

export default Card;