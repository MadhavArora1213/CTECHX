// src/components/missions/codeforge/DragDropFrontend.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaArrowRight, FaQuestion, FaLightbulb, FaSyncAlt } from 'react-icons/fa';

/**
 * DragDropFrontend Mission - Build a React + Tailwind UI by arranging components
 */
const DragDropFrontend = ({ missionId, onComplete }) => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [missionData, setMissionData] = useState(null);
  const [components, setComponents] = useState([]);
  const [dropZones, setDropZones] = useState({});
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [errors, setErrors] = useState(0);

  // Load mission data
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/game/missions/${missionId}`, {
          params: { userId }
        });
        
        setMissionData(response.data);
        
        // Set components and drop zones from mission data
        setComponents(response.data.content.components || []);
        
        // Initialize drop zones
        const initialDropZones = {};
        response.data.content.zones.forEach(zone => {
          initialDropZones[zone.id] = [];
        });
        setDropZones(initialDropZones);
        
      } catch (error) {
        console.error('Error fetching mission data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMissionData();
  }, [missionId, userId]);

  // Timer for tracking time spent
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    // Dropped outside a drop zone
    if (!destination) return;
    
    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(
        source.droppableId === 'components' 
          ? components 
          : dropZones[source.droppableId]
      );
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);
      
      if (source.droppableId === 'components') {
        setComponents(items);
      } else {
        setDropZones({
          ...dropZones,
          [source.droppableId]: items
        });
      }
    } 
    // Moving from components to a drop zone
    else if (source.droppableId === 'components') {
      const componentItems = Array.from(components);
      const [movedItem] = componentItems.splice(source.index, 1);
      const destinationItems = Array.from(dropZones[destination.droppableId] || []);
      
      // Create a copy to avoid modifying the original
      const itemCopy = { ...movedItem, id: `${movedItem.id}-${Date.now()}` };
      
      destinationItems.splice(destination.index, 0, itemCopy);
      
      setComponents(componentItems);
      setDropZones({
        ...dropZones,
        [destination.droppableId]: destinationItems
      });
    }
    // Moving between drop zones
    else {
      const sourceItems = Array.from(dropZones[source.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      const destinationItems = Array.from(dropZones[destination.droppableId] || []);
      
      destinationItems.splice(destination.index, 0, movedItem);
      
      setDropZones({
        ...dropZones,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create the solution object from the drop zones
      const solution = Object.keys(dropZones).reduce((acc, zoneId) => {
        acc[zoneId] = dropZones[zoneId].map(item => item.originalId || item.id);
        return acc;
      }, {});
      
      // Send to backend for verification
      const response = await axios.post(`/api/game/missions/${missionId}/verify`, {
        userId,
        solution,
        timeSpent: timeElapsed,
        errors
      });
      
      setResult(response.data);
      
      // If successful, call the onComplete handler
      if (response.data.isCorrect) {
        setTimeout(() => {
          if (onComplete) {
            onComplete(response.data.score);
          }
        }, 2000);
      } else {
        // Increment error count if solution is wrong
        setErrors(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error submitting solution:', error);
      setResult({
        isCorrect: false,
        feedback: 'There was an error submitting your solution. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetMission = () => {
    // Reset drop zones to initial state
    if (missionData) {
      const initialDropZones = {};
      missionData.content.zones.forEach(zone => {
        initialDropZones[zone.id] = [];
      });
      setDropZones(initialDropZones);
      
      // Reset components
      setComponents(missionData.content.components || []);
      
      // Reset result
      setResult(null);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 w-full">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-white">Loading mission...</p>
        </div>
      </div>
    );
  }

  // If mission data failed to load
  if (!missionData) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Failed to load mission</h3>
        <p className="text-gray-400 mb-4">There was an error loading this mission. Please try again later.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Mission header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">{missionData.title}</h2>
          <p className="text-blue-200 mt-1">Build a responsive UI by arranging the components</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="bg-blue-800/50 px-3 py-1 rounded-md text-sm text-white">
            Time: {formatTime(timeElapsed)}
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="p-2 bg-blue-800/50 rounded-md hover:bg-blue-700/50"
            title="Toggle hint"
          >
            <FaLightbulb className="text-yellow-300" />
          </button>
          <button
            onClick={resetMission}
            className="p-2 bg-blue-800/50 rounded-md hover:bg-blue-700/50"
            title="Reset mission"
          >
            <FaSyncAlt className="text-white" />
          </button>
        </div>
      </div>

      {/* Mission instructions */}
      <div className="p-4 md:p-6 bg-gray-800">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Mission Objective</h3>
          <p className="text-gray-300">{missionData.description}</p>
          
          {/* Hint section */}
          {showHint && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 border-t border-gray-700 pt-4"
            >
              <div className="flex items-start">
                <FaLightbulb className="text-yellow-400 mt-1 mr-2 flex-shrink-0" />
                <p className="text-yellow-200 text-sm">
                  {missionData.content.hint || "Try to arrange the components according to the design mockup. Pay attention to the component hierarchy and which components should be placed inside others."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Target design mockup */}
        <div className="bg-gray-800 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">Target Design</h3>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
            >
              {previewMode ? "Show Zones" : "Preview Result"} <FaArrowRight className="ml-1" />
            </button>
          </div>
          
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            {previewMode ? (
              <div className="bg-white text-black p-4 h-96 overflow-auto">
                {/* Render the current layout preview */}
                <div className="font-mono text-sm">
                  {Object.keys(dropZones).map(zoneId => {
                    const zone = missionData.content.zones.find(z => z.id === zoneId);
                    return (
                      <div key={zoneId} className="mb-4">
                        <div className="font-bold">{zone?.name || zoneId}:</div>
                        <div className="pl-4">
                          {dropZones[zoneId].map((item, index) => (
                            <div key={index} className="text-blue-600">
                              {item.name || item.id}
                            </div>
                          ))}
                          {dropZones[zoneId].length === 0 && (
                            <div className="text-red-500 italic">Empty</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <img 
                src={missionData.content.mockupImage || "https://assets.codepen.io/t-1003/internal/avatars/teams/default.png?fit=crop&format=auto&height=256&version=1513627136&width=256"} 
                alt="Design Mockup" 
                className="w-full h-96 object-cover object-top"
              />
            )}
          </div>
        </div>
        
        {/* Drag and drop interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            {/* Component palette */}
            <div className="lg:col-span-1">
              <h3 className="text-md font-semibold text-white mb-2">Components</h3>
              <Droppable droppableId="components">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`
                      min-h-[200px] border-2 border-dashed rounded-lg p-2
                      ${snapshot.isDraggingOver ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700'}
                    `}
                  >
                    {components.map((component, index) => (
                      <Draggable key={component.id} draggableId={component.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`
                              mb-2 p-3 rounded-md border
                              ${snapshot.isDragging ? 'border-blue-400 bg-blue-900' : 'border-gray-600 bg-gray-700'}
                            `}
                          >
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-2 bg-${component.color || 'blue'}-400`}></div>
                              <div>
                                <div className="text-white font-medium">{component.name}</div>
                                <div className="text-xs text-gray-400">{component.type}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {components.length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        All components have been used
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
            
            {/* Drop zones */}
            <div className="lg:col-span-2">
              <h3 className="text-md font-semibold text-white mb-2">Layout Zones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {missionData.content.zones.map((zone) => (
                  <div key={zone.id} className="flex flex-col">
                    <div className="text-sm font-medium text-blue-300 mb-1">{zone.name}</div>
                    <Droppable droppableId={zone.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`
                            flex-1 min-h-[150px] border-2 border-dashed rounded-lg p-2
                            ${snapshot.isDraggingOver ? 'border-green-500 bg-green-900/20' : 'border-gray-700'}
                          `}
                        >
                          {dropZones[zone.id]?.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`
                                    mb-2 p-3 rounded-md border
                                    ${snapshot.isDragging ? 'border-green-400 bg-green-900' : 'border-gray-600 bg-gray-700'}
                                  `}
                                >
                                  <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-2 bg-${item.color || 'blue'}-400`}></div>
                                    <div>
                                      <div className="text-white font-medium">{item.name}</div>
                                      <div className="text-xs text-gray-400">{item.type}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {(!dropZones[zone.id] || dropZones[zone.id].length === 0) && (
                            <div className="text-center py-6 text-gray-500">
                              Drop components here
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </div>
          </DragDropContext>
        </div>
        
        {/* Submit button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || Object.values(dropZones).every(zone => zone.length === 0)}
            className={`
              px-4 py-2 rounded-md text-white flex items-center
              ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : 'Submit Solution'}
          </button>
        </div>
        
        {/* Result feedback */}
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-6 p-4 rounded-lg flex items-start
              ${result.isCorrect ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}
            `}
          >
            {result.isCorrect ? (
              <FaCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
            ) : (
              <FaTimesCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
            )}
            
            <div>
              <h3 className={`font-bold mb-1 ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {result.isCorrect ? 'Success!' : 'Not Quite Right'}
              </h3>
              <p className="text-white">{result.feedback}</p>
              
              {result.isCorrect && result.score !== undefined && (
                <div className="mt-2 bg-black/30 p-2 rounded">
                  <p className="text-gray-300">
                    Score: <span className="font-bold text-yellow-300">{result.score}</span> XP
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DragDropFrontend;