
import React from 'react';
import { tripData } from '@/data/tripData';
import { format, parseISO } from 'date-fns';

const TransportCard: React.FC<{ title: string; items: any[] }> = ({ title, items }) => {
  return (
    <div className="rounded-lg shadow-lg hover:shadow-xl overflow-hidden mb-6 transition-all duration-300 border border-[#ececec]" style={{ backgroundColor: '#ffffff' }}>
      <div className="px-4 py-3" style={{ backgroundColor: '#945BD9' }}>
        <h2 className="font-semibold" style={{ color: '#ffffff' }}>{title}</h2>
      </div>
      <div className="p-4 space-y-4">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex items-start space-x-3 p-3 rounded-lg shadow-sm border border-[#ececec]" style={{ backgroundColor: '#fafafa' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#945BD9' }}>
              <span className="text-sm" style={{ color: '#ffffff' }}>🚂</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold" style={{ color: '#252525' }}>{item.name}</h3>
              {item.description && (
                <p className="text-sm mt-1" style={{ color: '#252525', opacity: 0.7 }}>{item.description}</p>
              )}
              {item.address && (
                <p className="text-sm mt-1" style={{ color: '#252525', opacity: 0.6 }}>{item.address}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                {item.time && (
                  <span className="font-medium text-sm" style={{ color: '#945BD9' }}>{item.time}</span>
                )}
                {item.price && (
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#945BD9', color: '#ffffff' }}>
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
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#252525' }}>Travel & Transport</h1>
        <p style={{ color: '#252525', opacity: 0.7 }}>Your journey connections and accommodations</p>
      </div>

      {/* Transport Schedule */}
      <TransportCard title="🚂 Transport Schedule" items={transportActivities} />

      {/* Accommodations */}
      <TransportCard title="🏨 Accommodations" items={tripData.accommodations} />

      {/* General Transport Info */}
      <TransportCard title="🎫 General Transport" items={tripData.transport} />

      {/* Travel Tips */}
      <div className="rounded-lg p-6 shadow-lg border border-[#ececec]" style={{ background: 'linear-gradient(to right, #945BD9, #7C4DDB)', color: '#ffffff' }}>
        <h3 className="font-semibold text-lg mb-4" style={{ color: '#ffffff' }}>✈️ Travel Tips</h3>
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
