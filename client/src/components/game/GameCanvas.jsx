// src/components/game/GameCanvas.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Interactive 3D game canvas for space navigation
 */
const GameCanvas = ({ 
  planets = [],
  activePlanetId = null,
  onSelectPlanet,
  isLoading = false,
  className = ''
}) => {
  const mountRef = useRef(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const planetMeshesRef = useRef({});
  
  // Initialize ThreeJS scene
  useEffect(() => {
    if (isLoading || !mountRef.current) return;
    
    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050a18');
    sceneRef.current = scene;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;
    
    // Add star field
    addStarField(scene);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse move for planet interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      
      mouse.x = ((event.clientX - rect.left) / mountRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / mountRef.current.clientHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObjects(scene.children);
      
      if (intersects.length > 0) {
        const planetObj = intersects[0].object;
        if (planetObj.userData.isPlanet) {
          setHoveredPlanet(planetObj.userData.planetId);
        } else {
          setHoveredPlanet(null);
        }
      } else {
        setHoveredPlanet(null);
      }
    };
    
    const handleClick = () => {
      if (hoveredPlanet && onSelectPlanet) {
        onSelectPlanet(hoveredPlanet);
      }
    };
    
    mountRef.current.addEventListener('mousemove', handleMouseMove);
    mountRef.current.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeEventListener('click', handleClick);
      
      // Dispose of ThreeJS resources
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      Object.values(planetMeshesRef.current).forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      
      scene.clear();
    };
  }, [isLoading]);
  
  // Add planets when data is available
  useEffect(() => {
    if (isLoading || !sceneRef.current || planets.length === 0) return;
    
    // Remove existing planets
    Object.values(planetMeshesRef.current).forEach(mesh => {
      sceneRef.current.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    
    planetMeshesRef.current = {};
    
    // Add new planets in a circular arrangement
    const totalPlanets = planets.length;
    const radius = 10;
    
    planets.forEach((planet, index) => {
      // Load planet texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(getPlanetTexture(planet.techType), () => {}, 
        (err) => console.error('Error loading texture:', err));
      
      // Create planet geometry
      const geometry = new THREE.SphereGeometry(planet.unlocked ? 1.2 : 0.8, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        map: texture,
        roughness: 0.7,
        metalness: 0.3,
        opacity: planet.unlocked ? 1 : 0.3,
        transparent: !planet.unlocked
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position planet in a circle
      const angle = (index / totalPlanets) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = (Math.random() - 0.5) * 4; // Random vertical position
      
      // Planet data for interaction
      mesh.userData = {
        isPlanet: true,
        planetId: planet.id,
        name: planet.name,
        unlocked: planet.unlocked
      };
      
      sceneRef.current.add(mesh);
      planetMeshesRef.current[planet.id] = mesh;
      
      // Create orbit ring for the active planet
      if (planet.id === activePlanetId) {
        const ringGeometry = new THREE.RingGeometry(1.8, 2.2, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x00ffff,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        
        // Rotate ring to be horizontal
        ringMesh.rotation.x = Math.PI / 2;
        
        mesh.add(ringMesh);
        
        // Focus camera on active planet
        if (controlsRef.current) {
          controlsRef.current.target.copy(mesh.position);
          cameraRef.current.position.set(
            mesh.position.x + 3,
            mesh.position.y + 2,
            mesh.position.z + 3
          );
        }
      }
    });
  }, [planets, activePlanetId, isLoading]);
  
  // Highlight planet on hover
  useEffect(() => {
    Object.entries(planetMeshesRef.current).forEach(([planetId, mesh]) => {
      if (planetId === hoveredPlanet) {
        // Scale up hovered planet
        mesh.scale.set(1.15, 1.15, 1.15);
      } else {
        // Normal scale for other planets
        mesh.scale.set(1, 1, 1);
      }
    });
  }, [hoveredPlanet]);
  
  // Add a star field to the scene
  const addStarField = (scene) => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1
    });
    
    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }
    
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
  };
  
  // Get planet textures based on tech type
  const getPlanetTexture = (techType) => {
    const textures = {
      'fullStack': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/earth_day_alpha_4096.png',
      'ai': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/venus_atmosphere_4096.jpg',
      'android': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004841/mars_4k_color.jpg',
      'cybersecurity': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004851/jupiter_4k.jpg',
      'devops': 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004769/saturn_4k.jpg',
      'algorithms': 'https://svs.gsfc.nasa.gov/vis/a000000/a004400/a004442/uranus_4k.jpg',
      'default': 'https://svs.gsfc.nasa.gov/vis/a000000/a004800/a004874/earth_day_alpha_4096.png'
    };
    
    return textures[techType] || textures['default'];
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className={`relative w-full h-96 md:h-[600px] ${className} bg-gray-900 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-300">Loading galaxy map...</p>
        </div>
      </div>
    );
  }
  
  // Render planet info for hovered planet
  const renderPlanetInfo = () => {
    if (!hoveredPlanet) return null;
    
    const planet = planets.find(p => p.id === hoveredPlanet);
    if (!planet) return null;
    
    return (
      <motion.div 
        className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg max-w-[300px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-white">
          {planet.name}
        </h3>
        <p className="text-sm text-gray-300 mb-2">{planet.description}</p>
        {!planet.unlocked && (
          <div className="bg-red-900/50 text-red-100 px-2 py-1 rounded text-xs">
            Locked - Reach higher level to unlock
          </div>
        )}
      </motion.div>
    );
  };
  
  return (
    <div className={`relative w-full h-96 md:h-[600px] ${className}`}>
      <div ref={mountRef} className="absolute inset-0" />
      {renderPlanetInfo()}
    </div>
  );
};

GameCanvas.propTypes = {
  planets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      techType: PropTypes.string.isRequired,
      unlocked: PropTypes.bool.isRequired
    })
  ),
  activePlanetId: PropTypes.string,
  onSelectPlanet: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default GameCanvas;