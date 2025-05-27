
import React, { useState } from 'react';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';
import { Music, Coffee, Wine, Gamepad2, ShoppingBag, Camera, Train, Hotel, Utensils, Beer } from 'lucide-react';

const categoryColors = {
  concert: 'bg-palette-pink text-white',
  cafe: 'bg-palette-orange text-white',
  bar: 'bg-palette-purple text-white',
  gaming: 'bg-palette-orange text-white',
  shopping: 'bg-palette-pink text-white',
  sightseeing: 'bg-palette-purple text-white',
  transport: 'bg-palette-orange text-white',
  accommodation: 'bg-palette-purple text-white',
  restaurant: 'bg-palette-pink text-white',
  pub: 'bg-palette-purple text-white'
};

const categoryIcons = {
  concert: Music,
  cafe: Coffee,
  bar: Wine,
  gaming: Gamepad2,
  shopping: ShoppingBag,
  sightseeing: Camera,
  transport: Train,
  accommodation: Hotel,
  restaurant: Utensils,
  pub: Beer
};

const PlaceCard: React.FC<{ activity: Activity; isSelected: boolean }> = ({ activity, isSelected }) => {
  const IconComponent = categoryIcons[activity.category];

  return (
    <div 
      id={`place-${activity.id}`}
      className={cn(
        "rounded-2xl shadow-sm overflow-hidden backdrop-blur-sm border transition-all duration-300",
        isSelected ? "border-primary shadow-lg" : "border-[#ececec]"
      )} 
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold flex-1" style={{ color: '#252525' }}>
            {activity.name}
          </h3>
          <span className={cn(
            "text-xs px-2.5 py-1 rounded-full font-medium ml-3 flex items-center space-x-1",
            categoryColors[activity.category]
          )}>
            <IconComponent size={12} />
            <span>{activity.category}</span>
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
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  // Flatten all activities from all days
  const allActivities = tripData.days.reduce((acc, day) => {
    return acc.concat(day.activities.filter(activity => 
      !['transport'].includes(activity.category) && activity.coordinates
    ));
  }, [] as Activity[]);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      {/* Simple Map Placeholder */}
      <div className="mb-8">
        <div className="h-80 w-full rounded-lg border border-[#ececec] bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Google Maps integration needed</p>
            <p className="text-sm text-gray-500">Please add your Google Maps API key</p>
          </div>
        </div>
        <p className="text-xs text-center mt-2" style={{ color: '#252525', opacity: 0.6 }}>
          Click on markers to see place details below
        </p>
      </div>

      {/* Places List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#252525' }}>
          Places to Visit
        </h2>
        {allActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PlaceCard 
              activity={activity} 
              isSelected={selectedPlaceId === activity.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
