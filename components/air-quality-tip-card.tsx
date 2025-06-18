import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

const TIPS = [
  'Ventilate your home for 10 minutes daily to improve indoor air quality.',
  'Avoid outdoor exercise when AQI is high.',
  'Houseplants can help filter indoor air.',
  'Check AQI before planning outdoor activities.',
  'Use public transport to help reduce air pollution.',
  'Change your air filter regularly for cleaner indoor air.',
  'Children and elderly are more sensitive to air pollution.',
  'On high pollution days, keep windows closed and use air purifiers.'
];

function getRandomTip() {
  return TIPS[Math.floor(Math.random() * TIPS.length)];
}

const AirQualityTipCard: React.FC = () => {
  const tip = getRandomTip();
  return (
    <Card className="backdrop-blur-lg bg-white/90 dark:bg-slate-800/90 border-0 shadow-xl p-5 rounded-2xl flex flex-col gap-2">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Info className="h-5 w-5 text-green-500" />
        <CardTitle className="text-base font-bold text-gray-800 dark:text-gray-200">Did you know?</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-gray-700 dark:text-gray-100 font-medium">
          {tip}
        </p>
        <a
          href="https://www.who.int/health-topics/air-pollution"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-xs font-semibold text-blue-600 dark:text-blue-300 hover:underline hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
        >
          Learn more at WHO
        </a>
      </CardContent>
    </Card>
  );
};

export default AirQualityTipCard; 