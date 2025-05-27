
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarDays, MapPin, Plane } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'timeline', label: 'Timeline', icon: CalendarDays },
  { id: 'places', label: 'Places', icon: MapPin },
  { id: 'transport', label: 'Travel', icon: Plane }
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t border-border/50 z-50 mobile-safe-area no-select" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', height: '88px' }}>
      <div className="flex justify-around items-center px-2 h-full">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center rounded-2xl transition-all duration-300 flex-1 mx-1"
              style={{ height: '64px', minHeight: '64px' }}
            >
              <IconComponent 
                size={24} 
                className="mb-1 transition-colors duration-200" 
                color={activeTab === tab.id ? '#252525' : '#959595'}
                fill={activeTab === tab.id ? '#252525' : 'none'}
                strokeWidth={activeTab === tab.id ? 0 : 1.5}
              />
              <span 
                className="text-xs font-medium truncate leading-tight"
                style={{ 
                  color: activeTab === tab.id ? '#252525' : '#959595',
                  height: '16px',
                  lineHeight: '16px'
                }}
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
