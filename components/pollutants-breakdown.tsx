"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getPollutantInfo } from '@/lib/api';
import React, { useState } from 'react';
import { AlertTriangle, Shield, Wind, Droplets, Flame, Cloud, Leaf, X } from 'lucide-react';

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

const POLLUTANT_DETAILS: Array<{
  key: string;
  name: string;
  icon: React.ReactNode;
  what: string;
  harm: string;
  protect: string;
  sources: string;
}> = [
  {
    key: 'pm2_5',
    name: 'PM2.5',
    icon: <Wind className="h-7 w-7 text-pink-500" />, // wind for fine particles
    what: 'Tiny particles (less than 2.5 micrometers) that can get deep into your lungs.',
    harm: 'Can cause breathing problems, worsen asthma, and affect heart health.',
    protect: 'Wear a mask, use air purifiers, and avoid outdoor exercise when levels are high.',
    sources: 'Vehicle exhaust, burning wood, industrial emissions, dust.'
  },
  {
    key: 'pm10',
    name: 'PM10',
    icon: <Wind className="h-7 w-7 text-yellow-500" />, // wind for coarse particles
    what: 'Slightly larger particles (less than 10 micrometers) that can be inhaled.',
    harm: 'Can irritate your nose, throat, and lungs.',
    protect: 'Keep windows closed, use air purifiers, avoid busy roads.',
    sources: 'Construction sites, road dust, pollen, vehicle emissions.'
  },
  {
    key: 'o3',
    name: 'Ozone (O₃)',
    icon: <Cloud className="h-7 w-7 text-blue-500" />, // cloud for ozone
    what: 'A gas found near the ground, not to be confused with the ozone layer.',
    harm: 'Can cause chest pain, coughing, and worsen lung diseases.',
    protect: 'Limit outdoor activities on high ozone days, especially in the afternoon.',
    sources: 'Car exhaust, industrial emissions, reacts in sunlight.'
  },
  {
    key: 'no2',
    name: 'Nitrogen Dioxide (NO₂)',
    icon: <Droplets className="h-7 w-7 text-indigo-500" />, // droplets for gas
    what: 'A reddish-brown gas with a sharp smell.',
    harm: 'Can irritate airways and lower resistance to respiratory infections.',
    protect: 'Stay indoors on high NO₂ days, ventilate your home.',
    sources: 'Car engines, power plants, burning fossil fuels.'
  },
  {
    key: 'so2',
    name: 'Sulfur Dioxide (SO₂)',
    icon: <Flame className="h-7 w-7 text-orange-500" />, // flame for burning
    what: 'A colorless gas with a strong smell.',
    harm: 'Can cause throat and eye irritation, and worsen asthma.',
    protect: 'Avoid outdoor activities when levels are high.',
    sources: 'Coal burning, power plants, industrial processes.'
  },
  {
    key: 'co',
    name: 'Carbon Monoxide (CO)',
    icon: <Shield className="h-7 w-7 text-gray-500" />, // shield for protection
    what: 'A colorless, odorless gas.',
    harm: 'Reduces oxygen in your blood, can be very dangerous in high amounts.',
    protect: 'Ensure good ventilation, avoid idling cars in garages.',
    sources: 'Car exhaust, gas stoves, burning fuel.'
  },
  {
    key: 'nh3',
    name: 'Ammonia (NH₃)',
    icon: <Leaf className="h-7 w-7 text-green-500" />, // leaf for agriculture
    what: 'A colorless gas with a strong smell.',
    harm: 'Can irritate eyes, nose, and throat.',
    protect: 'Avoid exposure, ventilate indoor spaces.',
    sources: 'Fertilizers, livestock waste, cleaning products.'
  }
];

const PollutantDetails: React.FC = () => {
  const [selected, setSelected] = useState<null | typeof POLLUTANT_DETAILS[0]>(null);

  return (
    <div className="mt-8">
      <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl mb-8 p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">Pollutant Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 lg:gap-8 items-stretch justify-items-center">
            {POLLUTANT_DETAILS.map((p) => {
              let borderColor = '';
              switch (p.key) {
                case 'pm2_5': borderColor = 'border-2 border-pink-500'; break;
                case 'pm10': borderColor = 'border-2 border-yellow-500'; break;
                case 'o3': borderColor = 'border-2 border-blue-500'; break;
                case 'no2': borderColor = 'border-2 border-indigo-500'; break;
                case 'so2': borderColor = 'border-2 border-orange-500'; break;
                case 'co': borderColor = 'border-2 border-gray-500'; break;
                case 'nh3': borderColor = 'border-2 border-green-500'; break;
                default: borderColor = 'border-2'; break;
              }

              // Split name into main and symbol
              let mainName = p.name;
              let symbol = '';
              const match = p.name.match(/^(.*?)(\s*\((.*?)\))?$/);
              if (match) {
                mainName = match[1].trim();
                symbol = match[3] ? `(${match[3]})` : '';
              }

              return (
                <button
                  key={p.key}
                  className={`flex flex-col items-center justify-center h-24 w-full min-w-[120px] rounded-xl bg-white dark:bg-slate-800 ${borderColor} shadow hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700`}
                  onClick={() => setSelected(p)}
                  aria-label={p.name}
                  type="button"
                >
                  <div className="flex flex-col items-center justify-center w-full text-center">
                    <span className="text-base font-semibold text-gray-800 dark:text-gray-100 leading-tight">{mainName}</span>
                    {symbol && (
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 leading-tight">{symbol}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Modal for details (each detail as a card) */}
      {selected && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-4 max-w-md w-full relative flex flex-col items-center gap-4">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
              onClick={() => setSelected(null)}
              aria-label="Close"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="flex flex-col items-center min-w-[60px]">
              <span className="font-bold text-base text-gray-900 dark:text-gray-100 mt-1 text-center">{selected.name}</span>
            </div>
            <div className="flex flex-row flex-wrap gap-3 items-center w-full justify-center text-xs">
              <div className="rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 shadow p-2 min-w-[100px] max-w-xs flex items-center gap-2">
                <span className="font-bold text-blue-700 dark:text-blue-300">What?</span> <span className="text-gray-700 dark:text-gray-300">{selected.what}</span>
              </div>
              <div className="rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 shadow p-2 min-w-[100px] max-w-xs flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" /> <span className="font-bold text-red-700 dark:text-red-300">Harm?</span> <span className="text-red-700 dark:text-red-300">{selected.harm}</span>
              </div>
              <div className="rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 shadow p-2 min-w-[100px] max-w-xs flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" /> <span className="font-bold text-green-700 dark:text-green-300">Protect:</span> <span className="text-green-700 dark:text-green-300">{selected.protect}</span>
              </div>
              <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 shadow p-2 min-w-[100px] max-w-xs flex items-center gap-2">
                <Leaf className="h-4 w-4 text-yellow-500" /> <span className="font-bold text-yellow-700 dark:text-yellow-300">Sources:</span> <span className="text-yellow-700 dark:text-yellow-300">{selected.sources}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
      <PollutantDetails />
    </motion.div>
  );
}