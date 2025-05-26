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

// Mock map component since we don't have actual map integration
const MapView: React.FC<{ activities: Activity[] }> = ({ activities }) => {
  const [selectedPin, setSelectedPin] = useState<Activity | null>(null);

  // Group activities by location for better visualization
  const londonActivities = activities.filter(a => a.location === 'London' && a.coordinates);
  const antwerpActivities = activities.filter(a => a.location === 'Antwerp' && a.coordinates);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
      {/* Mock map areas */}
      <div className="h-96 relative">
        {/* London section */}
        <div className="absolute top-4 left-4 w-32 h-32 bg-travel-blue/20 rounded-lg border-2 border-travel-blue border-dashed flex items-center justify-center">
          <div className="text-center">
            <span className="block text-2xl mb-1">🇬🇧</span>
            <span className="text-sm font-semibold text-travel-navy">London</span>
            <span className="block text-xs text-gray-600">Jun 5-8</span>
          </div>
        </div>

        {/* Antwerp section */}
        <div className="absolute bottom-4 right-4 w-32 h-32 bg-travel-orange/20 rounded-lg border-2 border-travel-orange border-dashed flex items-center justify-center">
          <div className="text-center">
            <span className="block text-2xl mb-1">🇧🇪</span>
            <span className="text-sm font-semibold text-travel-navy">Antwerp</span>
            <span className="block text-xs text-gray-600">Jun 9-11</span>
          </div>
        </div>

        {/* London pins */}
        {londonActivities.slice(0, 6).map((activity, index) => (
          <button
            key={activity.id}
            onClick={() => setSelectedPin(activity)}
            className={cn(
              "absolute w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs transition-transform duration-200 hover:scale-110",
              categoryColors[activity.category]
            )}
            style={{
              left: `${20 + (index % 3) * 15}%`,
              top: `${25 + Math.floor(index / 3) * 15}%`
            }}
          >
            {categoryIcons[activity.category]}
          </button>
        ))}

        {/* Antwerp pins */}
        {antwerpActivities.slice(0, 4).map((activity, index) => (
          <button
            key={activity.id}
            onClick={() => setSelectedPin(activity)}
            className={cn(
              "absolute w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs transition-transform duration-200 hover:scale-110",
              categoryColors[activity.category]
            )}
            style={{
              right: `${20 + (index % 2) * 15}%`,
              bottom: `${25 + Math.floor(index / 2) * 15}%`
            }}
          >
            {categoryIcons[activity.category]}
          </button>
        ))}

        {/* Connection line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 140 80 Q 200 150 260 280"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Selected pin info */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-sm border-2 border-white",
                  categoryColors[selectedPin.category]
                )}>
                  {categoryIcons[selectedPin.category]}
                </span>
                <h3 className="font-semibold text-gray-900">{selectedPin.name}</h3>
              </div>
              {selectedPin.address && (
                <p className="text-gray-600 text-sm mb-1">{selectedPin.address}</p>
              )}
              {selectedPin.time && (
                <p className="text-travel-blue font-medium text-sm">{selectedPin.time}</p>
              )}
            </div>
            <button
              onClick={() => setSelectedPin(null)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Map: React.FC = () => {
  // Get all activities with coordinates
  const allActivities = tripData.days.reduce((acc, day) => {
    return acc.concat(day.activities.filter(activity => activity.coordinates));
  }, [] as Activity[]);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-travel-navy mb-2">Trip Map</h1>
        <p className="text-gray-600">Your journey through London & Antwerp</p>
      </div>

      <MapView activities={allActivities} />

      {/* Legend */}
      <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Map Legend</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(categoryIcons).map(([category, icon]) => (
            <div key={category} className="flex items-center space-x-2">
              <span className={cn(
                "w-4 h-4 rounded-full flex items-center justify-center text-xs border border-white",
                categoryColors[category as keyof typeof categoryColors]
              )}>
                {icon}
              </span>
              <span className="text-sm text-gray-600 capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">💡 Tip:</span> Tap on any pin to see details about that location!
        </p>
      </div>
    </div>
  );
};

export default Map;
