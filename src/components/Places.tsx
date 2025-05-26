import React, { useState } from 'react';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';

const categoryColors = {
  concert: 'bg-purple-500',
  cafe: 'bg-amber-500',
  bar: 'bg-red-500',
  gaming: 'bg-green-500',
  shopping: 'bg-blue-500',
  sightseeing: 'bg-indigo-500',
  transport: 'bg-gray-500',
  accommodation: 'bg-orange-500',
  restaurant: 'bg-emerald-500',
  pub: 'bg-rose-500'
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className={cn(
        "h-2",
        categoryColors[activity.category]
      )} />
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{categoryIcons[activity.category]}</span>
            <h3 className="font-semibold text-gray-900">{activity.name}</h3>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {activity.location}
          </span>
        </div>
        
        {activity.address && (
          <p className="text-gray-600 text-sm mb-2">{activity.address}</p>
        )}
        
        {activity.description && (
          <p className="text-gray-700 text-sm mb-3">{activity.description}</p>
        )}
        
        {activity.notes && (
          <p className="text-gray-600 text-xs mb-2 italic">{activity.notes}</p>
        )}
        
        <div className="flex items-center justify-between">
          {activity.time && (
            <span className="text-travel-blue font-medium text-sm">{activity.time}</span>
          )}
          {activity.price && (
            <span className="bg-travel-orange text-white text-xs px-2 py-1 rounded-full">
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
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-travel-navy mb-2">Places to Visit</h1>
        <p className="text-gray-600">Discover amazing spots on your journey</p>
      </div>

      {/* Category filters */}
      <div className="flex overflow-x-auto space-x-2 pb-4 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200",
              selectedCategory === category.id
                ? "bg-travel-blue text-white border-travel-blue"
                : "bg-white text-gray-600 border-gray-200 hover:border-travel-blue hover:text-travel-blue"
            )}
          >
            <span>{category.icon}</span>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Activities grid */}
      <div className="space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <PlaceCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-gray-500">No places found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Places;
