
import React, { useState } from 'react';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';

const categoryColors = {
  concert: 'bg-purple-500/10 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
  cafe: 'bg-amber-500/10 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30',
  bar: 'bg-red-500/10 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30',
  gaming: 'bg-green-500/10 text-green-700 border-green-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30',
  shopping: 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30',
  sightseeing: 'bg-indigo-500/10 text-indigo-700 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30',
  transport: 'bg-gray-500/10 text-gray-700 border-gray-200 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/30',
  accommodation: 'bg-orange-500/10 text-orange-700 border-orange-200 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30',
  restaurant: 'bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30',
  pub: 'bg-rose-500/10 text-rose-700 border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
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
    <div className="group bg-card rounded-2xl shadow-lg hover:shadow-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 border border-[#ececec]">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-gentle-bounce">
              {categoryIcons[activity.category]}
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
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
          <p className="text-muted-foreground text-sm mb-3 flex items-center">
            <span className="mr-2">📍</span>
            {activity.address}
          </p>
        )}
        
        {activity.description && (
          <p className="text-foreground/80 text-sm mb-3 leading-relaxed">
            {activity.description}
          </p>
        )}
        
        {activity.notes && (
          <p className="text-muted-foreground text-xs mb-3 italic bg-muted/50 p-2 rounded-lg">
            💭 {activity.notes}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          {activity.time && (
            <span className="text-primary font-medium text-sm flex items-center">
              <span className="mr-1">🕐</span>
              {activity.time}
            </span>
          )}
          {activity.price && (
            <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
          Places to Visit
        </h1>
        <p className="text-muted-foreground">Discover amazing spots on your journey ✨</p>
      </div>

      {/* Category filters */}
      <div className="flex overflow-x-auto space-x-3 pb-4 mb-8 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg border border-[#ececec]",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground shadow-lg scale-105"
                : "bg-card text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
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
            <p className="text-muted-foreground text-lg">No places found in this category</p>
            <p className="text-muted-foreground/70 text-sm mt-2">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;
