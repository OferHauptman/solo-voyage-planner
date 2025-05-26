
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Timeline from '@/components/Timeline';
import Map from '@/components/Map';
import Places from '@/components/Places';
import Transport from '@/components/Transport';

const Index = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  const renderContent = () => {
    switch (activeTab) {
      case 'timeline':
        return <Timeline />;
      case 'map':
        return <Map />;
      case 'places':
        return <Places />;
      case 'transport':
        return <Transport />;
      default:
        return <Timeline />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-travel-navy to-travel-blue text-white p-4 shadow-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-xl font-bold">Solo Journey</h1>
          <p className="text-blue-100 text-sm">London & Belgium Adventure</p>
        </div>
      </header>

      {/* Content */}
      <main className="animate-fade-in">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
