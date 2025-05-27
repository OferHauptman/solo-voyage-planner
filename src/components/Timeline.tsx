
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const categoryColors = {
  concert: 'bg-palette-pink',
  cafe: 'bg-palette-orange',
  bar: 'bg-palette-purple',
  gaming: 'bg-palette-orange',
  shopping: 'bg-palette-pink',
  sightseeing: 'bg-palette-purple',
  transport: 'bg-palette-orange',
  accommodation: 'bg-palette-purple',
  restaurant: 'bg-palette-pink',
  pub: 'bg-palette-purple'
};

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="mb-1">
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
            "text-xs px-2.5 py-1 rounded-full font-medium ml-3 flex-shrink-0 text-white",
            categoryColors[activity.category]
          )}>
            {activity.category}
          </span>
        </div>
      </div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});

  const toggleDay = (date: string) => {
    setOpenDays(prev => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <div className="max-w-2xl mx-auto pb-24">
      {tripData.days.map((day, dayIndex) => (
        <div key={day.date} className="mb-6">
          <Collapsible open={openDays[day.date] ?? true}>
            <div className="sticky top-0 z-30 bg-gradient-to-b from-[#f7f7f7] via-[#f7f7f7] to-transparent">
              <CollapsibleTrigger 
                onClick={() => toggleDay(day.date)}
                className="w-screen bg-white/95 backdrop-blur-sm flex items-center justify-between hover:bg-white/100 transition-colors border-b border-[#ececec]"
                style={{ 
                  marginLeft: 'calc(-50vw + 50%)',
                  paddingLeft: 'calc(50vw - 50% + 20px)',
                  paddingRight: 'calc(50vw - 50% + 20px)',
                  paddingTop: '32px',
                  paddingBottom: '16px'
                }}
              >
                <div className="text-left">
                  <h2 className="text-xl font-bold" style={{ color: '#252525' }}>
                    {format(parseISO(day.date), 'EEEE, MMMM d')}
                  </h2>
                  <p className="font-medium flex items-center mt-1" style={{ color: '#945BD9' }}>
                    {day.location}
                  </p>
                </div>
                {openDays[day.date] === false ? (
                  <ChevronDown className="h-5 w-5" style={{ color: '#252525' }} />
                ) : (
                  <ChevronUp className="h-5 w-5" style={{ color: '#252525' }} />
                )}
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent>
              <div className="space-y-0 pt-2">
                {day.activities.map((activity, activityIndex) => (
                  <div key={activity.id}>
                    <ActivityCard activity={activity} />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
