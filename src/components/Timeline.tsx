import React from 'react';
import { format, parseISO } from 'date-fns';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';

const categoryColors = {
  concert: 'bg-purple-100 text-purple-800 border-purple-200',
  cafe: 'bg-amber-100 text-amber-800 border-amber-200',
  bar: 'bg-red-100 text-red-800 border-red-200',
  gaming: 'bg-green-100 text-green-800 border-green-200',
  shopping: 'bg-blue-100 text-blue-800 border-blue-200',
  sightseeing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  transport: 'bg-gray-100 text-gray-800 border-gray-200',
  accommodation: 'bg-orange-100 text-orange-800 border-orange-200',
  restaurant: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  pub: 'bg-rose-100 text-rose-800 border-rose-200'
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

const ActivityCard: React.FC<{ activity: Activity; isLast: boolean }> = ({ activity, isLast }) => {
  return (
    <div className="flex items-start space-x-3 pb-6">
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-sm border-2",
          categoryColors[activity.category]
        )}>
          {categoryIcons[activity.category]}
        </div>
        {!isLast && <div className="w-0.5 h-6 bg-gray-200 mt-2" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className={cn(
          "p-4 rounded-lg border-l-4 bg-white shadow-sm",
          categoryColors[activity.category].includes('purple') && 'border-l-purple-400',
          categoryColors[activity.category].includes('amber') && 'border-l-amber-400',
          categoryColors[activity.category].includes('red') && 'border-l-red-400',
          categoryColors[activity.category].includes('green') && 'border-l-green-400',
          categoryColors[activity.category].includes('blue') && 'border-l-blue-400',
          categoryColors[activity.category].includes('indigo') && 'border-l-indigo-400',
          categoryColors[activity.category].includes('gray') && 'border-l-gray-400',
          categoryColors[activity.category].includes('orange') && 'border-l-orange-400',
          categoryColors[activity.category].includes('emerald') && 'border-l-emerald-400',
          categoryColors[activity.category].includes('rose') && 'border-l-rose-400'
        )}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{activity.name}</h3>
              {activity.time && (
                <p className="text-travel-blue font-medium text-sm mt-1">{activity.time}</p>
              )}
              {activity.address && (
                <p className="text-gray-600 text-xs mt-1">{activity.address}</p>
              )}
              {activity.description && (
                <p className="text-gray-700 text-sm mt-2">{activity.description}</p>
              )}
              {activity.notes && (
                <p className="text-gray-600 text-xs mt-1 italic">{activity.notes}</p>
              )}
              {activity.price && (
                <span className="inline-block bg-travel-orange text-white text-xs px-2 py-1 rounded-full mt-2">
                  {activity.price}
                </span>
              )}
            </div>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full border font-medium ml-2 flex-shrink-0",
              categoryColors[activity.category]
            )}>
              {activity.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-travel-navy mb-2">{tripData.title}</h1>
        <p className="text-travel-blue font-medium">{tripData.dates}</p>
      </div>

      {tripData.days.map((day, dayIndex) => (
        <div key={day.date} className="mb-8">
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm py-3 mb-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-travel-navy">
              {format(parseISO(day.date), 'EEEE, MMMM d')}
            </h2>
            <p className="text-travel-blue font-medium">{day.location}</p>
          </div>
          
          <div className="space-y-0">
            {day.activities.map((activity, activityIndex) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                isLast={activityIndex === day.activities.length - 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
