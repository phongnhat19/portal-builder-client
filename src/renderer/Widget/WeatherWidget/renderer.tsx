import React from 'react'
import Weather from 'simple-react-weather'
import { WEATHER_TYPE } from './constant';
import { Row, Col } from 'antd';

const WeatherComponent = ({
  width,
  height,
  unitTemp = 'C',
  weatherCity = '',
  openWeatherMapAPIKey = '',
  type = WEATHER_TYPE.SIMPLE,
  data = {
    description: '',
    humidity: '',
    windSpeed: '',
    cloud: ''
  }
}: {
  width?: string | number
  height?: string | number
  unitTemp?: string
  weatherCity?: string
  openWeatherMapAPIKey?: string
  type?: string
  data?: FullWeatherProps
}) => {

  return (
    <div style={{ width, height }} className='widget-weather'>
      {type === WEATHER_TYPE.SIMPLE ?
        <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
        :
        <Row style={{ display: 'flex' }}>
          <Col span={10}>
            <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
          </Col>
          <Col span={14} className='widget-full-weather'>
            <p><strong>weather:</strong> {data.description}</p>
            <p><strong>humidity:</strong> {data.humidity}</p>
            <p><strong>wind speed:</strong> {data.windSpeed}</p>
            <p><strong>cloud:</strong> {data.cloud}</p>
          </Col>
        </Row>
      }
    </div >
  )
}

export default WeatherComponent