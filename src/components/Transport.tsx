
import React from 'react';
import { tripData } from '@/data/tripData';
import { Train, Plane, Bus } from 'lucide-react';

const TransportCard: React.FC<{ title: string; items: any[]; icon?: React.ComponentType<{ size?: number }> }> = ({ title, items, icon: IconComponent }) => {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden mb-6 border border-[#ececec]" style={{ backgroundColor: '#ffffff' }}>
      <div className="px-4 py-3 flex items-center space-x-2" style={{ backgroundColor: '#945BD9' }}>
        {IconComponent && <IconComponent size={16} />}
        <h2 className="font-semibold" style={{ color: '#ffffff' }}>{title}</h2>
      </div>
      <div className="p-4 space-y-4">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex items-start space-x-3 p-3 rounded-lg shadow-sm border border-[#ececec]" style={{ backgroundColor: '#fafafa' }}>
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
        <p style={{ color: '#252525', opacity: 0.7 }}>Your complete journey itinerary</p>
      </div>

      {/* Flights */}
      <TransportCard 
        title="✈️ Flights" 
        items={tripData.transport.filter(item => item.name.includes('Flight'))}
        icon={Plane}
      />

      {/* Trains & Buses */}
      <TransportCard 
        title="🚂 Trains & Buses" 
        items={[
          ...tripData.transport.filter(item => item.name.includes('Train')),
          ...transportActivities
        ]}
        icon={Train}
      />

      {/* Accommodations */}
      <TransportCard 
        title="🏨 Accommodations" 
        items={tripData.accommodations}
        icon={Bus}
      />
    </div>
  );
};

export default Transport;
