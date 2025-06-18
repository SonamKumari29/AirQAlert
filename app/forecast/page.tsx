"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, AlertCircle } from 'lucide-react';
import Navbar from '@/components/navbar';
import ForecastChart from '@/components/forecast-chart';
import CitySearch from '@/components/city-search';
import LoadingSpinner from '@/components/loading-spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGeolocation } from '@/hooks/use-geolocation';
import { getAQIForecast, getWeatherData, getAQICategory, type AQIData, type WeatherData, type CityData } from '@/lib/api';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function ForecastPage() {
  const [forecastData, setForecastData] = useState<AQIData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const { latitude, longitude, error: geoError, loading: geoLoading } = useGeolocation();

  const fetchForecastData = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const [forecast, weather] = await Promise.all([
        getAQIForecast(lat, lon),
        getWeatherData(lat, lon)
      ]);
      
      setForecastData(forecast);
      setWeatherData(weather);
      setCurrentLocation(`${weather.name}, ${weather.sys.country}`);
      toast.success('Forecast data loaded successfully!');
    } catch (err) {
      const errorMessage = 'Failed to fetch forecast data. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchForecastData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const handleCitySelect = async (city: CityData) => {
    await fetchForecastData(city.lat, city.lon);
  };

  const getAverageAQI = () => {
    if (!forecastData) return 0;
    const sum = forecastData.list.reduce((acc, item) => acc + item.main.aqi, 0);
    return Math.round(sum / forecastData.list.length);
  };

  const getAQITrend = () => {
    if (!forecastData || forecastData.list.length < 2) return 'stable';
    
    const first = forecastData.list[0].main.aqi;
    const last = forecastData.list[forecastData.list.length - 1].main.aqi;
    
    if (last > first) return 'increasing';
    if (last < first) return 'decreasing';
    return 'stable';
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
          <TrendingUp className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Air Quality Forecast
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            View detailed air quality predictions for the next 5 days to plan your outdoor activities.
          </p>
        </motion.div>

        {/* City Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <CitySearch onCitySelect={handleCitySelect} />
        </motion.div>

        {/* Current Location */}
        {currentLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 mb-8"
          >
            <MapPin className="h-4 w-4" />
            <span className="font-medium">{currentLocation}</span>
          </motion.div>
        )}

        {/* Error State */}
        {(geoError || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {geoError || error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Loading State */}
        {(geoLoading || loading) && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Forecast Content */}
        {forecastData && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Forecast Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Average AQI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {getAverageAQI()}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`mt-2 ${getAQICategory(getAverageAQI()).color} ${getAQICategory(getAverageAQI()).bgColor} border-0`}
                    >
                      {getAQICategory(getAverageAQI()).level}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Forecast Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      5 Days
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {format(new Date(), 'MMM dd')} - {format(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), 'MMM dd')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                      {getAQITrend()}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {getAQITrend() === 'increasing' && '📈 Air quality declining'}
                      {getAQITrend() === 'decreasing' && '📉 Air quality improving'}
                      {getAQITrend() === 'stable' && '➡️ Air quality stable'}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Forecast Chart */}
            <ForecastChart 
              data={forecastData.list.map(item => ({
                dt: item.dt,
                aqi: item.main.aqi,
                components: item.components
              }))} 
            />

            {/* Daily Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Daily Air Quality Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {forecastData.list.slice(0, 6).map((item, index) => {
                      const aqiInfo = getAQICategory(item.main.aqi);
                      return (
                        <motion.div
                          key={item.dt}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`p-4 rounded-lg ${aqiInfo.bgColor} border border-gray-200 dark:border-gray-700`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {format(new Date(item.dt * 1000), 'MMM dd, HH:mm')}
                            </span>
                          </div>
                          <div className={`text-xl font-bold ${aqiInfo.color} mb-1`}>
                            AQI {item.main.aqi}
                          </div>
                          <Badge variant="secondary" className={`${aqiInfo.color} ${aqiInfo.bgColor} border-0 text-xs`}>
                            {aqiInfo.level}
                          </Badge>
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <div>PM2.5: {item.components.pm2_5.toFixed(1)} μg/m³</div>
                            <div>PM10: {item.components.pm10.toFixed(1)} μg/m³</div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* No data state */}
        {!forecastData && !loading && !geoLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Ready to view forecast?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Allow location access or search for a city to see detailed air quality predictions.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}