import React from 'react'
import Weather from 'simple-react-weather'

const WeatherComponent = ({
  width,
  height,
  unitTemp = 'C',
  weatherCity = '',
  openWeatherMapAPIKey = ''
}: {
  width?: string | number
  height?: string | number
  unitTemp?: string
  weatherCity?: string
  openWeatherMapAPIKey?: string
}) => {

  return (
    <div style={{ width, height }} className='widget-weather'>
      <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
    </div >
  )
}

export default WeatherComponent