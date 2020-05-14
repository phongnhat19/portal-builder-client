import React, {useState, useEffect} from 'react';
import Weather from 'simple-react-weather';
import SettingsWidget from '../components/Settings';
import WeatherModal from './WeatherModal';
import './style.css';
import {WEATHER_TYPE} from './constant';
import FullWeather from './FullWeather';
import axios from 'axios';

const WeatherWidget = ({
  onSaveSetting,
  onRemove,
  showSettingInit = false,
  unitTemp = 'C',
  weatherCity = '',
  openWeatherMapAPIKey = '',
  type = WEATHER_TYPE.SIMPLE,
}: {
  showSettingInit?: boolean;
  unitTemp?: string;
  weatherCity?: string;
  openWeatherMapAPIKey?: string;
  type?: string;

  onRemove?: () => void;
  onSaveSetting?: ({unitTemp, weatherCity, openWeatherMapAPIKey, type, data}: {
    unitTemp: string;
    weatherCity: string;
    openWeatherMapAPIKey: string;
    type: string;
    data?: FullWeatherProps;
  }) => void;
}) => {

  const [modelErr, setModelErr] = useState({
    city: '',
    api: ''
  });
  const [showSetting, setShowSetting] = useState(showSettingInit);
  const [weatherData, setWeatherData] = useState({
    description: '',
    humidity: '',
    windSpeed: '',
    cloud: ''
  });

  const handleSaveModel = async (item: WeatherModal) => {
    const weather = `http://api.openweathermap.org/data/2.5/weather?q=${item.city}&appid=${item.apiKey}`;
    const weatherAPI: any = await axios.get(weather);
    const weatherDataAPI: any = weatherAPI.data;
    if (weatherDataAPI.cod === 200) {
      setWeatherData({
        description: weatherDataAPI.weather[0].description,
        humidity: `${weatherDataAPI.main.humidity} %`,
        windSpeed: `${weatherDataAPI.wind.speed} meter/sec`,
        cloud: `${weatherDataAPI.clouds.all} %`
      });
      setModelErr({
        city: '',
        api: ''}
      );
      onSaveSetting && onSaveSetting({
        unitTemp: item.unit,
        weatherCity: item.city,
        openWeatherMapAPIKey: item.apiKey,
        type: item.type
      });
      setShowSetting(false);
    } else {
      const cityErr = weatherDataAPI.cod !== 401 ? weatherDataAPI.message : '';
      const apiErr = weatherDataAPI.cod === 401 ? weatherDataAPI.message : '';
      setModelErr({
        city: cityErr,
        api: apiErr
      });
    }
  };

  return (
    <div className="widget-weather">
      <SettingsWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <WeatherModal
        defaultAPIKey={openWeatherMapAPIKey}
        defaultCity={weatherCity}
        defaultUnit={unitTemp}
        defaultType={type}
        isVisible={showSetting}
        error={modelErr}
        onClose={() => {
          setShowSetting(false);
          setModelErr({
            city: '',
            api: ''
          });
        }}
        onSave={handleSaveModel}
      />
      {
        type === WEATHER_TYPE.SIMPLE ?
          <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
          :
          <FullWeather
            openWeatherMapAPIKey={openWeatherMapAPIKey}
            unitTemp={unitTemp}
            weatherCity={weatherCity}
            weatherData={weatherData}
          />
      }
    </div >
  );
};

export default WeatherWidget;