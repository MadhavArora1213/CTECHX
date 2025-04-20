import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations/motionVariants';

const EventsSection = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const events = {
    upcoming: [
      {
        id: 1,
        title: "Web Dev Bootcamp",
        date: "May 15, 2025",
        time: "2:00 PM - 5:00 PM",
        location: "Tech Hub, Room 204",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Workshop",
        description: "Learn modern web development techniques using React and Node.js."
      },
      {
        id: 2,
        title: "Hackathon 2025",
        date: "June 3-5, 2025",
        time: "9:00 AM - 9:00 PM",
        location: "Main Campus Arena",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Competition",
        description: "48-hour coding challenge with amazing prizes and opportunities."
      },
      {
        id: 3,
        title: "AI/ML Study Group",
        date: "May 22, 2025",
        time: "4:00 PM - 6:00 PM",
        location: "Virtual (Zoom)",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Study Group",
        description: "Weekly machine learning concepts and practice sessions."
      },
    ],
    past: [
      {
        id: 4,
        title: "GitHub Workshop",
        date: "April 10, 2025",
        time: "3:00 PM - 4:30 PM",
        location: "Tech Hub, Room 101",
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Workshop",
        description: "Introduction to version control and collaborative development."
      },
      {
        id: 5,
        title: "Tech Talk: The Future of Web3",
        date: "March 28, 2025",
        time: "5:00 PM - 7:00 PM",
        location: "Main Auditorium",
        image: "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Tech Talk",
        description: "Industry experts discuss blockchain and decentralized applications."
      },
    ]
  };

  return (
    <section id="events" className="py-16 md:py-24 bg-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn('up', 0.2)}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold bg-indigo-900/50 text-indigo-300 rounded-full mb-4">
            Events Calendar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Upcoming Events & Workshops</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Stay updated with our latest workshops, hackathons, and tech talks designed to 
            enhance your skills and connect with like-minded individuals.
          </p>
        </motion.div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <motion.button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'upcoming' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('upcoming')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Upcoming Events
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'past' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('past')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Past Events
            </motion.button>
          </div>
        </div>

        {/* Events Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {events[activeTab].map((event) => (
            <motion.div
              key={event.id}
              className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 group"
              variants={fadeIn('up')}
            >
              <div className="relative overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-indigo-900/80 backdrop-blur-sm text-indigo-200 text-xs font-semibold rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{event.date}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{event.title}</h3>
                <p className="text-gray-400 mb-4">{event.description}</p>
                
                <div className="flex items-center text-gray-400 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                <motion.button
                  className="mt-6 w-full py-2 rounded-lg bg-gray-700 text-gray-300 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === 'upcoming' ? 'Register Now' : 'View Details'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Events Button */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="inline-block px-6 py-3 rounded-full border border-gray-600 text-gray-300 hover:text-white hover:border-indigo-500 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Events
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;