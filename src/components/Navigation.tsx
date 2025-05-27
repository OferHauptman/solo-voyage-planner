
import React from 'react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'timeline', label: 'Timeline', icon: '📅' },
  { id: 'map', label: 'Map', icon: '🗺️' },
  { id: 'places', label: 'Places', icon: '📍' },
  { id: 'transport', label: 'Travel', icon: '🚂' }
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t border-border/50 z-50 mobile-safe-area no-select" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <div className="flex justify-around items-center py-2 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1 mx-1",
              activeTab === tab.id
                ? "shadow-lg scale-105"
                : "hover:bg-primary/10"
            )}
            style={activeTab === tab.id 
              ? { backgroundColor: '#945BD9', color: '#ffffff' }
              : { color: '#252525' }
            }
          >
            <span className="text-xl mb-1 transition-transform duration-200">{tab.icon}</span>
            <span className="text-xs font-medium truncate">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
