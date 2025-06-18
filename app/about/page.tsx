"use client";

import { motion } from 'framer-motion';
import { Info, Shield, Globe, Heart, Zap, Users } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPage() {
  const aqiLevels = [
    { level: 'Good', range: '1', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20', description: 'Air quality is satisfactory' },
    { level: 'Fair', range: '2', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20', description: 'Acceptable for most people' },
    { level: 'Moderate', range: '3', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20', description: 'Sensitive groups may be affected' },
    { level: 'Poor', range: '4', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20', description: 'Everyone may experience effects' },
    { level: 'Very Poor', range: '5', color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/20', description: 'Health warnings for everyone' },
  ];

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Coverage',
      description: 'Access air quality data for cities worldwide using OpenWeatherMap API.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Real-time Data',
      description: 'Get up-to-date air quality information refreshed every hour.'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Health Recommendations',
      description: 'Receive personalized health tips based on current air quality levels.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Privacy First',
      description: 'Your location data is only used to fetch air quality information.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
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
            Your trusted companion for monitoring air quality worldwide. Stay informed, stay healthy, and make better decisions about your outdoor activities.
          </p>
        </motion.div>

        {/* Mission */}
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
                We believe everyone deserves access to accurate, real-time air quality information. 
                AirQAlert empowers individuals and communities to make informed decisions about their health 
                and daily activities by providing comprehensive air pollution data in a beautiful, easy-to-understand format.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
            Why Choose AirQAlert?
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

        {/* AQI Scale */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                Understanding Air Quality Index (AQI)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                The Air Quality Index is a standardized way to measure and communicate air quality levels.
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

        {/* Pollutants Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                Key Air Pollutants We Monitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">PM2.5 & PM10</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Particulate matter that can penetrate deep into lungs and cause respiratory issues.
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Ozone (O₃)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ground-level ozone that can cause breathing problems and eye irritation.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Nitrogen Dioxide (NO₂)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Gas produced mainly from vehicle emissions that can affect respiratory health.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Carbon Monoxide (CO)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Colorless, odorless gas that can be harmful in high concentrations.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Powered by OpenWeatherMap
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our data comes from OpenWeatherMap's comprehensive air pollution API, 
                providing accurate and reliable information from monitoring stations worldwide.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Data is updated hourly and covers over 10,000 cities globally.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}