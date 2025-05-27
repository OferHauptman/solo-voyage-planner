
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Timeline from '@/components/Timeline';
import Places from '@/components/Places';
import Transport from '@/components/Transport';

const Index = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  const renderContent = () => {
    switch (activeTab) {
      case 'timeline':
        return <Timeline />;
      case 'places':
        return <Places />;
      case 'transport':
        return <Transport />;
      default:
        return <Timeline />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f7f7' }}>
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
