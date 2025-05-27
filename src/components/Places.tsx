
import React, { useState, useRef, useEffect } from 'react';
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

const PlaceCard: React.FC<{ activity: Activity; isSelected: boolean }> = ({ activity, isSelected }) => {
  const IconComponent = categoryIcons[activity.category];

  return (
    <div 
      id={`place-${activity.id}`}
      className={cn(
        "rounded-2xl shadow-sm overflow-hidden backdrop-blur-sm border transition-all duration-300",
        isSelected ? "border-primary shadow-lg" : "border-[#ececec]"
      )} 
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold flex-1" style={{ color: '#252525' }}>
            {activity.name}
          </h3>
          <span className={cn(
            "text-xs px-2.5 py-1 rounded-full font-medium ml-3 flex items-center space-x-1",
            categoryColors[activity.category]
          )}>
            <IconComponent size={12} />
            <span>{activity.category}</span>
          </span>
        </div>
        
        {activity.address && (
          <p className="text-sm mb-3 flex items-center" style={{ color: '#252525', opacity: 0.7 }}>
            <span className="mr-2">📍</span>
            {activity.address}
          </p>
        )}
        
        {activity.description && (
          <p className="text-sm mb-3 leading-relaxed" style={{ color: '#252525', opacity: 0.8 }}>
            {activity.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          {activity.time && (
            <span className="font-medium text-sm flex items-center" style={{ color: '#945BD9' }}>
              <span className="mr-1">🕐</span>
              {activity.time}
            </span>
          )}
          {activity.price && (
            <span className="text-xs px-3 py-1.5 rounded-full font-medium shadow-sm" style={{ backgroundColor: '#945BD9', color: '#ffffff' }}>
              {activity.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Places: React.FC = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Flatten all activities from all days
  const allActivities = tripData.days.reduce((acc, day) => {
    return acc.concat(day.activities.filter(activity => 
      !['transport'].includes(activity.category) && activity.coordinates
    ));
  }, [] as Activity[]);

  useEffect(() => {
    // Initialize Google Maps
    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 51.5074, lng: -0.1278 }, // London center
        zoom: 6,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#f5f5f5"}]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#666666"}]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#e6e6e6"}]
          },
          {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [{"color": "#ffffff"}]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add markers for each activity
      allActivities.forEach(activity => {
        if (activity.coordinates) {
          const IconComponent = categoryIcons[activity.category];
          const marker = new google.maps.Marker({
            position: { lat: activity.coordinates[1], lng: activity.coordinates[0] },
            map: map,
            title: activity.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: activity.category === 'concert' ? '#C95792' : 
                         activity.category === 'cafe' ? '#F8B55F' : '#7C4585',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          });

          marker.addListener('click', () => {
            setSelectedPlaceId(activity.id);
            // Scroll to the corresponding card
            const element = document.getElementById(`place-${activity.id}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });

          markersRef.current.push(marker);
        }
      });
    };

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [allActivities]);

  return (
    <div className="max-w-2xl mx-auto p-4 pb-24">
      {/* Map */}
      <div className="mb-8">
        <div ref={mapRef} className="h-80 w-full rounded-lg border border-[#ececec] bg-gray-200" />
        <p className="text-xs text-center mt-2" style={{ color: '#252525', opacity: 0.6 }}>
          Click on markers to see place details below
        </p>
      </div>

      {/* Places List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#252525' }}>
          Places to Visit
        </h2>
        {allActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PlaceCard 
              activity={activity} 
              isSelected={selectedPlaceId === activity.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
