"use client";

import { motion } from 'framer-motion';
import { MapPin, Clock, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAQICategory } from '@/lib/api';
import { format } from 'date-fns';

interface AQICardProps {
  aqi: number;
  location: string;
  timestamp: number;
  temperature?: number;
  onShare?: () => void;
}

export default function AQICard({ aqi, location, timestamp, temperature, onShare }: AQICardProps) {
  const aqiInfo = getAQICategory(aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="relative overflow-hidden backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-2xl">
        <div className={`absolute inset-0 opacity-10 ${aqiInfo.bgColor}`} />
        
        <CardContent className="relative p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {location}
              </span>
            </div>
            {onShare && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onShare}
                className="h-8 w-8"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* AQI Display */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="relative inline-block"
            >
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${aqiInfo.bgColor} border-4 border-white dark:border-slate-700 shadow-lg`}>
                <span className={`text-3xl font-bold ${aqiInfo.color}`}>
                  {aqi}
                </span>
              </div>
              <motion.div
                className={`absolute inset-0 rounded-full ${aqiInfo.bgColor}`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
            
            <Badge
              variant="secondary"
              className={`mt-3 px-3 py-1 ${aqiInfo.color} ${aqiInfo.bgColor} border-0`}
            >
              {aqiInfo.level}
            </Badge>
          </div>

          {/* Temperature */}
          {temperature && (
            <div className="text-center mb-4">
              <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {Math.round(temperature)}°C
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
            {aqiInfo.description}
          </p>

          {/* Health Tip */}
          <div className={`p-3 rounded-lg ${aqiInfo.bgColor} mb-4`}>
            <p className={`text-sm font-medium ${aqiInfo.color}`}>
              💡 {aqiInfo.healthTip}
            </p>
          </div>

          {/* Last Updated */}
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Updated {format(new Date(timestamp * 1000), 'HH:mm')}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}