"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getPollutantInfo } from '@/lib/api';

interface PollutantsBreakdownProps {
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export default function PollutantsBreakdown({ components }: PollutantsBreakdownProps) {
  const pollutants = [
    { key: 'pm2_5', value: components.pm2_5, max: 25, color: 'bg-red-500' },
    { key: 'pm10', value: components.pm10, max: 50, color: 'bg-orange-500' },
    { key: 'o3', value: components.o3, max: 180, color: 'bg-blue-500' },
    { key: 'no2', value: components.no2, max: 200, color: 'bg-yellow-500' },
    { key: 'so2', value: components.so2, max: 350, color: 'bg-purple-500' },
    { key: 'co', value: components.co, max: 30000, color: 'bg-green-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Pollutant Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pollutants.map((pollutant, index) => {
            const info = getPollutantInfo(pollutant.key);
            const percentage = Math.min((pollutant.value / pollutant.max) * 100, 100);
            
            return (
              <motion.div
                key={pollutant.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {info.name}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {info.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {pollutant.value.toFixed(1)} {info.unit}
                  </span>
                </div>
                
                <div className="relative">
                  <Progress
                    value={percentage}
                    className="h-2 bg-gray-200 dark:bg-gray-700"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`absolute top-0 left-0 h-2 rounded-full ${pollutant.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}