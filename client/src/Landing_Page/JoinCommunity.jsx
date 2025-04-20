import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideIn } from '../animations/motionVariants';
import confetti from 'canvas-confetti'; // Install this package

const JoinCommunity = () => {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    newsletter: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const nextStep = () => {
    setFormStep(formStep + 1);
  };
  
  const prevStep = () => {
    setFormStep(formStep - 1);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setFormSubmitted(true);
    
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  const formSteps = [
    // Step 1: Basic info
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
              placeholder="John Doe"
            />
          </motion.div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
              placeholder="john@example.com"
            />
          </motion.div>
        </div>
        
        <motion.button
          type="button"
          className="w-full px-6 py-3 mt-6 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium"
          onClick={nextStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={!formData.name || !formData.email}
        >
          Next Step
        </motion.button>
      </div>
    </>,
    
    // Step 2: Preferences
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Area of Interest</label>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <select 
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
            >
              <option value="" disabled>Select your interest</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="ai">AI/Machine Learning</option>
              <option value="design">UI/UX Design</option>
              <option value="blockchain">Blockchain</option>
              <option value="other">Other</option>
            </select>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex items-start pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center h-5">
            <input
              id="newsletter"
              name="newsletter"
              type="checkbox"
              checked={formData.newsletter}
              onChange={handleInputChange}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="newsletter" className="text-gray-400">Subscribe to our newsletter for latest updates</label>
          </div>
        </motion.div>
        
        <div className="flex justify-between gap-4 mt-6">
          <motion.button
            type="button"
            className="w-full px-6 py-3 border border-gray-600 rounded-lg text-gray-300 font-medium"
            onClick={prevStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03, borderColor: "#8B5CF6", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
          >
            Back
          </motion.button>
          
          <motion.button
            type="button"
            className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium"
            onClick={nextStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!formData.interest}
          >
            Next Step
          </motion.button>
        </div>
      </div>
    </>,
    
    // Step 3: Confirmation
    <>
      <div className="space-y-6">
        <motion.div 
          className="bg-gray-800/70 rounded-lg p-6 border border-gray-700"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-white mb-4">Confirm Your Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="text-white font-medium">{formData.name}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white font-medium">{formData.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Interest:</span>
              <span className="text-white font-medium">
                {formData.interest === 'web' && 'Web Development'}
                {formData.interest === 'mobile' && 'Mobile Development'}
                {formData.interest === 'ai' && 'AI/Machine Learning'}
                {formData.interest === 'design' && 'UI/UX Design'}
                {formData.interest === 'blockchain' && 'Blockchain'}
                {formData.interest === 'other' && 'Other'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">Newsletter:</span>
              <span className="text-white font-medium">{formData.newsletter ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </motion.div>
        
        <div className="flex justify-between gap-4">
          <motion.button
            type="button"
            className="w-full px-6 py-3 border border-gray-600 rounded-lg text-gray-300 font-medium"
            onClick={prevStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03, borderColor: "#8B5CF6", color: "#fff" }}
            whileTap={{ scale: 0.97 }}
          >
            Back
          </motion.button>
          
          <motion.button
            type="button"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-medium"
            onClick={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Complete Registration
          </motion.button>
        </div>
      </div>
    </>
  ];
  
  // Success message after form submission
  const successMessage = (
    <motion.div
      className="text-center py-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Community!</h3>
      <p className="text-gray-300 mb-6">We're excited to have you join us. Check your email for confirmation.</p>
      
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a
          href="#"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
          </svg>
          Join Discord
        </a>
        
        <a
          href="#"
          className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
          View Resources
        </a>
      </motion.div>
    </motion.div>
  );
  
  return (
    <section id="join" className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Section - Content */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn('right', 0.2)}
          >
            <span className="inline-block px-3 py-1 text-sm font-semibold bg-indigo-900/50 text-indigo-300 rounded-full mb-4">
              Join Our Community
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Ready to Level Up Your Coding Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Connect with fellow coders, access exclusive resources, participate in events,
              and accelerate your growth as a developer in our supportive community.
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {[
                "Access to mentorship from seniors and professionals",
                "Weekly coding challenges and pair programming sessions",
                "Exclusive workshops and learning resources",
                "Networking opportunities with tech companies"
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mr-3 mt-1 bg-green-500/20 p-1 rounded-full">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Stats Counter */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {[
                { value: "500+", label: "Members" },
                { value: "50+", label: "Projects" },
                { value: "30+", label: "Events" },
                { value: "15+", label: "Partners" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
            
            {/* Only visible on mobile */}
            <div className="lg:hidden flex justify-center my-8">
              <motion.button
                className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-600/20"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('join-form').scrollIntoView({behavior: 'smooth'})}
              >
                Join Now - It's Free
              </motion.button>
            </div>
          </motion.div>
          
          {/* Right Section - Form */}
          <motion.div 
            className="w-full lg:w-1/2"
            id="join-form"
            variants={slideIn('right', 'spring', 0.4, 0.8)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10"></div>
              
              <div className="relative">
                {!formSubmitted ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white">Get Started Today</h3>
                      
                      {/* Progress Indicator */}
                      <div className="flex gap-2">
                        {[0, 1, 2].map((step) => (
                          <div
                            key={step}
                            className={`w-2.5 h-2.5 rounded-full ${
                              step === formStep 
                                ? 'bg-indigo-500' 
                                : step < formStep
                                  ? 'bg-green-500' 
                                  : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <form>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={formStep}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {formSteps[formStep]}
                        </motion.div>
                      </AnimatePresence>
                    </form>
                  </>
                ) : (
                  successMessage
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;