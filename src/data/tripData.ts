
export interface Activity {
  id: string;
  name: string;
  category: 'concert' | 'cafe' | 'bar' | 'gaming' | 'shopping' | 'sightseeing' | 'transport' | 'accommodation';
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
  title: "Solo Journey: London & Belgium Adventure",
  dates: "March 15-25, 2024",
  locations: ["London, UK", "Antwerp, Belgium"],
  days: [
    {
      date: "2024-03-15",
      location: "London",
      activities: [
        {
          id: "1",
          name: "Arrival at Heathrow",
          category: "transport",
          location: "London Heathrow Airport",
          time: "14:30",
          description: "Flight arrival - collect luggage and head to accommodation"
        },
        {
          id: "2",
          name: "Check-in at The Z Hotel Piccadilly",
          category: "accommodation",
          location: "London",
          address: "17 Leicester Square, London WC2H 7LE",
          time: "16:00",
          coordinates: [-0.1302, 51.5085]
        },
        {
          id: "3",
          name: "Explore Covent Garden",
          category: "sightseeing",
          location: "London",
          address: "Covent Garden, London WC2E",
          time: "18:00",
          description: "Evening stroll and dinner",
          coordinates: [-0.1225, 51.5120]
        }
      ]
    },
    {
      date: "2024-03-16",
      location: "London",
      activities: [
        {
          id: "4",
          name: "Monmouth Coffee",
          category: "cafe",
          location: "London",
          address: "27 Monmouth St, London WC2H 9EU",
          time: "09:00",
          description: "Perfect morning coffee to start the day",
          coordinates: [-0.1263, 51.5134]
        },
        {
          id: "5",
          name: "British Museum",
          category: "sightseeing",
          location: "London",
          address: "Great Russell St, London WC1B 3DG",
          time: "10:30",
          description: "Explore ancient artifacts and cultures",
          coordinates: [-0.1267, 51.5194]
        },
        {
          id: "6",
          name: "Retro Game Base",
          category: "gaming",
          location: "London",
          address: "14 Goodge St, London W1T 2QJ",
          time: "15:00",
          description: "Amazing collection of retro gaming gear",
          coordinates: [-0.1348, 51.5211]
        },
        {
          id: "7",
          name: "The Piano Works West End",
          category: "concert",
          location: "London",
          address: "113-117 Farringdon Rd, London EC1R 3BX",
          time: "20:00",
          description: "Interactive piano bar with live music",
          coordinates: [-0.1088, 51.5206]
        }
      ]
    },
    {
      date: "2024-03-17",
      location: "London",
      activities: [
        {
          id: "8",
          name: "Workshop Coffee",
          category: "cafe",
          location: "London",
          address: "1A Marble Arch, London W1H 7EJ",
          time: "08:30",
          description: "Specialty coffee roasters",
          coordinates: [-0.1586, 51.5136]
        },
        {
          id: "9",
          name: "Camden Market",
          category: "shopping",
          location: "London",
          address: "Camden Lock Pl, London NW1 8AF",
          time: "11:00",
          description: "Vintage clothing and unique finds",
          coordinates: [-0.1459, 51.5414]
        },
        {
          id: "10",
          name: "Gaming Heads Store",
          category: "gaming",
          location: "London",
          address: "30 Great Marlborough St, London W1F 7JU",
          time: "14:30",
          description: "Gaming collectibles and memorabilia",
          coordinates: [-0.1394, 51.5155]
        },
        {
          id: "11",
          name: "Quiet Cocktails at Swift",
          category: "bar",
          location: "London",
          address: "12 Old Compton St, London W1D 4TQ",
          time: "19:00",
          description: "Intimate cocktail bar with excellent drinks",
          coordinates: [-0.1305, 51.5133]
        }
      ]
    },
    {
      date: "2024-03-20",
      location: "Antwerp",
      activities: [
        {
          id: "12",
          name: "Eurostar to Brussels",
          category: "transport",
          location: "London to Brussels",
          time: "08:31",
          description: "High-speed train journey to Belgium"
        },
        {
          id: "13",
          name: "Train to Antwerp",
          category: "transport",
          location: "Brussels to Antwerp",
          time: "12:00",
          description: "Local train to Antwerp Central"
        },
        {
          id: "14",
          name: "Hotel Julien",
          category: "accommodation",
          location: "Antwerp",
          address: "Korte Nieuwstraat 24, 2000 Antwerp",
          time: "14:00",
          coordinates: [4.4017, 51.2194]
        },
        {
          id: "15",
          name: "Koffie Academie",
          category: "cafe",
          location: "Antwerp",
          address: "Volkstraat 8, 2000 Antwerp",
          time: "16:00",
          description: "Local coffee roastery with amazing beans",
          coordinates: [4.4042, 51.2211]
        }
      ]
    },
    {
      date: "2024-03-21",
      location: "Antwerp",
      activities: [
        {
          id: "16",
          name: "Caffènation",
          category: "cafe",
          location: "Antwerp",
          address: "Hopland 44, 2000 Antwerp",
          time: "09:00",
          description: "Third-wave coffee pioneers in Belgium",
          coordinates: [4.4025, 51.2178]
        },
        {
          id: "17",
          name: "MAS Museum",
          category: "sightseeing",
          location: "Antwerp",
          address: "Hanzestedenplaats 1, 2000 Antwerp",
          time: "10:30",
          description: "Modern art and city history",
          coordinates: [4.4039, 51.2289]
        },
        {
          id: "18",
          name: "Game Mania",
          category: "gaming",
          location: "Antwerp",
          address: "Groenplaats 31, 2000 Antwerp",
          time: "15:00",
          description: "Large gaming store with retro section",
          coordinates: [4.4008, 51.2192]
        },
        {
          id: "19",
          name: "Jazz Café",
          category: "concert",
          location: "Antwerp",
          address: "Melkmarkt 15, 2000 Antwerp",
          time: "20:30",
          description: "Intimate jazz venue with local musicians",
          coordinates: [4.4028, 51.2201]
        }
      ]
    }
  ],
  accommodations: [
    {
      id: "acc1",
      name: "The Z Hotel Piccadilly",
      category: "accommodation",
      location: "London",
      address: "17 Leicester Square, London WC2H 7LE",
      description: "Modern boutique hotel in central London",
      coordinates: [-0.1302, 51.5085]
    },
    {
      id: "acc2",
      name: "Hotel Julien",
      category: "accommodation",
      location: "Antwerp",
      address: "Korte Nieuwstraat 24, 2000 Antwerp",
      description: "Boutique hotel in historic Antwerp center",
      coordinates: [4.4017, 51.2194]
    }
  ],
  transport: [
    {
      id: "tr1",
      name: "Heathrow Express",
      category: "transport",
      location: "London",
      description: "Airport to Paddington Station",
      price: "£25"
    },
    {
      id: "tr2",
      name: "Eurostar",
      category: "transport",
      location: "London to Brussels",
      description: "High-speed rail connection",
      price: "£150"
    },
    {
      id: "tr3",
      name: "Belgian Railways",
      category: "transport",
      location: "Brussels to Antwerp",
      description: "Local train service",
      price: "€8"
    }
  ]
};
