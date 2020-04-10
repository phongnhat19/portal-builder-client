declare type WeatherWidgetProps = {
  showSettingInit?: boolean;
  unitTemp?: string;
  weatherCity?: string;
  openWeatherMapAPIKey?: string;
  type?: string;
}

declare type FullWeatherProps = {
  description: string;
  humidity: string;
  windSpeed: string;
  cloud: string;
}