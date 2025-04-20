// src/components/missions/codeforge/FixBrokenAPI.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaPlay, FaCheck, FaTimes, FaLightbulb, FaSyncAlt, FaTerminal } from 'react-icons/fa';
import Editor from '@monaco-editor/react';

/**
 * FixBrokenAPI Mission - Find and repair bugs in a Node/Express API
 */
const FixBrokenAPI = ({ missionId, onComplete }) => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [missionData, setMissionData] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [testsPassed, setTestsPassed] = useState(0);
  const [totalTests, setTotalTests] = useState(0);
  const [testResults, setTestResults] = useState([]);

  // Load mission data
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/game/missions/${missionId}`, {
          params: { userId }
        });
        
        setMissionData(response.data);
        setCode(response.data.content.initialCode || '');
        setTotalTests(response.data.content.tests?.length || 0);
        
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

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    setTestResults([]);
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/run`, {
        code,
        userId
      });
      
      const testResults = response.data.testResults || [];
      setTestResults(testResults);
      
      // Count passed tests
      const passedTests = testResults.filter(test => test.passed).length;
      setTestsPassed(passedTests);
      
      // Format output
      let outputText = '===== TEST RESULTS =====\n\n';
      testResults.forEach((test, index) => {
        outputText += `Test #${index + 1}: ${test.name}\n`;
        outputText += test.passed 
          ? '✅ PASSED\n' 
          : `❌ FAILED: ${test.error || 'Unexpected result'}\n`;
        
        if (test.expected !== undefined) {
          outputText += `Expected: ${JSON.stringify(test.expected)}\n`;
          outputText += `Received: ${JSON.stringify(test.actual)}\n`;
        }
        outputText += '\n';
      });
      
      outputText += `\n${passedTests} of ${testResults.length} tests passed.\n`;
      
      if (response.data.output) {
        outputText += '\n===== CONSOLE OUTPUT =====\n\n';
        outputText += response.data.output;
      }
      
      setOutput(outputText);
      
    } catch (error) {
      console.error('Error running code:', error);
      setOutput(`Error: ${error.response?.data?.message || error.message || 'Failed to execute code'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`/api/game/missions/${missionId}/verify`, {
        userId,
        solution: code,
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
    if (missionData) {
      setCode(missionData.content.initialCode || '');
      setOutput('');
      setResult(null);
      setTestResults([]);
      setTestsPassed(0);
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

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Mission header */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">{missionData.title}</h2>
          <p className="text-green-200 mt-1">Find and fix the bugs in the API code</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="bg-green-800/50 px-3 py-1 rounded-md text-sm text-white">
            Time: {formatTime(timeElapsed)}
          </div>
          <div className="bg-green-800/50 px-3 py-1 rounded-md text-sm text-white">
            Tests: <span className={testsPassed === totalTests ? 'text-green-300' : 'text-yellow-300'}>
              {testsPassed}/{totalTests}
            </span>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="p-2 bg-green-800/50 rounded-md hover:bg-green-700/50"
            title="Toggle hint"
          >
            <FaLightbulb className="text-yellow-300" />
          </button>
          <button
            onClick={resetMission}
            className="p-2 bg-green-800/50 rounded-md hover:bg-green-700/50"
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
          <p className="text-gray-300">{missionData.description || 'Fix the bugs in the API code to make all the tests pass.'}</p>
          
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
                  {missionData.content.hint || "Look for common API bugs like missing error handling, incorrect status codes, route parameter issues, or missing middleware."}
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* API documentation */}
        {missionData.content.apiDocs && (
          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">API Documentation</h3>
            <div className="border border-gray-700 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-auto max-h-60">
              <pre>{missionData.content.apiDocs}</pre>
            </div>
          </div>
        )}
        
        {/* Code editor and terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Code editor */}
          <div className="lg:col-span-3 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
              <div className="text-gray-300 font-medium">{missionData.content.filename || 'index.js'}</div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className={`
                    px-3 py-1 rounded text-sm flex items-center
                    ${isRunning ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'}
                  `}
                >
                  {isRunning ? (
                    <>
                      <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-1"></div>
                      Running...
                    </>
                  ) : (
                    <>
                      <FaPlay size={10} className="mr-1" /> Run Tests
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="h-[400px]">
              <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={setCode}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  tabSize: 2,
                }}
              />
            </div>
          </div>
          
          {/* Terminal output */}
          <div className="lg:col-span-2 border border-gray-700 rounded-lg overflow-hidden flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center">
              <FaTerminal className="text-gray-400 mr-2" />
              <div className="text-gray-300 font-medium">Output</div>
            </div>
            
            <div className="bg-black flex-grow p-4 font-mono text-sm text-gray-300 whitespace-pre-wrap overflow-auto max-h-[400px]">
              {output || 'Run your code to see the output...'}
            </div>
          </div>
        </div>
        
        {/* Test results summary */}
        {testResults.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {testResults.map((test, index) => (
              <div 
                key={index} 
                className={`
                  border rounded-lg p-3
                  ${test.passed ? 'border-green-800 bg-green-900/20' : 'border-red-800 bg-red-900/20'}
                `}
              >
                <div className="flex items-center">
                  {test.passed ? (
                    <FaCheck className="text-green-500 mr-2" />
                  ) : (
                    <FaTimes className="text-red-500 mr-2" />
                  )}
                  <h4 className="font-medium text-white">{test.name}</h4>
                </div>
                {!test.passed && test.error && (
                  <p className="text-red-400 text-sm mt-1">{test.error}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Submit button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || testsPassed < totalTests}
            className={`
              px-4 py-2 rounded-md text-white flex items-center
              ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 
                testsPassed < totalTests ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </>
            ) : testsPassed < totalTests ? (
              'All Tests Must Pass'
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
              <FaCheck className="text-green-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
            ) : (
              <FaTimes className="text-red-500 text-xl flex-shrink-0 mt-0.5 mr-3" />
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

export default FixBrokenAPI;