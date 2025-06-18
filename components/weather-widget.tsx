"use client";

import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WeatherWidgetProps {
  weather: {
    temp: number;
    feels_like: number;
    humidity: number;
    description: string;
    icon: string;
  };
  location: string;
}

export default function WeatherWidget({ weather, location }: WeatherWidgetProps) {
  const getWeatherIcon = (iconCode: string) => {
    const code = iconCode.substring(0, 2);
    switch (code) {
      case '01': return <Sun className="h-8 w-8 text-yellow-500" />;
      case '02':
      case '03':
      case '04': return <Cloud className="h-8 w-8 text-gray-500" />;
      case '09':
      case '10': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return 'text-red-500';
    if (temp >= 20) return 'text-orange-500';
    if (temp >= 10) return 'text-yellow-500';
    return 'text-blue-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
            <Thermometer className="h-5 w-5" />
            <span>Weather Conditions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {getWeatherIcon(weather.icon)}
              </motion.div>
              <div>
                <div className={`text-3xl font-bold ${getTemperatureColor(weather.temp)}`}>
                  {Math.round(weather.temp)}°C
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {weather.description}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              {location}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-1">
                <Thermometer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Feels Like
                </span>
              </div>
              <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                {Math.round(weather.feels_like)}°C
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-3 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-1">
                <Droplets className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Humidity
                </span>
              </div>
              <p className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                {weather.humidity}%
              </p>
            </motion.div>
          </div>

          {/* Air Quality Impact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Wind className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Weather Impact on Air Quality
              </span>
            </div>
            <p className="text-xs text-green-700 dark:text-green-300">
              {weather.temp > 25 
                ? "High temperatures may increase ground-level ozone formation"
                : weather.humidity > 70
                ? "High humidity can trap pollutants closer to ground level"
                : "Current weather conditions are favorable for air quality"
              }
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}