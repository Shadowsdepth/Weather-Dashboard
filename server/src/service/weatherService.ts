import dotenv from 'dotenv';

dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// Complete the WeatherService class
class WeatherService {
  constructor(
  _city: string,
  _date: string,
  _icon: string,
  _iconDescription: string,
  _tempF: number,
  _windSpeed: number,
  _humidity: number
  ) {}

  // Define the baseURL, API key, and city name properties
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = process.env.WEATHER_API_KEY || '';
  private cityName: string = '';

  // Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    const data = await response.json();
    return data[0];
  }

  // Create destructureLocationData method
  private destructureLocationData(locationData: { lat: number; lon: number }): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon
    };
  }

  // Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.cityName}`;
  }

  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }

  // Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }

  // Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    return new Weather(
      response.name,
      new Date().toISOString(),
      response.weather[0].icon,
      response.weather[0].description,
      response.main.temp,
      response.wind.speed,
      response.main.humidity
    );
  }

  // Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return [currentWeather, ...weatherData];
  }

  // Complete getWeatherForCity method
  async getWeatherForCity(City: string) {
    this.cityName = City;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, []);
  }
}

export default new WeatherService('', '', '', '', 0, 0, 0);
