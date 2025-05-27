
import React, { useState } from 'react';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';

const categoryColors = {
  concert: 'bg-palette-pink text-palette-pink-dark border-palette-pink-dark/20',
  cafe: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20',
  bar: 'bg-palette-purple text-palette-purple-dark border-palette-purple-dark/20',
  gaming: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20',
  shopping: 'bg-palette-pink text-palette-pink-dark border-palette-pink-dark/20',
  sightseeing: 'bg-palette-purple text-palette-purple-dark border-palette-purple-dark/20',
  transport: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20',
  accommodation: 'bg-palette-purple text-palette-purple-dark border-palette-purple-dark/20',
  restaurant: 'bg-palette-pink text-palette-pink-dark border-palette-pink-dark/20',
  pub: 'bg-palette-purple text-palette-purple-dark border-palette-purple-dark/20'
};

const categoryIcons = {
  concert: '🎵',
  cafe: '☕',
  bar: '🍸',
  gaming: '🎮',
  shopping: '🛍️',
  sightseeing: '🏛️',
  transport: '🚂',
  accommodation: '🏨',
  restaurant: '🍽️',
  pub: '🍺'
};

const categories = [
  { id: 'all', name: 'All Places', icon: '📍' },
  { id: 'concert', name: 'Concerts', icon: '🎵' },
  { id: 'cafe', name: 'Cafés', icon: '☕' },
  { id: 'bar', name: 'Bars', icon: '🍸' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️' },
  { id: 'sightseeing', name: 'Sights', icon: '🏛️' },
  { id: 'restaurant', name: 'Food', icon: '🍽️' },
  { id: 'pub', name: 'Pubs', icon: '🍺' }
];

const PlaceCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="group rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-[#ececec]" style={{ backgroundColor: '#ffffff' }}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-gentle-bounce">
              {categoryIcons[activity.category]}
            </div>
            <h3 className="font-semibold transition-colors" style={{ color: '#252525' }}>
              {activity.name}
            </h3>
          </div>
          <span className={cn(
            "text-xs px-2.5 py-1 rounded-full border font-medium",
            categoryColors[activity.category]
          )}>
            {activity.location}
          </span>
        </div>
        
        {activity.address && (
          <p className="text-sm mb-3 flex items-center" style={{ color: '#252525', opacity: 0.7 }}>
            <span className="mr-2">📍</span>
            {activity.address}
          </p>
        )}
        
        {activity.description && (
          <p className="text-sm mb-3 leading-relaxed" style={{ color: '#252525', opacity: 0.8 }}>
            {activity.description}
          </p>
        )}
        
        {activity.notes && (
          <p className="text-xs mb-3 italic bg-muted/50 p-2 rounded-lg" style={{ color: '#252525', opacity: 0.7 }}>
            💭 {activity.notes}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          {activity.time && (
            <span className="font-medium text-sm flex items-center" style={{ color: '#945BD9' }}>
              <span className="mr-1">🕐</span>
              {activity.time}
            </span>
          )}
          {activity.price && (
            <span className="text-xs px-3 py-1.5 rounded-full font-medium shadow-sm" style={{ backgroundColor: '#945BD9', color: '#ffffff' }}>
              {activity.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Places: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Flatten all activities from all days
  const allActivities = tripData.days.reduce((acc, day) => {
    return acc.concat(day.activities);
  }, [] as Activity[]);

  // Filter activities based on selected category
  const filteredActivities = selectedCategory === 'all' 
    ? allActivities.filter(activity => 
        !['transport', 'accommodation'].includes(activity.category)
      )
    : allActivities.filter(activity => activity.category === selectedCategory);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3" style={{ color: '#252525' }}>
          Places to Visit
        </h1>
        <p style={{ color: '#252525', opacity: 0.7 }}>Discover amazing spots on your journey ✨</p>
      </div>

      {/* Category filters */}
      <div className="flex overflow-x-auto space-x-3 pb-4 mb-8 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 shadow-md border border-[#ececec]",
              selectedCategory === category.id
                ? "shadow-lg scale-105"
                : ""
            )}
            style={selectedCategory === category.id 
              ? { backgroundColor: '#945BD9', color: '#ffffff' }
              : { backgroundColor: '#ffffff', color: '#252525' }
            }
          >
            <span className="text-lg">{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Activities grid */}
      <div className="space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <PlaceCard activity={activity} />
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 animate-gentle-bounce">🔍</div>
            <p className="text-lg" style={{ color: '#252525', opacity: 0.7 }}>No places found in this category</p>
            <p className="text-sm mt-2" style={{ color: '#252525', opacity: 0.5 }}>Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;
