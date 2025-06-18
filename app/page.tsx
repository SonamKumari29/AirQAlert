"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, MapPin, Share2 } from 'lucide-react';
import Navbar from '@/components/navbar';
import AQICard from '@/components/aqi-card';
import PollutantsBreakdown from '@/components/pollutants-breakdown';
import ForecastChart from '@/components/forecast-chart';
import LoadingSpinner from '@/components/loading-spinner';
import AirQualityMap from '@/components/air-quality-map';
import HealthRecommendations from '@/components/health-recommendations';
import AirQualityAlerts from '@/components/air-quality-alerts';
import WeatherWidget from '@/components/weather-widget';
import ComparisonWidget from '@/components/comparison-widget';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGeolocation } from '@/hooks/use-geolocation';
import { getAQIByCoords, getAQIForecast, getWeatherData, type AQIData, type WeatherData } from '@/lib/api';
import { toast } from 'sonner';

export default function Home() {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [forecastData, setForecastData] = useState<AQIData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();

  const fetchData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [aqi, forecast, weather] = await Promise.all([
        getAQIByCoords(lat, lon),
        getAQIForecast(lat, lon),
        getWeatherData(lat, lon)
      ]);
      
      setAqiData(aqi);
      setForecastData(forecast);
      setWeatherData(weather);
      toast.success('Air quality data updated successfully!');
    } catch (err: any) {
      let errorMessage = 'Failed to fetch air quality data. Please try again.';
      if (err.response) {
        // API responded with a status code outside 2xx
        switch (err.response.status) {
          case 401:
            errorMessage = 'Invalid API key. Please check your .env.local configuration.';
            break;
          case 403:
            errorMessage = 'Access denied. Please check your API key permissions.';
            break;
          case 404:
            errorMessage = 'Data not found for this location.';
            break;
          case 429:
            errorMessage = 'API rate limit exceeded. Please wait and try again later.';
            break;
          case 500:
            errorMessage = 'Server error from data provider. Please try again later.';
            break;
          default:
            errorMessage = `Error: ${err.response.status} - ${err.response.statusText}`;
        }
      } else if (err.request) {
        // No response received
        errorMessage = 'Network error: Unable to reach the data provider.';
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleRefresh = () => {
    if (latitude && longitude) {
      fetchData(latitude, longitude);
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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-green-400 to-green-600 bg-clip-text text-transparent mb-4 animate-gradient-x">
            Real-time Air Quality
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {aqiData && aqiData.list[0].main.aqi === 1
              ? "It's a great day for a walk! The air is fresh and clean."
              : aqiData && aqiData.list[0].main.aqi === 2
              ? "Air is pretty good today. Enjoy your time outside!"
              : aqiData && aqiData.list[0].main.aqi === 3
              ? "Air is okay, but sensitive people should be careful."
              : aqiData && aqiData.list[0].main.aqi === 4
              ? "Air quality is poor. Try to limit outdoor activities."
              : aqiData && aqiData.list[0].main.aqi === 5
              ? "Air is very polluted. Best to stay indoors today."
              : "Monitor air pollution levels in your area and make informed decisions about your health with comprehensive insights and recommendations."}
          </p>
        </motion.div>

        {/* Error States */}
        {geoError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {geoError}. Please enable location services or search for a city manually.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Loading State */}
        {(geoLoading || loading) && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Main Content */}
        {aqiData && weatherData && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Current Location */}
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">
                {weatherData.name}, {weatherData.sys.country}
              </span>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid lg:grid-cols-3 gap-8 md:grid-cols-1 sm:grid-cols-1">
              {/* Left Column - Primary Data */}
              <div className="lg:col-span-2 space-y-8">
                {/* AQI Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                  className="flex justify-center shadow-lg"
                >
                  <AQICard
                    aqi={aqiData.list[0].main.aqi}
                    location={`${weatherData.name}, ${weatherData.sys.country}`}
                    timestamp={aqiData.list[0].dt}
                    temperature={weatherData.main.temp}
                  />
                </motion.div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 transition-transform duration-150 hover:scale-105 shadow-md"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </Button>
                </div>

                {/* Pollutants and Forecast */}
                <div className="grid md:grid-cols-2 gap-8">
                  <PollutantsBreakdown components={aqiData.list[0].components} />
                  {forecastData && (
                    <ForecastChart 
                      data={forecastData.list.map(item => ({
                        dt: item.dt,
                        aqi: item.main.aqi,
                        components: item.components
                      }))} 
                    />
                  )}
                </div>

                {/* Air Quality Map */}
                <AirQualityMap />
              </div>

              {/* Right Column - Additional Widgets */}
              <div className="space-y-8">
                {/* Weather Widget */}
                <WeatherWidget
                  weather={{
                    temp: weatherData.main.temp,
                    feels_like: weatherData.main.feels_like,
                    humidity: weatherData.main.humidity,
                    description: weatherData.weather[0].description,
                    icon: weatherData.weather[0].icon
                  }}
                  location={`${weatherData.name}, ${weatherData.sys.country}`}
                />

                {/* Health Recommendations */}
                <HealthRecommendations
                  aqi={aqiData.list[0].main.aqi}
                  pollutants={{
                    pm2_5: aqiData.list[0].components.pm2_5,
                    pm10: aqiData.list[0].components.pm10,
                    o3: aqiData.list[0].components.o3,
                    no2: aqiData.list[0].components.no2
                  }}
                />

                {/* Comparison Widget */}
                <ComparisonWidget
                  currentLocation={`${weatherData.name}, ${weatherData.sys.country}`}
                  currentAQI={aqiData.list[0].main.aqi}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* No data state */}
        {!aqiData && !loading && !geoLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Ready to check air quality?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Allow location access or search for a city to get started with comprehensive air quality monitoring.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enable Location Access
            </Button>
          </motion.div>
        )}
      </main>

      {/* Air Quality Alerts */}
      {aqiData && weatherData && (
        <AirQualityAlerts
          currentAQI={aqiData.list[0].main.aqi}
          location={`${weatherData.name}, ${weatherData.sys.country}`}
        />
      )}
    </div>
  );
}