"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  location?: string;
}

interface AirQualityAlertsProps {
  currentAQI: number;
  location: string;
}

export default function AirQualityAlerts({ currentAQI, location }: AirQualityAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    // Generate alerts based on AQI
    const newAlerts: Alert[] = [];

    if (currentAQI >= 4) {
      newAlerts.push({
        id: 'unhealthy-alert',
        type: 'warning',
        title: 'Unhealthy Air Quality',
        message: 'Air quality has reached unhealthy levels. Limit outdoor activities and consider wearing a mask.',
        timestamp: new Date(),
        location
      });
    } else if (currentAQI === 3) {
      newAlerts.push({
        id: 'moderate-alert',
        type: 'info',
        title: 'Moderate Air Quality',
        message: 'Sensitive individuals should consider reducing prolonged outdoor activities.',
        timestamp: new Date(),
        location
      });
    } else if (currentAQI <= 2) {
      newAlerts.push({
        id: 'good-alert',
        type: 'success',
        title: 'Good Air Quality',
        message: 'Air quality is good. Perfect time for outdoor activities!',
        timestamp: new Date(),
        location
      });
    }

    // Add weather-related alerts
    if (Math.random() > 0.7) { // Simulate weather alerts
      newAlerts.push({
        id: 'weather-alert',
        type: 'info',
        title: 'Weather Update',
        message: 'Light winds expected to improve air quality later today.',
        timestamp: new Date(),
        location
      });
    }

    setAlerts(newAlerts);
  }, [currentAQI, location]);

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getAlertColors = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    }
  };

  if (!showAlerts || alerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setShowAlerts(true)}
          className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <Bell className="h-5 w-5" />
          {alerts.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 bg-red-500 text-white text-xs">
              {alerts.length}
            </Badge>
          )}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm space-y-2">
      <AnimatePresence>
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 300, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`${getAlertColors(alert.type)} border shadow-lg backdrop-blur-lg`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex items-start space-x-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {alert.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {alert.message}
                      </p>
                      {alert.location && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                          📍 {alert.location}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAlert(alert.id)}
                    className="h-6 w-6 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAlerts(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Hide Alerts
          </Button>
        </motion.div>
      )}
    </div>
  );
}