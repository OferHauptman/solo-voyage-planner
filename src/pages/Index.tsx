
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Timeline from '@/components/Timeline';
import Map from '@/components/Map';
import Places from '@/components/Places';
import Transport from '@/components/Transport';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';

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
    <ThemeProvider defaultTheme="light" storageKey="trip-app-theme">
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 transition-all duration-500">
        {/* Header */}
        <header className="glass-effect border-b border-border/50 backdrop-blur-xl sticky top-0 z-40">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Solo Journey
                </h1>
                <p className="text-muted-foreground text-sm">London & Belgium Adventure</p>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="animate-fade-in">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ThemeProvider>
  );
};

export default Index;
