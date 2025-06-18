"use client";

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { searchCities, type CityData } from '@/lib/api';
import { debounce } from 'lodash';

interface CitySearchProps {
  onCitySelect: (city: CityData) => void;
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setCities([]);
        setShowResults(false);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await searchCities(searchQuery);
        setCities(results);
        setShowResults(true);
      } catch (error) {
        console.error('Error searching cities:', error);
        setCities([]);
      }
      setLoading(false);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleCitySelect = (city: CityData) => {
    setQuery(`${city.name}, ${city.country}`);
    setShowResults(false);
    onCitySelect(city);
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
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-0 shadow-lg focus:shadow-xl transition-shadow"
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
            <Card className="backdrop-blur-lg bg-white/95 dark:bg-slate-800/95 border-0 shadow-2xl">
              <CardContent className="p-0">
                {cities.map((city, index) => (
                  <motion.button
                    key={`${city.name}-${city.country}-${city.lat}-${city.lon}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleCitySelect(city)}
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
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}