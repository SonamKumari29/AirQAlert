"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import Navbar from '@/components/navbar';
import CitySearch from '@/components/city-search';
import AQICard from '@/components/aqi-card';
import PollutantsBreakdown from '@/components/pollutants-breakdown';
import LoadingSpinner from '@/components/loading-spinner';
import { getAQIByCoords, getWeatherData, type AQIData, type WeatherData, type CityData } from '@/lib/api';
import { toast } from 'sonner';

export default function SearchPage() {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

  const handleCitySelect = async (city: CityData) => {
    setSelectedCity(city);
    setLoading(true);
    
    try {
      const [aqi, weather] = await Promise.all([
        getAQIByCoords(city.lat, city.lon),
        getWeatherData(city.lat, city.lon)
      ]);
      
      setAqiData(aqi);
      setWeatherData(weather);
      toast.success(`Air quality data loaded for ${city.name}!`);
    } catch (error) {
      toast.error('Failed to fetch air quality data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!aqiData || !weatherData) return;
    
    const text = `Air Quality in ${weatherData.name}: AQI ${aqiData.list[0].main.aqi} - Check yours at AirQAlert!`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AirQAlert - Air Quality Report',
          text: text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success('Air quality info copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <SearchIcon className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Search Cities
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search for any city worldwide to check its air quality index and pollution levels.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <CitySearch onCitySelect={handleCitySelect} />
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Results */}
        {aqiData && weatherData && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* AQI Card */}
            <div className="flex justify-center">
              <AQICard
                aqi={aqiData.list[0].main.aqi}
                location={`${weatherData.name}, ${weatherData.sys.country}`}
                timestamp={aqiData.list[0].dt}
                temperature={weatherData.main.temp}
                onShare={handleShare}
              />
            </div>

            {/* Pollutants Breakdown */}
            <div className="max-w-2xl mx-auto">
              <PollutantsBreakdown components={aqiData.list[0].components} />
            </div>
          </motion.div>
        )}

        {/* No results state */}
        {!aqiData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Search for a city
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter a city name above to check its air quality index and detailed pollution data.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}