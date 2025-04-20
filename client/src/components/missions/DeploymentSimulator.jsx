// src/components/missions/codeforge/DeploymentSimulator.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaServer, FaDocker, FaCloudUploadAlt, FaDatabase, FaCheck, FaExclamationTriangle, FaCog } from 'react-icons/fa';
import CodeEditor from '../common/CodeEditor';
import MissionComplete from '../common/MissionComplete';

const DeploymentSimulator = () => {
    const navigate = useNavigate();
    const { userId, missionId } = useParams();

    const [missionData, setMissionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [deploymentSteps, setDeploymentSteps] = useState([]);
    const [configs, setConfigs] = useState({
        dockerfile: '',
        nginxConfig: '',
        cicdConfig: ''
    });
    const [logs, setLogs] = useState([]);
    const [deploying, setDeploying] = useState(false);
    const [deploymentSuccess, setDeploymentSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchMissionData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/game/missions/${missionId}`, {
                    params: { userId }
                });

                setMissionData(response.data);

                // Initialize deployment steps
                const steps = [
                    {
                        id: 'setup',
                        name: 'Environment Setup',
                        status: 'pending',
                        description: 'Configure the application environment',
                        completed: false
                    },
                    {
                        id: 'build',
                        name: 'Build Docker Image',
                        status: 'pending',
                        description: 'Create a Docker image for the application',
                        completed: false
                    },
                    {
                        id: 'test',
                        name: 'Run Tests',
                        status: 'pending',
                        description: 'Execute automated tests',
                        completed: false
                    },
                    {
                        id: 'deploy',
                        name: 'Deploy to Production',
                        status: 'pending',
                        description: 'Deploy the application to production servers',
                        completed: false
                    }
                ];

                setDeploymentSteps(steps);

                // Set initial configurations from mission content
                if (response.data.content && response.data.content.configs) {
                    setConfigs(response.data.content.configs);
                }

            } catch (err) {
                console.error('Error fetching mission data:', err);
                setError('Failed to load mission data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMissionData();
    }, [missionId, userId]);

    // Handle configuration changes
    const handleConfigChange = (key, value) => {
        setConfigs(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Add a log message
    const addLog = (message, type = 'info') => {
        setLogs(prev => [...prev, {
            id: Date.now(),
            message,
            type,
            timestamp: new Date().toLocaleTimeString()
        }]);
    };

    // Start deployment process
    const startDeployment = async () => {
        setDeploying(true);
        setErrors([]);
        const newSteps = [...deploymentSteps];
        let currentErrors = [];
        let deploymentPoints = 100;

        // Add initial log
        addLog('Starting deployment process...', 'info');

        // Step 1: Environment Setup
        newSteps[0].status = 'in-progress';
        setDeploymentSteps(newSteps);
        await simulateProcessing(1500);

        // Check Dockerfile
        if (!configs.dockerfile.includes('FROM node:14')) {
            addLog('Error: Dockerfile should use node:14 as base image', 'error');
            currentErrors.push('Incorrect base image in Dockerfile');
            deploymentPoints -= 25;
        } else {
            addLog('✓ Base image validated', 'success');
        }

        if (!configs.dockerfile.includes('WORKDIR /app')) {
            addLog('Warning: Best practice is to set WORKDIR to /app', 'warning');
            deploymentPoints -= 10;
        } else {
            addLog('✓ Working directory configured correctly', 'success');
        }

        newSteps[0].status = currentErrors.length > 0 ? 'error' : 'completed';
        newSteps[0].completed = currentErrors.length === 0;
        setDeploymentSteps([...newSteps]);
        await simulateProcessing(1000);

        // Step 2: Build Docker Image
        newSteps[1].status = 'in-progress';
        setDeploymentSteps([...newSteps]);
        addLog('Building Docker image...', 'info');
        await simulateProcessing(2000);

        // Check if COPY and install commands exist
        if (!configs.dockerfile.includes('COPY package*.json') || !configs.dockerfile.includes('RUN npm install')) {
            addLog('Error: Missing package installation steps', 'error');
            currentErrors.push('Missing npm installation steps');
            deploymentPoints -= 15;
        } else {
            addLog('✓ Dependencies installation configured', 'success');
        }

        if (!configs.dockerfile.includes('COPY . .')) {
            addLog('Error: Application code not copied to image', 'error');
            currentErrors.push('Missing COPY command for application code');
            deploymentPoints -= 15;
        } else {
            addLog('✓ Application code copied to image', 'success');
        }

        newSteps[1].status = currentErrors.length > 0 ? 'error' : 'completed';
        newSteps[1].completed = currentErrors.length === 0;
        setDeploymentSteps([...newSteps]);

        // If severe errors in the first two steps, stop deployment
        if (currentErrors.length >= 3) {
            setErrors(currentErrors);
            setDeploying(false);
            addLog('Deployment failed due to configuration errors', 'error');
            return;
        }

        await simulateProcessing(1000);

        // Step 3: Run Tests
        newSteps[2].status = 'in-progress';
        setDeploymentSteps([...newSteps]);
        addLog('Running tests...', 'info');
        await simulateProcessing(2500);

        // Check for test command
        if (!configs.cicdConfig.includes('npm test') && !configs.cicdConfig.includes('npm run test')) {
            addLog('Warning: No test command found in CI/CD config', 'warning');
            deploymentPoints -= 10;
        } else {
            addLog('✓ Test command found', 'success');
        }

        addLog('All tests passed!', 'success');
        newSteps[2].status = 'completed';
        newSteps[2].completed = true;
        setDeploymentSteps([...newSteps]);
        await simulateProcessing(1000);

        // Step 4: Deploy to Production
        newSteps[3].status = 'in-progress';
        setDeploymentSteps([...newSteps]);
        addLog('Deploying to production...', 'info');
        await simulateProcessing(3000);

        // Check NGINX config
        if (!configs.nginxConfig.includes('proxy_pass') || !configs.nginxConfig.includes('location /')) {
            addLog('Error: NGINX configuration is missing proxy settings', 'error');
            currentErrors.push('Invalid NGINX configuration');
            deploymentPoints -= 20;
        } else {
            addLog('✓ NGINX configuration validated', 'success');
        }

        // Check for expose port
        if (!configs.dockerfile.includes('EXPOSE')) {
            addLog('Warning: No EXPOSE command in Dockerfile', 'warning');
            deploymentPoints -= 5;
        } else {
            addLog('✓ Port exposed correctly', 'success');
        }

        await simulateProcessing(1500);

        // Finalize deployment
        if (currentErrors.length === 0) {
            addLog('Deployment completed successfully!', 'success');
            newSteps[3].status = 'completed';
            newSteps[3].completed = true;
        } else {
            addLog('Deployment completed with warnings/errors', 'warning');
            newSteps[3].status = 'warning';
            newSteps[3].completed = true;
        }

        setDeploymentSteps([...newSteps]);
        setErrors(currentErrors);
        setDeploying(false);

        // Calculate final score
        setScore(Math.max(0, deploymentPoints));

        // Mark deployment as successful if score is above 70
        if (deploymentPoints >= 70) {
            setDeploymentSuccess(true);
        }
    };

    // Helper function to simulate processing time
    const simulateProcessing = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    // Handle mission completion
    const handleCompleteMission = async () => {
        try {
            await axios.post(`/api/game/missions/${missionId}/complete`, {
                userId,
                score
            });

            // Navigate back to planet view
            navigate(`/student/${userId}/gaming/planet/codeforge`);
        } catch (error) {
            console.error('Error completing mission:', error);
            setError('Failed to save mission progress');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-300">Loading deployment environment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md">
                    <h2 className="text-xl font-bold text-red-300 mb-2">Error</h2>
                    <p className="text-gray-300">{error}</p>
                    <button
                        className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md"
                        onClick={() => navigate(`/student/${userId}/gaming/planet/codeforge`)}
                    >
                        Return to Planet
                    </button>
                </div>
            </div>
        );
    }

    if (deploymentSuccess) {
        return (
            <MissionComplete
                score={score}
                onComplete={handleCompleteMission}
                title="Deployment Successful!"
                message="You've successfully configured and deployed the application. Your CI/CD pipeline is working correctly."
                tips={[
                    'Always include proper testing in your CI/CD pipeline',
                    'Docker containers should be lightweight and focused',
                    'NGINX configuration is crucial for proper routing'
                ]}
            />
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-white">{missionData?.title || 'Deployment Simulator'}</h1>
                <p className="text-gray-400 mt-2">
                    Configure your CI/CD pipeline to deploy the application successfully
                </p>
            </header>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Configuration area */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-700 px-4 py-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-white">Configuration Files</h2>
                                <button
                                    className="text-blue-400 hover:text-blue-300 text-sm"
                                    onClick={() => setShowHint(!showHint)}
                                >
                                    {showHint ? 'Hide Hints' : 'Show Hints'}
                                </button>
                            </div>
                        </div>

                        {/* Hints */}
                        <AnimatePresence>
                            {showHint && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-blue-900/20 border-t border-b border-blue-800 px-4 py-3"
                                >
                                    <h3 className="text-sm font-semibold text-blue-300 mb-2">Deployment Hints</h3>
                                    <ul className="text-sm text-blue-200 list-disc pl-5 space-y-1">
                                        <li>Use <code className="bg-blue-900/30 px-1 rounded">FROM node:14</code> as your base image</li>
                                        <li>Set working directory with <code className="bg-blue-900/30 px-1 rounded">WORKDIR /app</code></li>
                                        <li>Install dependencies before copying the application code</li>
                                        <li>Make sure to expose the application port with <code className="bg-blue-900/30 px-1 rounded">EXPOSE 3000</code></li>
                                        <li>Configure NGINX to proxy to your Node application</li>
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tabs for different config files */}
                        <div className="p-4">
                            <div className="flex border-b border-gray-700 mb-4">
                                <button
                                    className={`px-4 py-2 text-sm font-medium ${currentStep === 0 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                                    onClick={() => setCurrentStep(0)}
                                >
                                    Dockerfile
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm font-medium ${currentStep === 1 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                                    onClick={() => setCurrentStep(1)}
                                >
                                    NGINX Config
                                </button>
                                <button
                                    className={`px-4 py-2 text-sm font-medium ${currentStep === 2 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
                                    onClick={() => setCurrentStep(2)}
                                >
                                    CI/CD Config
                                </button>
                            </div>

                            {/* Code editors for each config */}
                            <div className="h-[calc(100vh-400px)] min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    {currentStep === 0 && (
                                        <motion.div
                                            key="dockerfile"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full"
                                        >
                                            <CodeEditor
                                                language="dockerfile"
                                                value={configs.dockerfile}
                                                onChange={(value) => handleConfigChange('dockerfile', value)}
                                                height="100%"
                                                placeholder={`# Write your Dockerfile here
FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]`}
                                            />
                                        </motion.div>
                                    )}

                                    {currentStep === 1 && (
                                        <motion.div
                                            key="nginx"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full"
                                        >
                                            <CodeEditor
                                                language="nginx"
                                                value={configs.nginxConfig}
                                                onChange={(value) => handleConfigChange('nginxConfig', value)}
                                                height="100%"
                                                placeholder="# Write your NGINX config here
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}"
                                            />
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="cicd"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="h-full"
                                        >
                                            <CodeEditor
                                                language="yaml"
                                                value={configs.cicdConfig}
                                                onChange={(value) => handleConfigChange('cicdConfig', value)}
                                                height="100%"
                                                placeholder="# Write your CI/CD config here
name: Deploy Application

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build Docker image
        run: docker build -t app-image .
      - name: Deploy to production
        run: |
          docker stop app-container || true
          docker run -d --name app-container app-image"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Deployment button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            className={`px-6 py-2 rounded-md text-white flex items-center space-x-2 ${deploying
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-500'
                                }`}
                            onClick={startDeployment}
                            disabled={deploying}
                        >
                            {deploying ? (
                                <>
                                    <FaCog className="animate-spin" />
                                    <span>Deploying...</span>
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt />
                                    <span>Deploy Application</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Error display */}
                    {errors.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 bg-red-900/20 border border-red-800 rounded-lg p-4"
                        >
                            <h3 className="text-sm font-semibold text-red-300 mb-2">Deployment Errors</h3>
                            <ul className="text-sm text-red-200 list-disc pl-5 space-y-1">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>

                {/* Deployment progress and logs */}
                <div>
                    {/* Deployment steps */}
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
                        <div className="bg-gray-700 px-4 py-3">
                            <h2 className="text-lg font-semibold text-white">Deployment Pipeline</h2>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4">
                                {deploymentSteps.map((step, index) => (
                                    <div key={step.id} className="flex items-start">
                                        {/* Step indicator */}
                                        <div className="relative">
                                            <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center
                        ${step.status === 'pending' ? 'bg-gray-700 text-gray-400' :
                                                    step.status === 'in-progress' ? 'bg-blue-600 text-white' :
                                                        step.status === 'completed' ? 'bg-green-600 text-white' :
                                                            step.status === 'warning' ? 'bg-yellow-600 text-white' :
                                                                'bg-red-600 text-white'
                                                }
                      `}>
                                                {step.status === 'pending' ? (index + 1) :
                                                    step.status === 'in-progress' ? <FaCog className="animate-spin" /> :
                                                        step.status === 'completed' ? <FaCheck /> :
                                                            <FaExclamationTriangle />
                                                }
                                            </div>

                                            {/* Connector line */}
                                            {index < deploymentSteps.length - 1 && (
                                                <div className="absolute left-4 top-8 w-0.5 h-10 bg-gray-700"></div>
                                            )}
                                        </div>

                                        {/* Step content */}
                                        <div className="ml-4 flex-1">
                                            <h3 className={`font-medium
                        ${step.status === 'pending' ? 'text-gray-400' :
                                                    step.status === 'in-progress' ? 'text-blue-400' :
                                                        step.status === 'completed' ? 'text-green-400' :
                                                            step.status === 'warning' ? 'text-yellow-400' :
                                                                'text-red-400'
                                                }
                      `}>
                                                {step.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Deployment logs */}
                    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gray-700 px-4 py-3">
                            <h2 className="text-lg font-semibold text-white">Deployment Logs</h2>
                        </div>
                        <div className="p-4">
                            <div className="bg-black/30 rounded-lg p-3 h-64 overflow-y-auto font-mono text-sm">
                                {logs.length === 0 ? (
                                    <div className="text-gray-500 italic">Logs will appear here during deployment</div>
                                ) : (
                                    logs.map(log => (
                                        <div
                                            key={log.id}
                                            className={`mb-1 ${log.type === 'error' ? 'text-red-400' :
                                                    log.type === 'warning' ? 'text-yellow-400' :
                                                        log.type === 'success' ? 'text-green-400' :
                                                            'text-gray-300'
                                                }`}
                                        >
                                            <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeploymentSimulator;