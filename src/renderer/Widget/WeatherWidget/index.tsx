import React, { useState, useEffect } from 'react'
// import SettingsIframeWidget from '../IframeWidget/Settings';
import { OpenWeatherMap } from 'react-weather'

const WeatherWidget = ({ onSaveSetting, width, height, onRemove, showSettingInit = false }: {
  onRemove?: () => void
  showSettingInit?: boolean
  width?: string | number
  height?: string | number
  onSaveSetting?: ({ defaultView }: { defaultView: string }) => void
}) => {

  // const [showSetting, setShowSetting] = useState(showSettingInit)
  // const [weatherCityText, setWeatherCityText] = useState('ho chi minh')
  // const weather = `http://api.openweathermap.org/data/2.5/weather?q=${weatherCityText}&appid=484aef51bbd57a72e3e8546ca208f7ad`
  // const [weatherData, setWeatherData] = useState('')

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const weatherAPI: any = await Promise.all([fetch(weather)])
  //       const weatherDataAPI: any = await Promise.all([weatherAPI[0].json()])

  //       console.log('API', weatherDataAPI[0]);
  //       setWeatherData(weatherDataAPI[0])
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })()
  // }, [])

  return (
    <div style={{ width, height }}>
      {/* <SettingsIframeWidget onRemove={onRemove} showSetting={() => setShowSetting(true)} /> */}
      <OpenWeatherMap city={'Ho Chi Minh'} country={'VN'} appid={'484aef51bbd57a72e3e8546ca208f7ad'} />
    </div>
  )
}

export default WeatherWidget