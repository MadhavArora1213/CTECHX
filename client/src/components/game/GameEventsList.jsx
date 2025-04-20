import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaStar, 
  FaTrophy, 
  FaRocket, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaSortAmountDownAlt, 
  FaFilter 
} from 'react-icons/fa';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';
import LoadingSkeleton from '../ui/LoadingSkeleton';

const GameEventsList = ({ 
  events = [], 
  loading = false,
  title = "Game Events",
  maxHeight = 400,
  onEventClick,
  emptyMessage = "No events to display"
}) => {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // desc = newest first
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter and sort events when props change
  useEffect(() => {
    let result = [...events];
    
    // Apply filters
    if (filter !== 'all') {
      result = result.filter(event => event.type === filter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredEvents(result);
  }, [events, filter, sortOrder]);
  
  // Get event icon based on type
  const getEventIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <FaTrophy className="text-yellow-500" />;
      case 'level-up':
        return <FaStar className="text-blue-500" />;
      case 'mission':
        return <FaRocket className="text-purple-500" />;
      case 'alert':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-gray-400" />;
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, 'h:mm a')}`;
    } else if (isThisWeek(date)) {
      return format(date, 'EEEE, h:mm a');
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };
  
  // Available filters
  const filterOptions = [
    { id: 'all', label: 'All Events' },
    { id: 'achievement', label: 'Achievements' },
    { id: 'level-up', label: 'Level Ups' },
    { id: 'mission', label: 'Missions' },
    { id: 'alert', label: 'Alerts' }
  ];
  
  // Handle event click
  const handleEventClick = (event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  // Filter events by date group
  const getEventsByDate = () => {
    const groups = {
      today: { label: 'Today', events: [] },
      yesterday: { label: 'Yesterday', events: [] },
      thisWeek: { label: 'This Week', events: [] },
      earlier: { label: 'Earlier', events: [] }
    };
    
    filteredEvents.forEach(event => {
      const date = new Date(event.timestamp);
      
      if (isToday(date)) {
        groups.today.events.push(event);
      } else if (isYesterday(date)) {
        groups.yesterday.events.push(event);
      } else if (isThisWeek(date)) {
        groups.thisWeek.events.push(event);
      } else {
        groups.earlier.events.push(event);
      }
    });
    
    // Return only non-empty groups
    return Object.values(groups).filter(group => group.events.length > 0);
  };
  
  const dateGroups = getEventsByDate();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg">
      {/* Header with title and filter toggle */}
      <div className="px-4 py-3 border-b border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-1.5 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300"
            title="Filter & Sort"
          >
            <FaFilter size={14} />
          </button>
          <button 
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="p-1.5 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-gray-300"
            title={sortOrder === 'desc' ? 'Newest first' : 'Oldest first'}
          >
            <FaSortAmountDownAlt size={14} className={sortOrder === 'asc' ? 'transform rotate-180' : ''} />
          </button>
        </div>
      </div>
      
      {/* Filter options */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-gray-700"
          >
            <div className="flex flex-wrap gap-2 px-4 py-3">
              {filterOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filter === option.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Events list */}
      <div 
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800" 
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {loading ? (
          <div className="p-4">
            <LoadingSkeleton type="text" width="50%" className="mb-4" />
            <LoadingSkeleton type="mission" count={3} />
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <div className="bg-gray-700/30 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <FaInfoCircle size={24} />
            </div>
            <p>{emptyMessage}</p>
          </div>
        ) : (
          <div className="p-2">
            {dateGroups.map((group, groupIndex) => (
              <div key={group.label} className="mb-4">
                <h4 className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wider">{group.label}</h4>
                <div className="space-y-2">
                  {group.events.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleEventClick(event)}
                      className="p-3 rounded-lg bg-gray-750 hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="flex">
                        <div className="mr-3 mt-0.5">
                          <div className="p-2 bg-gray-800 rounded-full">
                            {getEventIcon(event.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-400 mt-0.5">{event.message}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-gray-500">{formatTimestamp(event.timestamp)}</span>
                            {event.reward && (
                              <span className="text-xs bg-gray-800 rounded px-1.5 py-0.5 text-yellow-400">
                                +{event.reward} XP
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameEventsList;