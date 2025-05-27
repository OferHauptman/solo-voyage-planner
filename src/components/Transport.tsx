
import React from 'react';
import { tripData } from '@/data/tripData';
import { format, parseISO } from 'date-fns';

const TransportCard: React.FC<{ title: string; items: any[] }> = ({ title, items }) => {
  return (
    <div className="bg-white dark:bg-card rounded-lg shadow-lg hover:shadow-xl border border-gray-200 dark:border-border/50 overflow-hidden mb-6 transition-all duration-300">
      <div className="bg-travel-navy text-white px-4 py-3">
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="p-4 space-y-4">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-muted/50 rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-travel-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm">🚂</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-foreground">{item.name}</h3>
              {item.description && (
                <p className="text-gray-600 dark:text-muted-foreground text-sm mt-1">{item.description}</p>
              )}
              {item.address && (
                <p className="text-gray-500 dark:text-muted-foreground text-sm mt-1">{item.address}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                {item.time && (
                  <span className="text-travel-blue font-medium text-sm">{item.time}</span>
                )}
                {item.price && (
                  <span className="bg-travel-orange text-white text-xs px-2 py-1 rounded-full">
                    {item.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Transport: React.FC = () => {
  // Extract transport activities from trip days
  const transportActivities = tripData.days.reduce((acc, day) => {
    const dayTransport = day.activities.filter(activity => activity.category === 'transport');
    return acc.concat(dayTransport.map(activity => ({
      ...activity,
      date: day.date
    })));
  }, [] as any[]);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-travel-navy dark:text-foreground mb-2">Travel & Transport</h1>
        <p className="text-gray-600 dark:text-muted-foreground">Your journey connections and accommodations</p>
      </div>

      {/* Transport Schedule */}
      <TransportCard title="🚂 Transport Schedule" items={transportActivities} />

      {/* Accommodations */}
      <TransportCard title="🏨 Accommodations" items={tripData.accommodations} />

      {/* General Transport Info */}
      <TransportCard title="🎫 General Transport" items={tripData.transport} />

      {/* Travel Tips */}
      <div className="bg-gradient-to-r from-travel-blue to-travel-navy rounded-lg p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-4">✈️ Travel Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-yellow-300">💡</span>
            <p className="text-sm">Book Eurostar seats in advance for better prices and guaranteed spots</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-yellow-300">🎫</span>
            <p className="text-sm">Consider getting an Oyster Card in London for easy tube and bus travel</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-yellow-300">🚂</span>
            <p className="text-sm">Belgian trains are punctual - arrive at the station 10 minutes early</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-yellow-300">📱</span>
            <p className="text-sm">Download offline maps before traveling for backup navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;
