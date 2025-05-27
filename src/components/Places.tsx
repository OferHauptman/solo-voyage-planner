
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

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const IconComponent = categoryIcons[activity.category];

  return (
    <div className="mb-2">
      <div className="mx-5 p-4 rounded-xl bg-white border border-[#ececec] shadow-sm">
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
          </div>
          <span className={cn(
            "text-xs px-2.5 py-1 rounded-full font-medium ml-3 flex-shrink-0 text-white flex items-center space-x-1",
            categoryColors[activity.category]
          )}>
            <IconComponent size={12} />
            <span>{activity.category}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const Places: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  // Group activities by location
  const activitiesByLocation = tripData.days.reduce((acc, day) => {
    const filteredActivities = day.activities.filter(activity => 
      !['transport'].includes(activity.category) && activity.coordinates
    );
    
    filteredActivities.forEach(activity => {
      const location = activity.location || day.location;
      if (!acc[location]) {
        acc[location] = [];
      }
      acc[location].push(activity);
    });
    
    return acc;
  }, {} as Record<string, Activity[]>);

  return (
    <div className="max-w-2xl mx-auto pb-24">
      {Object.entries(activitiesByLocation).map(([location, activities]) => (
        <div key={location} className="mb-6">
          <div className="sticky top-0 z-30 bg-gradient-to-b from-[#f7f7f7] via-[#f7f7f7] to-transparent">
            <div 
              className="w-screen flex items-center justify-between border-b border-[#ececec]"
              style={{ 
                marginLeft: 'calc(-50vw + 50%)',
                paddingLeft: 'calc(50vw - 50% + 20px)',
                paddingRight: 'calc(50vw - 50% + 20px)',
                paddingTop: '32px',
                paddingBottom: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <div className="text-left">
                <h2 className="text-xl font-bold" style={{ color: '#252525' }}>
                  {location}
                </h2>
                <p className="font-medium flex items-center mt-1" style={{ color: '#945BD9' }}>
                  {activities.length} places to visit
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-0 pt-2">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Places;
