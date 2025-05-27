import React from 'react';
import { tripData } from '@/data/tripData';
import { Plane, Train, Hotel } from 'lucide-react';

interface TransportItem {
  id?: string;
  name: string;
  description?: string;
  address?: string;
  time?: string;
  price?: string;
  date?: string;
}

const TransportCard: React.FC<{ title: string; items: TransportItem[]; icon?: React.ComponentType<any> }> = ({ title, items, icon: IconComponent }) => {
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
                <p className="text-sm mt-1 flex items-center" style={{ color: '#252525', opacity: 0.6 }}>
                  {item.address}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  {item.date && (
                    <span className="font-medium text-sm" style={{ color: '#945BD9' }}>
                      📅 {item.date}
                    </span>
                  )}
                  {item.time && (
                    <span className="font-medium text-sm" style={{ color: '#945BD9' }}>
                      🕐 {item.time}
                    </span>
                  )}
                </div>
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

  const enhancedTransport = tripData.transport.map(item => ({
    ...item,
    date: item.name.includes('Israel to London') ? '2025-06-05' : 
          item.name.includes('London to Antwerp') ? '2025-06-09' :
          item.name.includes('London to Israel') ? '2025-06-11' : undefined,
    time: item.name.includes('Israel to London') ? 'Morning' : 
          item.name.includes('London to Antwerp') ? 'Mid-day' :
          item.name.includes('London to Israel') ? 'Evening' : undefined,
    address: item.name.includes('Israel to London') ? 'Ben Gurion Airport → Heathrow Airport' : 
             item.name.includes('London to Antwerp') ? 'London St Pancras → Antwerp Central' :
             item.name.includes('London to Israel') ? 'Heathrow Airport → Ben Gurion Airport' : undefined
  }));

  const enhancedTransportActivities = transportActivities.map(activity => ({
    ...activity,
    time: activity.time || 'Schedule TBD',
    address: activity.name.includes('Arrival') ? 'Heathrow Airport → Olympia/Hammersmith' :
             activity.name.includes('Train to Antwerp') ? 'London St Pancras → Antwerp Central via Brussels' :
             activity.name.includes('Travel to London') ? 'Antwerp Central → London St Pancras' :
             activity.name.includes('Flight to Israel') ? 'Heathrow Airport → Ben Gurion Airport' : activity.address
  }));

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#252525' }}>Travel & Transport</h1>
        <p style={{ color: '#252525', opacity: 0.7 }}>Your complete journey itinerary</p>
      </div>

      {/* Flights */}
      <TransportCard 
        title="✈️ Flights" 
        items={enhancedTransport.filter(item => item.name.includes('Flight'))}
        icon={Plane}
      />

      {/* Trains & Local Transport */}
      <TransportCard 
        title="🚂 Trains & Local Transport" 
        items={[
          ...enhancedTransport.filter(item => item.name.includes('Train')),
          ...enhancedTransportActivities
        ]}
        icon={Train}
      />

      {/* Accommodations */}
      <TransportCard 
        title="🏨 Accommodations" 
        items={tripData.accommodations.map(acc => ({
          ...acc,
          date: acc.location === 'London' ? 'June 5-9, 2025' : 'June 9-11, 2025'
        }))}
        icon={Hotel}
      />
    </div>
  );
};

export default Transport;
