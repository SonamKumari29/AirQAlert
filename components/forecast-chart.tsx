"use client";

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAQICategory } from '@/lib/api';
import { format } from 'date-fns';

interface ForecastData {
  dt: number;
  aqi: number;
  components: {
    pm2_5: number;
    pm10: number;
    o3: number;
    no2: number;
  };
}

interface ForecastChartProps {
  data: ForecastData[];
}

export default function ForecastChart({ data }: ForecastChartProps) {
  const chartData = data.slice(0, 24).map(item => ({
    time: format(new Date(item.dt * 1000), 'HH:mm'),
    date: format(new Date(item.dt * 1000), 'MMM dd'),
    aqi: item.aqi,
    pm25: item.components.pm2_5,
    pm10: item.components.pm10,
    o3: item.components.o3,
    no2: item.components.no2,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const aqiInfo = getAQICategory(data.aqi);
      
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {data.date} at {label}
          </p>
          <div className={`mt-2 p-2 rounded ${aqiInfo.bgColor}`}>
            <p className={`font-bold ${aqiInfo.color}`}>
              AQI: {data.aqi} ({aqiInfo.level})
            </p>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <p>PM2.5: {data.pm25.toFixed(1)} μg/m³</p>
            <p>PM10: {data.pm10.toFixed(1)} μg/m³</p>
            <p>O₃: {data.o3.toFixed(1)} μg/m³</p>
            <p>NO₂: {data.no2.toFixed(1)} μg/m³</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            24-Hour AQI Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="time" 
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[1, 5]}
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="aqi"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#aqiGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Good (1)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Fair (2)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>Moderate (3)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Poor (4-5)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}