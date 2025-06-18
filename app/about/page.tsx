"use client";

import { motion } from 'framer-motion';
import { Info, Shield, Globe, Heart, Zap } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const aqiLevels = [
    { level: 'Good', range: '1', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20', description: 'Air is clean and safe.' },
    { level: 'Fair', range: '2', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20', description: 'Air is okay for most people.' },
    { level: 'Moderate', range: '3', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20', description: 'Sensitive people should be careful.' },
    { level: 'Poor', range: '4', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20', description: 'Everyone may feel effects; limit outdoor activities.' },
    { level: 'Very Poor', range: '5', color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/20', description: 'Health warnings for everyone; best to stay indoors.' },
  ];

  const features = [
    {
      icon: <Globe className="h-6 w-6" />, title: 'Worldwide Info', description: 'Check air quality for any city around the world.'
    },
    {
      icon: <Zap className="h-6 w-6" />, title: 'Live Updates', description: 'Get the latest air quality data, always fresh.'
    },
    {
      icon: <Heart className="h-6 w-6" />, title: 'Health Tips', description: 'See simple health advice based on the air quality.'
    },
    {
      icon: <Shield className="h-6 w-6" />, title: 'Privacy Friendly', description: 'Your location is only used to show local air quality.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Info className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            About AirQAlert
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            AirQAlert helps you quickly check if the air is safe to breathe, wherever you are. We want to make it easy for everyone to know about air quality, so you can plan your day and look after your health.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We believe everyone should have easy access to clear, real-time air quality info. AirQAlert is here to help you make better choices for your health and your family, with simple and reliable data.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
            Why Use AirQAlert?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl h-full">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
                      <div className="text-blue-600 dark:text-blue-400">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                What is AQI?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                AQI stands for Air Quality Index. It's a simple number that tells you how clean or polluted the air is. The lower the number, the better the air.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                {aqiLevels.map((level, index) => (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className={`p-4 rounded-lg ${level.bgColor} text-center`}
                  >
                    <div className={`text-2xl font-bold ${level.color} mb-2`}>
                      {level.range}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${level.color} ${level.bgColor} border-0 mb-2`}
                    >
                      {level.level}
                    </Badge>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {level.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                What Pollutants Do We Track?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">PM2.5 & PM10</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tiny particles that can get deep into your lungs and make it hard to breathe.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Ozone (O₃)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ozone near the ground can cause breathing problems and make your eyes sting.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Nitrogen Dioxide (NO₂)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This gas mostly comes from cars and factories and can irritate your lungs.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Other Pollutants</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We also track other things in the air that can affect your health, like sulfur dioxide and ammonia.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}