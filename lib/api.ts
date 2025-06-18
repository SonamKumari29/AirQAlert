import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
if (!API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_OPENWEATHER_API_KEY environment variable. Please set it in your .env.local file.');
}
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface AQIData {
  coord: {
    lon: number;
    lat: number;
  };
  list: Array<{
    main: {
      aqi: number;
    };
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
    dt: number;
  }>;
}

export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface CityData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const getAQIByCoords = async (lat: number, lon: number): Promise<AQIData> => {
  const response = await axios.get(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return response.data;
};

export const getAQIForecast = async (lat: number, lon: number): Promise<AQIData> => {
  const response = await axios.get(
    `${BASE_URL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return response.data;
};

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};

export const searchCities = async (query: string): Promise<CityData[]> => {
  if (!query || query.length < 2) return [];
  
  const response = await axios.get(
    `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );
  return response.data;
};

export const getAQICategory = (aqi: number) => {
  switch (aqi) {
    case 1:
      return {
        level: 'Good',
        color: 'text-green-500',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
        description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
        healthTip: 'Great day for outdoor activities!'
      };
    case 2:
      return {
        level: 'Fair',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
        description: 'Air quality is acceptable; however, some pollutants may be a concern for sensitive people.',
        healthTip: 'Sensitive individuals should consider reducing prolonged outdoor activities.'
      };
    case 3:
      return {
        level: 'Moderate',
        color: 'text-orange-500',
        bgColor: 'bg-orange-100 dark:bg-orange-900/20',
        description: 'Members of sensitive groups may experience health effects.',
        healthTip: 'Consider wearing a mask if you have respiratory conditions.'
      };
    case 4:
      return {
        level: 'Poor',
        color: 'text-red-500',
        bgColor: 'bg-red-100 dark:bg-red-900/20',
        description: 'Everyone may begin to experience health effects.',
        healthTip: 'Limit outdoor activities and wear a mask when outside.'
      };
    case 5:
      return {
        level: 'Very Poor',
        color: 'text-purple-500',
        bgColor: 'bg-purple-100 dark:bg-purple-900/20',
        description: 'Health warnings of emergency conditions.',
        healthTip: 'Avoid outdoor activities and stay indoors when possible.'
      };
    default:
      return {
        level: 'Unknown',
        color: 'text-gray-500',
        bgColor: 'bg-gray-100 dark:bg-gray-900/20',
        description: 'Unable to determine air quality level.',
        healthTip: 'Monitor air quality updates.'
      };
  }
};

export const getPollutantInfo = (pollutant: string) => {
  const pollutants: Record<string, { name: string; unit: string; description: string }> = {
    co: { name: 'Carbon Monoxide', unit: 'μg/m³', description: 'Colorless, odorless gas' },
    no: { name: 'Nitrogen Monoxide', unit: 'μg/m³', description: 'Primary air pollutant' },
    no2: { name: 'Nitrogen Dioxide', unit: 'μg/m³', description: 'Reddish-brown gas' },
    o3: { name: 'Ozone', unit: 'μg/m³', description: 'Ground-level ozone' },
    so2: { name: 'Sulfur Dioxide', unit: 'μg/m³', description: 'Pungent gas from fossil fuels' },
    pm2_5: { name: 'PM2.5', unit: 'μg/m³', description: 'Fine particulate matter' },
    pm10: { name: 'PM10', unit: 'μg/m³', description: 'Coarse particulate matter' },
    nh3: { name: 'Ammonia', unit: 'μg/m³', description: 'Agricultural emissions' },
  };
  
  return pollutants[pollutant] || { name: pollutant, unit: 'μg/m³', description: 'Air pollutant' };
};