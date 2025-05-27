
import React from 'react';
import { format, parseISO } from 'date-fns';
import { tripData, Activity } from '@/data/tripData';
import { cn } from '@/lib/utils';

const categoryColors = {
  concert: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500/30',
  cafe: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-500/30',
  bar: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-500/30',
  gaming: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-500/30',
  shopping: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500/30',
  sightseeing: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-500/30',
  transport: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-500/30',
  accommodation: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-500/30',
  restaurant: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-500/30',
  pub: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-500/30'
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
        <div className="p-5 rounded-2xl border bg-card shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-base mb-1">{activity.name}</h3>
              {activity.time && (
                <p className="text-primary font-medium text-sm mb-2 flex items-center">
                  <span className="mr-1">🕐</span>
                  {activity.time}
                </p>
              )}
              {activity.address && (
                <p className="text-muted-foreground text-sm mb-2 flex items-center">
                  <span className="mr-1">📍</span>
                  {activity.address}
                </p>
              )}
              {activity.description && (
                <p className="text-foreground/80 text-sm mb-3 leading-relaxed">{activity.description}</p>
              )}
              {activity.notes && (
                <p className="text-muted-foreground text-xs mb-3 italic bg-muted/50 p-2 rounded-lg">
                  💭 {activity.notes}
                </p>
              )}
              {activity.price && (
                <span className="inline-block bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
          {tripData.title}
        </h1>
        <p className="text-primary font-medium text-lg">{tripData.dates}</p>
      </div>

      {tripData.days.map((day, dayIndex) => (
        <div key={day.date} className="mb-10">
          <div className="sticky top-20 glass-effect py-4 mb-6 rounded-2xl border border-border/50 px-4 shadow-lg">
            <h2 className="text-xl font-bold text-foreground">
              {format(parseISO(day.date), 'EEEE, MMMM d')}
            </h2>
            <p className="text-primary font-medium flex items-center mt-1">
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
