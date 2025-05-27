
import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Map, MapPin, Train } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'timeline', label: 'Timeline', icon: Calendar },
  { id: 'map', label: 'Map', icon: Map },
  { id: 'places', label: 'Places', icon: MapPin },
  { id: 'transport', label: 'Travel', icon: Train }
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t border-border/50 z-50 mobile-safe-area no-select" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
      <div className="flex justify-around items-center py-2 px-2">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 min-w-0 flex-1 mx-1"
            >
              <IconComponent 
                size={20} 
                className="mb-1 transition-colors duration-200" 
                color={activeTab === tab.id ? '#945BD9' : '#dadada'}
                fill="none"
                strokeWidth={2}
              />
              <span 
                className="text-xs font-medium truncate"
                style={{ color: activeTab === tab.id ? '#945BD9' : '#dadada' }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
