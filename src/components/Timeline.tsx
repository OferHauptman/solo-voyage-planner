import React from 'react';
import { format, parseISO } from 'date-fns';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';

const categoryColors = {
  concert: 'bg-palette-pink text-palette-pink-dark border-palette-pink-dark/20',
  cafe: 'bg-palette-yellow text-palette-yellow-dark border-palette-yellow-dark/20',
  bar: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20',
  gaming: 'bg-palette-yellow text-palette-yellow-dark border-palette-yellow-dark/20',
  shopping: 'bg-palette-pink text-palette-pink-dark border-palette-pink-dark/20',
  sightseeing: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20',
  transport: 'bg-palette-yellow text-palette-yellow-dark border-palette-yellow-dark/20',
  accommodation: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20',
  restaurant: 'bg-palette-pink text-palette-pink-dark border-palette-pink-dark/20',
  pub: 'bg-palette-orange text-palette-orange-dark border-palette-orange-dark/20'
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
    <div className="flex items-start space-x-4 pb-6">
      <div className="flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-110",
          categoryColors[activity.category]
        )}>
          {categoryIcons[activity.category]}
        </div>
        {!isLast && <div className="w-0.5 h-8 bg-gradient-to-b from-border to-transparent mt-2" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="p-5 rounded-2xl shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 border border-[#ececec]" style={{ backgroundColor: '#ffffff' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1" style={{ color: '#252525' }}>{activity.name}</h3>
              {activity.time && (
                <p className="font-medium text-sm mb-2 flex items-center" style={{ color: '#945BD9' }}>
                  <span className="mr-1">🕐</span>
                  {activity.time}
                </p>
              )}
              {activity.address && (
                <p className="text-sm mb-2 flex items-center" style={{ color: '#252525', opacity: 0.7 }}>
                  <span className="mr-1">📍</span>
                  {activity.address}
                </p>
              )}
              {activity.description && (
                <p className="text-sm mb-3 leading-relaxed" style={{ color: '#252525', opacity: 0.8 }}>{activity.description}</p>
              )}
              {activity.notes && (
                <p className="text-xs mb-3 italic bg-muted/50 p-2 rounded-lg" style={{ color: '#252525', opacity: 0.7 }}>
                  💭 {activity.notes}
                </p>
              )}
              {activity.price && (
                <span className="inline-block text-xs px-3 py-1.5 rounded-full font-medium shadow-sm" style={{ backgroundColor: '#945BD9', color: '#ffffff' }}>
                  {activity.price}
                </span>
              )}
            </div>
            <span className={cn(
              "text-xs px-2.5 py-1 rounded-full border font-medium ml-3 flex-shrink-0",
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-3" style={{ color: '#252525' }}>
          {tripData.title}
        </h1>
        <p className="font-medium text-lg" style={{ color: '#945BD9' }}>{tripData.dates}</p>
      </div>

      {tripData.days.map((day, dayIndex) => (
        <div key={day.date} className="mb-10">
          <div className="sticky top-20 glass-effect py-4 mb-6 rounded-2xl px-4 shadow-lg border border-[#ececec]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <h2 className="text-xl font-bold" style={{ color: '#252525' }}>
              {format(parseISO(day.date), 'EEEE, MMMM d')}
            </h2>
            <p className="font-medium flex items-center mt-1" style={{ color: '#945BD9' }}>
              <span className="mr-1">📍</span>
              {day.location}
            </p>
          </div>
          
          <div className="space-y-0">
            {day.activities.map((activity, activityIndex) => (
              <div
                key={activity.id}
                className="animate-slide-up"
                style={{ animationDelay: `${(dayIndex * 200) + (activityIndex * 100)}ms` }}
              >
                <ActivityCard
                  activity={activity}
                  isLast={activityIndex === day.activities.length - 1}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
