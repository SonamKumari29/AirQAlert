"use client";

import { motion } from 'framer-motion';
import { Heart, Shield, AlertTriangle, Activity, Users, Baby } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getAQICategory } from '@/lib/api';

interface HealthRecommendationsProps {
  aqi: number;
  pollutants: {
    pm2_5: number;
    pm10: number;
    o3: number;
    no2: number;
  };
}

export default function HealthRecommendations({ aqi, pollutants }: HealthRecommendationsProps) {
  const aqiInfo = getAQICategory(aqi);
  
  const getHealthRisk = (aqi: number) => {
    if (aqi <= 1) return { level: 'Low', color: 'text-green-500', icon: Shield };
    if (aqi <= 2) return { level: 'Moderate', color: 'text-yellow-500', icon: Activity };
    if (aqi <= 3) return { level: 'High', color: 'text-orange-500', icon: AlertTriangle };
    return { level: 'Very High', color: 'text-red-500', icon: AlertTriangle };
  };

  const getRecommendations = (aqi: number) => {
    switch (aqi) {
      case 1:
        return [
          { group: 'Everyone', advice: 'Perfect day for outdoor activities!', icon: Activity },
          { group: 'Sensitive Groups', advice: 'No restrictions needed', icon: Heart },
          { group: 'Children', advice: 'Great time to play outside', icon: Baby },
        ];
      case 2:
        return [
          { group: 'Everyone', advice: 'Good day for outdoor activities', icon: Activity },
          { group: 'Sensitive Groups', advice: 'Consider reducing prolonged outdoor activities', icon: Heart },
          { group: 'Children', advice: 'Normal outdoor activities are fine', icon: Baby },
        ];
      case 3:
        return [
          { group: 'Everyone', advice: 'Limit prolonged outdoor activities', icon: Activity },
          { group: 'Sensitive Groups', advice: 'Avoid outdoor activities, wear a mask if necessary', icon: Heart },
          { group: 'Children', advice: 'Reduce outdoor playtime', icon: Baby },
        ];
      case 4:
        return [
          { group: 'Everyone', advice: 'Avoid outdoor activities, wear a mask', icon: Activity },
          { group: 'Sensitive Groups', advice: 'Stay indoors, use air purifiers', icon: Heart },
          { group: 'Children', advice: 'Keep indoors, avoid outdoor activities', icon: Baby },
        ];
      default:
        return [
          { group: 'Everyone', advice: 'Stay indoors, emergency conditions', icon: Activity },
          { group: 'Sensitive Groups', advice: 'Avoid all outdoor activities', icon: Heart },
          { group: 'Children', advice: 'Keep strictly indoors', icon: Baby },
        ];
    }
  };

  const healthRisk = getHealthRisk(aqi);
  const recommendations = getRecommendations(aqi);
  const HealthIcon = healthRisk.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Health Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Health Risk Level */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full bg-white dark:bg-slate-800 shadow-md`}>
                <HealthIcon className={`h-5 w-5 ${healthRisk.color}`} />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">Health Risk Level</p>
                <p className={`text-sm ${healthRisk.color} font-semibold`}>{healthRisk.level}</p>
              </div>
            </div>
            <Badge variant="secondary" className={`${aqiInfo.color} ${aqiInfo.bgColor} border-0`}>
              AQI {aqi}
            </Badge>
          </div>

          {/* Pollutant Risk Assessment */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Pollutant Levels</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'PM2.5', value: pollutants.pm2_5, max: 25, unit: 'μg/m³' },
                { name: 'PM10', value: pollutants.pm10, max: 50, unit: 'μg/m³' },
                { name: 'Ozone', value: pollutants.o3, max: 180, unit: 'μg/m³' },
                { name: 'NO₂', value: pollutants.no2, max: 200, unit: 'μg/m³' },
              ].map((pollutant, index) => {
                const percentage = Math.min((pollutant.value / pollutant.max) * 100, 100);
                const isHigh = percentage > 70;
                
                return (
                  <motion.div
                    key={pollutant.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 rounded-lg ${isHigh ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {pollutant.name}
                      </span>
                      <span className={`text-xs font-semibold ${isHigh ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {pollutant.value.toFixed(1)} {pollutant.unit}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Group-specific Recommendations */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Recommendations by Group</h4>
            <div className="space-y-3">
              {recommendations.map((rec, index) => {
                const RecIcon = rec.icon;
                return (
                  <motion.div
                    key={rec.group}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm">
                      <RecIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                        {rec.group}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {rec.advice}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Emergency Contact Info */}
          {aqi >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-800 dark:text-red-200">Health Alert</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300">
                Air quality has reached unhealthy levels. If you experience breathing difficulties, 
                chest pain, or other health symptoms, seek medical attention immediately.
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}