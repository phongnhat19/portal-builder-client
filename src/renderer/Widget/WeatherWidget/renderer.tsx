import React, { useState, useEffect } from 'react'
import 'whatwg-fetch';
import Weather from 'simple-react-weather';
import { WEATHER_TYPE } from './constant';
import { Row, Col } from 'antd';
import axios from 'axios';
const WeatherComponent = ({
  unitTemp = 'C',
  weatherCity = '',
  openWeatherMapAPIKey = '',
  type = WEATHER_TYPE.SIMPLE,
}: {
  unitTemp?: string
  weatherCity?: string
  openWeatherMapAPIKey?: string
  type?: string
}) => {

  const [weatherData, setWeatherData] = useState({
    description: '',
    humidity: '',
    windSpeed: '',
    cloud: ''
  })

  const weather = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${openWeatherMapAPIKey}`

  useEffect(() => {
    (async () => {
      try {
        if (weatherCity !== '' && openWeatherMapAPIKey !== '') {
          const weatherAPI: any = await Promise.all([axios.get(weather)]);
          const weatherDataAPI: any = await Promise.all([weatherAPI[0].data]);
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
  }, [weatherCity, openWeatherMapAPIKey, unitTemp, type])

  return (
    <div className='widget-weather'>
      {type === WEATHER_TYPE.SIMPLE ?
        <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
        :
        <Row style={{ display: 'flex' }}>
          <Col style={{ width: '20%' }}>
            <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
          </Col>
          <Col className='widget-full-weather'>
            <p><strong>weather:</strong> {weatherData.description}</p>
            <p><strong>humidity:</strong> {weatherData.humidity}</p>
            <p><strong>wind speed:</strong> {weatherData.windSpeed}</p>
            <p><strong>cloud:</strong> {weatherData.cloud}</p>
          </Col>
        </Row>
      }
    </div >
  )
}

export default WeatherComponent