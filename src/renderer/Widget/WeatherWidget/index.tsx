import React, { useState, useEffect } from 'react'
import Weather from 'simple-react-weather'
import SettingsIframeWidget from '../IframeWidget/Settings';
import WeatherModal from './WeatherModal';
import './style.css'
import { WEATHER_TYPE } from './constant';
import FullWeather from './FullWeather';

const WeatherWidget = ({
  onSaveSetting,
  onRemove,
  width,
  height,
  showSettingInit = false,
  unitTemp = 'C',
  weatherCity = '',
  openWeatherMapAPIKey = '',
  type = WEATHER_TYPE.SIMPLE,
}: {
  showSettingInit?: boolean
  width?: string | number
  height?: string | number
  unitTemp?: string
  weatherCity?: string
  openWeatherMapAPIKey?: string
  type?: string

  onRemove?: () => void
  onSaveSetting?: ({ unitTemp, weatherCity, openWeatherMapAPIKey, type, data }: {
    unitTemp: string, weatherCity: string, openWeatherMapAPIKey: string, type: string,
    data?: FullWeatherProps
  }) => void
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)
  const [weatherData, setWeatherData] = useState({
    description: '',
    humidity: '',
    windSpeed: '',
    cloud: ''
  })

  const weather = `http://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${openWeatherMapAPIKey}`

  useEffect(() => {
    (async () => {
      try {
        if (weatherCity !== '' && openWeatherMapAPIKey !== '') {
          const weatherAPI: any = await Promise.all([fetch(weather)])
          const weatherDataAPI: any = await Promise.all([weatherAPI[0].json()])
          setWeatherData({
            description: weatherDataAPI[0].weather[0].description,
            humidity: `${weatherDataAPI[0].main.humidity} %`,
            windSpeed: `${weatherDataAPI[0].wind.speed} meter/sec`,
            cloud: `${weatherDataAPI[0].clouds.all} %`
          })
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [unitTemp, openWeatherMapAPIKey, weatherCity, type])

  return (
    <div style={{ width, height }} className='widget-weather'>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <WeatherModal
        defaultAPIKey={openWeatherMapAPIKey}
        defaultCity={weatherCity}
        defaultUnit={unitTemp}
        defaultType={type}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({
            unitTemp: item.unit,
            weatherCity: item.city,
            openWeatherMapAPIKey: item.apiKey,
            type: item.type
          })
          setShowSetting(false)
        }}
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
  )
}

export default WeatherWidget