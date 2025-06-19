"use client";

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface CityData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface CitySearchProps {
  onCitySelect: (city: CityData) => void;
}

// Mock search function for demo - replace with your actual API call
const searchCities = async (query: string): Promise<CityData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data for demonstration
  const mockCities: CityData[] = [
    { name: "New Delhi", lat: 28.6139, lon: 77.2090, country: "IN", state: "Delhi" },
    { name: "New York", lat: 40.7128, lon: -74.0060, country: "US", state: "New York" },
    { name: "New Orleans", lat: 29.9511, lon: -90.0715, country: "US", state: "Louisiana" },
    { name: "Newcastle", lat: 54.9783, lon: -1.6178, country: "GB", state: "England" },
    { name: "Newport", lat: 51.5877, lon: -2.9984, country: "GB", state: "Wales" }
  ];
  
  return mockCities.filter(city => 
    city.name.toLowerCase().includes(query.toLowerCase())
  );
};

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Custom debounce implementation
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const performSearch = async (searchQuery: string) => {
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery.length < 2) {
      setCities([]);
      setShowResults(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log('Searching for:', trimmedQuery); // Debug log
    
    try {
      const results = await searchCities(trimmedQuery);
      console.log('Search results:', results); // Debug log
      setCities(results);
      setShowResults(results.length > 0);
    } catch (error) {
      console.error('Error searching cities:', error);
      setCities([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes with debouncing
  const handleInputChange = (value: string) => {
    setQuery(value);
    
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Set new timer
    const newTimer = setTimeout(() => {
      performSearch(value);
    }, 300);
    
    setDebounceTimer(newTimer);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const handleCitySelect = (city: CityData) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowResults(false);
    setCities([]);
    onCitySelect(city);
  };

  const handleInputFocus = () => {
    if (cities.length > 0 && query.trim().length >= 2) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="w-full pl-10 pr-10 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-0 shadow-lg focus:shadow-xl transition-shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        )}
      </motion.div>

      <AnimatePresence>
        {showResults && cities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2"
          >
            <div className="backdrop-blur-lg bg-white/95 dark:bg-slate-800/95 border-0 shadow-2xl rounded-lg overflow-hidden">
              <div className="p-0">
                {cities.map((city, index) => (
                  <motion.button
                    key={`${city.name}-${city.country}-${city.lat}-${city.lon}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleCitySelect(city)}
                    onMouseDown={(e) => e.preventDefault()} // Prevent blur on click
                    className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {city.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {city.state ? `${city.state}, ` : ''}{city.country}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
