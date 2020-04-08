import React, { useState, useEffect } from 'react'
import Weather from 'simple-react-weather'
import SettingsIframeWidget from '../IframeWidget/Settings';
import WeatherModal from './WeatherModal';
import './style.css'

const WeatherWidget = ({
  onSaveSetting,
  onRemove,
  width,
  height,
  showSettingInit = false,
  unitTemp = 'C',
  weatherCity = '',
  openWeatherMapAPIKey = ''
}: {
  showSettingInit?: boolean
  width?: string | number
  height?: string | number
  unitTemp?: string
  weatherCity?: string
  openWeatherMapAPIKey?: string

  onRemove?: () => void
  onSaveSetting?: ({ unitTemp, weatherCity, openWeatherMapAPIKey }: {
    unitTemp: string, weatherCity: string, openWeatherMapAPIKey: string
  }) => void
}) => {

  const [showSetting, setShowSetting] = useState(showSettingInit)

  useEffect(() => {
  }, [unitTemp, openWeatherMapAPIKey, weatherCity])

  return (
    <div style={{ width, height }} className='widget-weather'>
      <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} />
      <WeatherModal
        defaultAPIKey={openWeatherMapAPIKey}
        defaultCity={weatherCity}
        defaultUnit={unitTemp}
        isVisible={showSetting}
        onClose={() => (setShowSetting(false))}
        onSave={(item) => {
          onSaveSetting && onSaveSetting({ unitTemp: item.unit, weatherCity: item.city, openWeatherMapAPIKey: item.apiKey })
          setShowSetting(false)
        }}
      />
      <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
    </div >
  )
}

export default WeatherWidget