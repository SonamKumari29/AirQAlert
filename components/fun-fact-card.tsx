import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FUN_FACTS = [
  { emoji: '🌳', text: 'A single mature tree can absorb up to 48 pounds of CO₂ per year!' },
  { emoji: '🌏', text: 'The cleanest air in the world is found in Tasmania, Australia.' },
  { emoji: '⚡', text: 'Lightning can help clean the air by producing ozone.' },
  { emoji: '🐝', text: 'Bees are sensitive to air pollution and can be used as air quality indicators!' },
  { emoji: '🏠', text: 'Indoor air can be 2-5x more polluted than outdoor air.' },
  { emoji: '🌧️', text: 'The smell of rain is caused by ozone and plant oils.' },
  { emoji: '🪴', text: 'Some houseplants can remove toxins like formaldehyde from the air.' },
  { emoji: '👃', text: 'Your sense of smell gets sharper when air is clean!' },
  { emoji: '🌬️', text: 'PM2.5 particles are so small that 40 of them side by side equal the width of a human hair.' },
  { emoji: '🌫️', text: 'Air pollution can travel thousands of miles—dust from the Sahara can reach the Amazon rainforest.' },
  { emoji: '😎', text: 'Wearing sunglasses can help protect your eyes from air pollution on hazy days.' },
  { emoji: '🌲', text: 'Trees can remove up to 60% of air pollution in urban areas!' },
  { emoji: '🚌', text: 'Carpooling or using public transport can reduce your carbon footprint and local air pollution.' },
  { emoji: '👶', text: 'Children are more vulnerable to air pollution because they breathe faster than adults.' },
  { emoji: '💧', text: 'High humidity can trap pollutants closer to the ground, worsening air quality.' },
  { emoji: '😷', text: 'Wearing a mask on high pollution days can help protect your lungs.' },
  { emoji: '🌞', text: 'Ozone at ground level is harmful, but in the upper atmosphere, it protects us from UV rays.' },
  { emoji: '🌱', text: 'Opening windows for 10 minutes a day can significantly improve indoor air quality.' },
  { emoji: '🌻', text: 'Houseplants like spider plants and peace lilies can help clean indoor air.' },
  { emoji: '🦠', text: 'Air pollution kills an estimated 7 million people worldwide every year (WHO).'}
];

function getRandomFact(currentIdx: number) {
  let idx = currentIdx;
  while (idx === currentIdx) {
    idx = Math.floor(Math.random() * FUN_FACTS.length);
  }
  return idx;
}

const FunFactCard: React.FC = () => {
  const [factIdx, setFactIdx] = useState(0);
  const [rotating, setRotating] = useState(false);
  const fact = FUN_FACTS[factIdx];

  const handleRotate = () => {
    setRotating(true);
    setTimeout(() => {
      setFactIdx(getRandomFact(factIdx));
      setRotating(false);
    }, 350);
  };

  return (
    <Card className="relative backdrop-blur-lg bg-white/90 dark:bg-slate-800/90 border-0 shadow-xl p-6 rounded-2xl flex flex-col justify-start max-h-[260px] lg:max-h-[220px] transition-all duration-300 hover:shadow-2xl">
      {/* Top right refresh icon */}
      <motion.button
        onClick={handleRotate}
        whileHover={{ scale: 1.15, rotate: 20 }}
        whileTap={{ scale: 0.95, rotate: -20 }}
        animate={rotating ? { rotate: 360 } : { rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute top-4 right-4 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white w-10 h-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 z-20"
        aria-label="Show another fact"
      >
        <RefreshCw className="h-5 w-5" />
      </motion.button>
      <CardHeader className="flex flex-row items-center gap-2 pb-2 z-10">
        <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 ml-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-400 dark:text-blue-300 animate-pulse" />
          What's in the Air Right Now?
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center items-center z-10">
        {/* Big Emoji */}
        <div className="text-5xl mb-2 animate-bounce-slow select-none" aria-hidden>{fact.emoji}</div>
        {/* Animated Fact Text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={factIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-base text-gray-700 dark:text-gray-100 text-center mb-4 font-medium"
          >
            {fact.text}
          </motion.p>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default FunFactCard; 