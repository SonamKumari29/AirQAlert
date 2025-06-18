"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAQICategory } from '@/lib/api';

interface ComparisonData {
  name: string;
  aqi: number;
  change: number; // percentage change from yesterday
}

interface ComparisonWidgetProps {
  currentLocation: string;
  currentAQI: number;
}

export default function ComparisonWidget({ currentLocation, currentAQI }: ComparisonWidgetProps) {
  const [selectedComparison, setSelectedComparison] = useState<'cities' | 'historical'>('cities');

  // Mock comparison data - in production, this would come from API
  const cityComparisons: ComparisonData[] = [
    { name: 'New York', aqi: 2, change: -5 },
    { name: 'London', aqi: 3, change: 12 },
    { name: 'Tokyo', aqi: 2, change: -8 },
    { name: 'Delhi', aqi: 4, change: 15 },
    { name: 'Sydney', aqi: 1, change: -2 },
  ];

  const historicalData: ComparisonData[] = [
    { name: 'Yesterday', aqi: currentAQI - 1, change: -10 },
    { name: 'Last Week', aqi: currentAQI + 1, change: 15 },
    { name: 'Last Month', aqi: currentAQI, change: 0 },
    { name: 'Last Year', aqi: currentAQI - 2, change: -25 },
  ];

  const data = selectedComparison === 'cities' ? cityComparisons : historicalData;

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return 'text-red-500';
    if (change < 0) return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Air Quality Comparison</span>
            </CardTitle>
            <div className="flex space-x-1">
              <Button
                variant={selectedComparison === 'cities' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedComparison('cities')}
                className="text-xs"
              >
                Cities
              </Button>
              <Button
                variant={selectedComparison === 'historical' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedComparison('historical')}
                className="text-xs"
              >
                Historical
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Current Location Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-800 dark:text-blue-200">
                  {currentLocation} (Current)
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Your location
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {currentAQI}
                </div>
                <Badge variant="secondary" className={`${getAQICategory(currentAQI).color} ${getAQICategory(currentAQI).bgColor} border-0 text-xs`}>
                  {getAQICategory(currentAQI).level}
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Comparison List */}
          <div className="space-y-2">
            {data.map((item, index) => {
              const aqiInfo = getAQICategory(item.aqi);
              const isCurrentBetter = currentAQI < item.aqi;
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${aqiInfo.bgColor}`}></div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                        {item.name}
                      </p>
                      {selectedComparison === 'cities' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {isCurrentBetter ? 'Higher AQI' : 'Lower AQI'}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="font-semibold text-gray-800 dark:text-gray-200">
                        {item.aqi}
                      </div>
                      <div className={`text-xs flex items-center space-x-1 ${getTrendColor(item.change)}`}>
                        {getTrendIcon(item.change)}
                        <span>{Math.abs(item.change)}%</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`${aqiInfo.color} ${aqiInfo.bgColor} border-0 text-xs`}>
                      {aqiInfo.level}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedComparison === 'cities' ? (
                <>
                  Your location ranks{' '}
                  <span className="font-semibold">
                    {cityComparisons.filter(city => city.aqi > currentAQI).length + 1}
                  </span>{' '}
                  out of {cityComparisons.length + 1} cities for air quality.
                </>
              ) : (
                <>
                  Air quality has{' '}
                  <span className={`font-semibold ${currentAQI < historicalData[0].aqi ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {currentAQI < historicalData[0].aqi ? 'improved' : 'worsened'}
                  </span>{' '}
                  compared to yesterday.
                </>
              )}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}