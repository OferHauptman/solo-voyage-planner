
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center py-2 px-4 rounded-lg transition-all duration-200",
              activeTab === tab.id
                ? "bg-travel-blue text-white transform scale-105"
                : "text-gray-600 hover:text-travel-blue hover:bg-gray-50"
            )}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
