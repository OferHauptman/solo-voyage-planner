
export interface Activity {
  id: string;
  name: string;
  category: 'concert' | 'cafe' | 'bar' | 'gaming' | 'shopping' | 'sightseeing' | 'transport' | 'accommodation' | 'restaurant' | 'pub';
  location: string;
  address?: string;
  time?: string;
  date?: string;
  description?: string;
  notes?: string;
  coordinates?: [number, number];
  price?: string;
  website?: string;
}

export interface DayPlan {
  date: string;
  location: string;
  activities: Activity[];
}

export interface TripData {
  title: string;
  dates: string;
  locations: string[];
  days: DayPlan[];
  accommodations: Activity[];
  transport: Activity[];
}

export const tripData: TripData = {
  title: "London & Antwerp Solo Trip",
  dates: "June 5-11, 2025",
  locations: ["London, UK", "Antwerp, Belgium"],
  days: [
    {
      date: "2025-06-05",
      location: "London",
      activities: [
        {
          id: "1",
          name: "Arrival in London",
          category: "transport",
          location: "London",
          time: "TBD",
          description: "Flight from Israel to London"
        },
        {
          id: "2",
          name: "Check-in Airbnb Olympia/Hammersmith",
          category: "accommodation",
          location: "London",
          address: "Olympia / Hammersmith area",
          description: "Quiet urban area with local cafés and good transport access",
          coordinates: [-0.2067, 51.4994]
        },
        {
          id: "3",
          name: "Explore Local Area",
          category: "sightseeing",
          location: "London",
          time: "Evening",
          description: "Get familiar with the neighborhood, find local cafés and bars"
        }
      ]
    },
    {
      date: "2025-06-06",
      location: "London",
      activities: [
        {
          id: "4",
          name: "Local Café Hunt",
          category: "cafe",
          location: "London",
          time: "Morning",
          description: "Find cozy, sketch-friendly cafés away from tourist areas"
        },
        {
          id: "5",
          name: "Retro Gaming Store Visit",
          category: "gaming",
          location: "London",
          time: "Afternoon",
          description: "Explore retro gaming stores and pixel art shops"
        },
        {
          id: "6",
          name: "Quiet Local Bar",
          category: "bar",
          location: "London",
          time: "Evening",
          description: "Find a quiet bar where it's easy to meet locals"
        }
      ]
    },
    {
      date: "2025-06-07",
      location: "London",
      activities: [
        {
          id: "7",
          name: "Clothing Shopping",
          category: "shopping",
          location: "London",
          time: "Morning",
          description: "Explore local clothing shops, avoid touristy shopping areas"
        },
        {
          id: "8",
          name: "Café Sketching Session",
          category: "cafe",
          location: "London",
          time: "Afternoon",
          description: "Find a cozy café perfect for sketching"
        },
        {
          id: "9",
          name: "Optional Jazz Show",
          category: "concert",
          location: "London",
          time: "Evening (Flexible)",
          description: "Cozy and atmospheric jazz venue - optional attendance",
          notes: "Flexible timing, preferably intimate venue"
        }
      ]
    },
    {
      date: "2025-06-08",
      location: "London",
      activities: [
        {
          id: "10",
          name: "Pre-Concert Preparation",
          category: "sightseeing",
          location: "London",
          time: "Afternoon",
          description: "Relax and prepare for the evening concert"
        },
        {
          id: "11",
          name: "YOASOBI Concert",
          category: "concert",
          location: "London",
          address: "Wembley Stadium",
          time: "Evening",
          description: "Main event - YOASOBI live performance",
          coordinates: [-0.2795, 51.5560]
        }
      ]
    },
    {
      date: "2025-06-09",
      location: "London to Antwerp",
      activities: [
        {
          id: "12",
          name: "Train to Antwerp",
          category: "transport",
          location: "London to Antwerp",
          time: "TBD",
          description: "Train journey from London to Antwerp via Brussels",
          notes: "Preferred transport method"
        },
        {
          id: "13",
          name: "Check-in Antwerp Airbnb",
          category: "accommodation",
          location: "Antwerp",
          address: "Near MoMu / Plantin-Moretus Museum",
          description: "Quiet and central location for solo urban experience",
          coordinates: [4.4017, 51.2194]
        },
        {
          id: "14",
          name: "Evening Local Exploration",
          category: "sightseeing",
          location: "Antwerp",
          time: "Evening",
          description: "Get familiar with the area, find nearby local spots"
        }
      ]
    },
    {
      date: "2025-06-10",
      location: "Antwerp",
      activities: [
        {
          id: "15",
          name: "Local Café Visit",
          category: "cafe",
          location: "Antwerp",
          time: "Morning",
          description: "One nice local café for morning coffee"
        },
        {
          id: "16",
          name: "Local Food Experience",
          category: "restaurant",
          location: "Antwerp",
          time: "Lunch",
          description: "Try good local Belgian food"
        },
        {
          id: "17",
          name: "Pre-Concert Rest",
          category: "sightseeing",
          location: "Antwerp",
          time: "Afternoon",
          description: "Relax before the evening concert"
        },
        {
          id: "18",
          name: "Ado Concert",
          category: "concert",
          location: "Antwerp",
          time: "Evening",
          description: "Main event - Ado live performance"
        },
        {
          id: "19",
          name: "Post-Concert Pub",
          category: "pub",
          location: "Antwerp",
          time: "Late Evening",
          description: "Visit a local pub after the concert to unwind"
        }
      ]
    },
    {
      date: "2025-06-11",
      location: "Antwerp to London",
      activities: [
        {
          id: "20",
          name: "Final Local Experience",
          category: "cafe",
          location: "Antwerp",
          time: "Morning",
          description: "Last Belgian café experience before departure"
        },
        {
          id: "21",
          name: "Travel to London",
          category: "transport",
          location: "Antwerp to London",
          time: "Afternoon",
          description: "Return journey to London for evening flight"
        },
        {
          id: "22",
          name: "Flight to Israel",
          category: "transport",
          location: "London",
          time: "Evening",
          description: "Return flight from London to Israel"
        }
      ]
    }
  ],
  accommodations: [
    {
      id: "acc1",
      name: "Airbnb Olympia/Hammersmith",
      category: "accommodation",
      location: "London",
      address: "Olympia / Hammersmith area",
      description: "Quiet urban area with local cafés and bars nearby, excellent transport access",
      coordinates: [-0.2067, 51.4994]
    },
    {
      id: "acc2",
      name: "Airbnb Near MoMu",
      category: "accommodation",
      location: "Antwerp",
      address: "Near MoMu / Plantin-Moretus Museum area",
      description: "Quiet and central location perfect for solo urban experience",
      coordinates: [4.4017, 51.2194]
    }
  ],
  transport: [
    {
      id: "tr1",
      name: "Flight Israel to London",
      category: "transport",
      location: "Israel to London",
      description: "Outbound international flight",
      price: "TBD"
    },
    {
      id: "tr2",
      name: "Train London to Antwerp",
      category: "transport",
      location: "London to Antwerp",
      description: "Preferred train route via Brussels - Eurostar + local connection",
      price: "TBD"
    },
    {
      id: "tr3",
      name: "Flight London to Israel",
      category: "transport",
      location: "London to Israel",
      description: "Return international flight",
      price: "TBD"
    }
  ]
};
