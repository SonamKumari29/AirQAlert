"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, BarChart3, PieChart, Activity, Target } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';
import { getAQICategory } from '@/lib/api';
import { format, subDays } from 'date-fns';

export default function InsightsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');
  
  // Mock historical data - in production, this would come from API
  const generateHistoricalData = (days: number) => {
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      return {
        date: format(date, 'MMM dd'),
        fullDate: date,
        aqi: Math.floor(Math.random() * 4) + 1,
        pm25: Math.random() * 50 + 10,
        pm10: Math.random() * 80 + 20,
        o3: Math.random() * 200 + 50,
        no2: Math.random() * 150 + 30,
      };
    });
  };

  const weekData = generateHistoricalData(7);
  const monthData = generateHistoricalData(30);
  const yearData = generateHistoricalData(365);

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case 'week': return weekData;
      case 'month': return monthData;
      case 'year': return yearData;
      default: return weekData;
    }
  };

  const currentData = getCurrentData();
  const averageAQI = Math.round(currentData.reduce((sum, item) => sum + item.aqi, 0) / currentData.length);
  const aqiInfo = getAQICategory(averageAQI);

  // Pollutant distribution data
  const pollutantData = [
    { name: 'PM2.5', value: 35, color: '#EF4444' },
    { name: 'PM10', value: 25, color: '#F97316' },
    { name: 'O₃', value: 20, color: '#3B82F6' },
    { name: 'NO₂', value: 15, color: '#8B5CF6' },
    { name: 'Others', value: 5, color: '#6B7280' },
  ];

  // Health impact metrics
  const healthMetrics = [
    { label: 'Good Air Days', value: 65, total: 100, color: 'bg-green-500' },
    { label: 'Moderate Days', value: 25, total: 100, color: 'bg-yellow-500' },
    { label: 'Unhealthy Days', value: 10, total: 100, color: 'bg-red-500' },
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
          className="text-center mb-8"
        >
          <BarChart3 className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Air Quality Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover patterns, trends, and personalized insights about air quality in your area with detailed analytics and recommendations.
          </p>
        </motion.div>

        {/* Period Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex space-x-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-lg p-1 shadow-lg">
            {(['week', 'month', 'year'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="capitalize"
              >
                {period}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Average AQI
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {averageAQI}
                  </p>
                </div>
                <Badge variant="secondary" className={`${aqiInfo.color} ${aqiInfo.bgColor} border-0`}>
                  {aqiInfo.level}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Best Day
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.min(...currentData.map(d => d.aqi))}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Worst Day
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {Math.max(...currentData.map(d => d.aqi))}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Trend
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentData[currentData.length - 1].aqi > currentData[0].aqi ? '↗️' : '↘️'}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="pollutants">Pollutants</TabsTrigger>
              <TabsTrigger value="health">Health Impact</TabsTrigger>
              <TabsTrigger value="recommendations">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-6">
              <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    AQI Trend Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentData}>
                        <defs>
                          <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="date" className="text-xs" />
                        <YAxis domain={[1, 5]} className="text-xs" />
                        <Tooltip 
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              const aqiInfo = getAQICategory(data.aqi);
                              return (
                                <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
                                  <p className="font-medium">{label}</p>
                                  <p className={`${aqiInfo.color} font-semibold`}>
                                    AQI: {data.aqi} ({aqiInfo.level})
                                  </p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pollutants" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Pollutant Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart data={pollutantData} cx="50%" cy="50%" outerRadius={80}>
                          <Tooltip />
                          {pollutantData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {pollutantData.map((item) => (
                        <div key={item.name} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.name} ({item.value}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Pollutant Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={currentData.slice(-7)}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="date" className="text-xs" />
                          <YAxis className="text-xs" />
                          <Tooltip />
                          <Line type="monotone" dataKey="pm25" stroke="#EF4444" strokeWidth={2} name="PM2.5" />
                          <Line type="monotone" dataKey="pm10" stroke="#F97316" strokeWidth={2} name="PM10" />
                          <Line type="monotone" dataKey="o3" stroke="#3B82F6" strokeWidth={2} name="O₃" />
                          <Line type="monotone" dataKey="no2" stroke="#8B5CF6" strokeWidth={2} name="NO₂" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Air Quality Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {healthMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {metric.label}
                          </span>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {metric.value}%
                          </span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Health Impact Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        7.2/10
                      </div>
                      <Badge variant="secondary" className="text-blue-600 bg-blue-100 dark:bg-blue-900/20 border-0">
                        Good Health Environment
                      </Badge>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                        Based on average air quality levels and exposure duration in your area.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Personalized Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                        🌟 Best Times for Outdoor Activities
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Early mornings (6-9 AM) typically show the best air quality in your area.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                        📊 Weekly Pattern
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Weekends show 15% better air quality compared to weekdays in your location.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">
                        ⚠️ Watch Out For
                      </h4>
                      <p className="text-sm text-orange-700 dark:text-orange-300">
                        PM2.5 levels tend to spike during evening rush hours (5-7 PM).
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-lg bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Action Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                          Indoor Air Quality
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Consider using air purifiers during high pollution days
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                          Exercise Timing
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Schedule outdoor workouts for early morning hours
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                          Health Monitoring
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Track symptoms on high pollution days
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}