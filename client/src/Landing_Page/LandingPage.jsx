import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import CommunityShowcase from './CommunityShowcase';
import EventsSection from './EventSection';
import ProjectsGallery from './ProjectsGallery';
import JoinCommunity from './JoinCommunity';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CommunityShowcase />
      <EventsSection />
      <ProjectsGallery />
      <JoinCommunity />
      <Footer />
    </div>
  );
};

export default LandingPage;