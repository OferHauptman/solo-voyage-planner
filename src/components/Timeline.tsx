
import React from 'react';
import { format, parseISO } from 'date-fns';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';
import { Music, Coffee, Wine, Gamepad2, ShoppingBag, Camera, Train, Hotel, Utensils, Beer } from 'lucide-react';

const categoryColors = {
  concert: 'bg-palette-pink text-palette-pink-dark',
  cafe: 'bg-palette-orange text-palette-orange-dark',
  bar: 'bg-palette-purple text-palette-purple-dark',
  gaming: 'bg-palette-orange text-palette-orange-dark',
  shopping: 'bg-palette-pink text-palette-pink-dark',
  sightseeing: 'bg-palette-purple text-palette-purple-dark',
  transport: 'bg-palette-orange text-palette-orange-dark',
  accommodation: 'bg-palette-purple text-palette-purple-dark',
  restaurant: 'bg-palette-pink text-palette-pink-dark',
  pub: 'bg-palette-purple text-palette-purple-dark'
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

const ActivityCard: React.FC<{ activity: Activity; isLast: boolean }> = ({ activity, isLast }) => {
  const IconComponent = categoryIcons[activity.category];
  
  return (
    <div className="flex items-start space-x-4 pb-6">
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-primary mt-4" />
        {!isLast && <div className="w-0.5 h-8 bg-gradient-to-b from-border to-transparent mt-2" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="p-5 rounded-2xl shadow-sm border border-[#ececec]" style={{ backgroundColor: '#ffffff' }}>
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
              "text-xs px-2.5 py-1 rounded-full font-medium ml-3 flex-shrink-0 flex items-center space-x-1",
              categoryColors[activity.category]
            )}>
              <IconComponent size={12} />
              <span>{activity.category}</span>
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
      {tripData.days.map((day, dayIndex) => (
        <div key={day.date} className="mb-10">
          <div className="sticky top-4 glass-effect py-4 mb-6 rounded-2xl px-4 shadow-sm border border-[#ececec] z-30" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
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
