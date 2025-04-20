// src/components/missions/codeforge/CreateDBQueries.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaPlayCircle, FaCheck, FaTimes, FaLightbulb, FaSyncAlt, FaDatabase, FaTable, FaFileAlt } from 'react-icons/fa';
import Editor from '@monaco-editor/react';

/**
 * CreateDBQueries Mission - Create database queries to solve challenges
 */
const CreateDBQueries = ({ missionId, onComplete }) => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [missionData, setMissionData] = useState(null);
  const [currentTask, setCurrentTask] = useState(0);
  const [queries, setQueries] = useState({});
  const [results, setResults] = useState({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [dbSchema, setDbSchema] = useState(null);
  const [activeTab, setActiveTab] = useState('schema');

  // Load mission data
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/game/missions/${missionId}`, {
          params: { userId }
        });
        
        setMissionData(response.data);
        
        // Initialize query state for each task
        const initialQueries = {};
        response.data.content.tasks.forEach((task, index) => {
          initialQueries[index] = task.initialQuery || '';
        });
        setQueries(initialQueries);
        
        // Set DB schema
        setDbSchema(response.data.content.dbSchema || null);
        
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

  const handleQueryChange = (value) => {
    setQueries(prev => ({
      ...prev,
      [currentTask]: value
    }));
  };

  const executeQuery = async () => {
    if (!queries[currentTask]) return;
    
    setIsExecuting(true);
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/execute-query`, {
        userId,
        query: queries[currentTask],
        taskIndex: currentTask
      });
      
      setResults(prev => ({
        ...prev,
        [currentTask]: response.data
      }));
      
    } catch (error) {
      console.error('Error executing query:', error);
      setResults(prev => ({
        ...prev,
        [currentTask]: {
          error: error.response?.data?.message || error.message || 'Failed to execute query',
          data: null,
          success: false
        }
      }));
    } finally {
      setIsExecuting(false);
    }
  };

  const handleTaskChange = (taskIndex) => {
    if (taskIndex >= 0 && taskIndex < missionData.content.tasks.length) {
      setCurrentTask(taskIndex);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const allQueries = Object.values(queries);
      
      const response = await axios.post(`/api/game/missions/${missionId}/verify`, {
        userId,
        solution: allQueries,
        timeSpent: timeElapsed,
        errors
      });
      
      setFinalResult(response.data);
      
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
      setFinalResult({
        isCorrect: false,
        feedback: 'There was an error submitting your solution. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetTask = () => {
    if (missionData) {
      const initialQuery = missionData.content.tasks[currentTask].initialQuery || '';
      setQueries(prev => ({
        ...prev,
        [currentTask]: initialQuery
      }));
      setResults(prev => ({
        ...prev,
        [currentTask]: null
      }));
    }
  };

  const resetAllTasks = () => {
    if (missionData) {
      const initialQueries = {};
      missionData.content.tasks.forEach((task, index) => {
        initialQueries[index] = task.initialQuery || '';
      });
      setQueries(initialQueries);
      setResults({});
      setFinalResult(null);
      setCurrentTask(0);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Check if all tasks have been completed successfully
  const allTasksCompleted = () => {
    if (!missionData) return false;
    
    return missionData.content.tasks.every((_, index) => {
      const result = results[index];
      return result && result.success;
    });
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
        <FaTimes className="text-red-500 text-4xl mx-auto mb-4" />
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

  const currentTaskData = missionData.content.tasks[currentTask];

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Mission header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">{missionData.title}</h2>
          <p className="text-indigo-200 mt-1">Create database queries to solve each task</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="bg-indigo-800/50 px-3 py-1 rounded-md text-sm text-white">
            Time: {formatTime(timeElapsed)}
          </div>
          <div className="bg-indigo-800/50 px-3 py-1 rounded-md text-sm text-white">
            Tasks: <span className="text-indigo-300">
              {Object.values(results).filter(r => r?.success).length}/{missionData.content.tasks.length}
            </span>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="p-2 bg-indigo-800/50 rounded-md hover:bg-indigo-700/50"
            title="Toggle hint"
          >
            <FaLightbulb className="text-yellow-300" />
          </button>
          <button
            onClick={resetAllTasks}
            className="p-2 bg-indigo-800/50 rounded-md hover:bg-indigo-700/50"
            title="Reset all tasks"
          >
            <FaSyncAlt className="text-white" />
          </button>
        </div>
      </div>

      {/* Mission instructions */}
      <div className="p-4 md:p-6 bg-gray-800">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Mission Objective</h3>
          <p className="text-gray-300">{missionData.description || 'Create database queries to solve each of the tasks. Execute your queries to test them before submitting.'}</p>
          
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
                  {currentTaskData?.hint || missionData.content.hint || "Check the database schema to understand the relationships between tables. Make sure your queries include the correct SELECT fields and proper WHERE conditions."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Task navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4">
          {/* Task list - sidebar */}
          <div className="lg:col-span-2">
            <h3 className="text-md font-semibold text-white mb-2">Tasks</h3>
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              {missionData.content.tasks.map((task, index) => {
                const taskResult = results[index];
                const isCompleted = taskResult?.success;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleTaskChange(index)}
                    className={`
                      w-full text-left p-3 border-b border-gray-700 last:border-b-0
                      flex items-center justify-between
                      ${currentTask === index ? 'bg-indigo-900/30' : ''}
                      ${isCompleted ? 'bg-green-900/10' : ''}
                      hover:bg-gray-800 transition-colors
                    `}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-800 text-xs mr-3">
                        {index + 1}
                      </span>
                      <span className="text-white font-medium truncate">
                        {task.title}
                      </span>
                    </div>
                    
                    {isCompleted && (
                      <FaCheck className="text-green-500 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Current task details */}
          <div className="lg:col-span-4">
            <h3 className="text-md font-semibold text-white mb-2">Task {currentTask + 1}: {currentTaskData.title}</h3>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <p className="text-gray-300 mb-4">{currentTaskData.description}</p>
              
              {/* DB schema reference tabs */}
              <div className="border border-gray-700 rounded-lg overflow-hidden mb-4">
                <div className="flex border-b border-gray-700">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'schema' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('schema')}
                  >
                    <FaDatabase className="inline mr-1" /> Schema
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'expected' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('expected')}
                  >
                    <FaTable className="inline mr-1" /> Expected Result
                  </button>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${activeTab === 'example' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                    onClick={() => setActiveTab('example')}
                  >
                    <FaFileAlt className="inline mr-1" /> Example
                  </button>
                </div>
                
                <div className="p-3 bg-gray-800 font-mono text-xs md:text-sm overflow-x-auto max-h-60">
                  {activeTab === 'schema' && dbSchema && (
                    <pre className="text-gray-300">{dbSchema}</pre>
                  )}
                  {activeTab === 'expected' && currentTaskData.expectedResult && (
                    <pre className="text-gray-300">{currentTaskData.expectedResult}</pre>
                  )}
                  {activeTab === 'example' && currentTaskData.example && (
                    <div>
                      <p className="text-green-400 mb-2">// Example query</p>
                      <pre className="text-gray-300">{currentTaskData.example}</pre>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Query Editor */}
              <div className="border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                  <div className="text-gray-300 font-medium">SQL Query</div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={resetTask}
                      className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-xs"
                    >
                      Reset
                    </button>
                    <button
                      onClick={executeQuery}
                      disabled={isExecuting || !queries[currentTask]}
                      className={`
                        px-3 py-1 rounded text-sm flex items-center
                        ${isExecuting || !queries[currentTask] ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white'}
                      `}
                    >
                      {isExecuting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-1"></div>
                          Running...
                        </>
                      ) : (
                        <>
                          <FaPlayCircle size={12} className="mr-1" /> Execute
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="h-40 md:h-60">
                  <Editor
                    height="100%"
                    language="sql"
                    theme="vs-dark"
                    value={queries[currentTask] || ''}
                    onChange={handleQueryChange}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      tabSize: 2,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Query results */}
        {results[currentTask] && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-md font-semibold text-white mb-2">Query Results</h3>
            <div className={`
              border rounded-lg overflow-hidden
              ${results[currentTask].success ? 'border-green-800' : 'border-red-800'}
            `}>
              <div className={`
                px-4 py-2 flex justify-between items-center
                ${results[currentTask].success ? 'bg-green-900/30' : 'bg-red-900/30'}
              `}>
                <div className="flex items-center">
                  {results[currentTask].success ? (
                    <FaCheck className="text-green-500 mr-2" />
                  ) : (
                    <FaTimes className="text-red-500 mr-2" />
                  )}
                  <span className={`font-medium ${results[currentTask].success ? 'text-green-400' : 'text-red-400'}`}>
                    {results[currentTask].success ? 'Query Successful' : 'Query Failed'}
                  </span>
                </div>
                {results[currentTask].executionTime && (
                  <span className="text-gray-400 text-xs">
                    Execution time: {results[currentTask].executionTime}ms
                  </span>
                )}
              </div>
              
              <div className="bg-gray-900 p-4">
                {results[currentTask].error ? (
                  <div className="text-red-400 font-mono text-sm">
                    Error: {results[currentTask].error}
                  </div>
                ) : results[currentTask].data ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800">
                        <tr>
                          {Object.keys(results[currentTask].data[0] || {}).map((column, i) => (
                            <th
                              key={i}
                              scope="col"
                              className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-gray-900 divide-y divide-gray-800">
                        {results[currentTask].data.map((row, i) => (
                          <tr key={i}>
                            {Object.values(row).map((cell, j) => (
                              <td
                                key={j}
                                className="px-3 py-2 text-sm text-gray-300 font-mono"
                              >
                                {cell === null ? <span className="text-gray-500">NULL</span> : String(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {results[currentTask].data.length === 0 && (
                      <p className="text-gray-500 text-sm p-3">Query returned no results</p>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Submit button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !allTasksCompleted()}
            className={`
              px-4 py-2 rounded-md text-white flex items-center
              ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 
                !allTasksCompleted() ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : !allTasksCompleted() ? (
              'Complete All Tasks'
            ) : 'Submit Solution'}
          </button>
        </div>
        
        {/* Final result feedback */}
        {finalResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              mt-6 p-4 rounded-lg flex items-start
              ${finalResult.isCorrect ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'}
            `}
          >
            {finalResult.isCorrect ? (
              <FaCheck className="text-green-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
            ) : (
              <FaTimes className="text-red-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
            )}
            
            <div>
              <h3 className={`font-bold mb-1 ${finalResult.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {finalResult.isCorrect ? 'Mission Complete!' : 'Not Quite Right'}
              </h3>
              <p className="text-white">{finalResult.feedback}</p>
              
              {finalResult.isCorrect && finalResult.score !== undefined && (
                <div className="mt-2 bg-black/30 p-2 rounded">
                  <p className="text-gray-300">
                    Score: <span className="font-bold text-yellow-300">{finalResult.score}</span> XP
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

export default CreateDBQueries;