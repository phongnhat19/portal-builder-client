import React from 'react';
import {Row, Col} from 'antd';
import Weather from 'simple-react-weather';

const FullWeather = ({unitTemp, weatherCity, openWeatherMapAPIKey, weatherData}: {
  unitTemp: string; weatherCity: string; openWeatherMapAPIKey: string; weatherData: FullWeatherProps;
}) => {

  return (
    <Row>
      <Col span={8}>
        <Weather unit={unitTemp} city={weatherCity} appid={openWeatherMapAPIKey} />
      </Col>
      <Col span={16} className="widget-full-weather">
        <p><strong>weather:</strong> {weatherData.description}</p>
        <p><strong>humidity:</strong> {weatherData.humidity}</p>
        <p><strong>wind speed:</strong> {weatherData.windSpeed}</p>
        <p><strong>cloud:</strong> {weatherData.cloud}</p>
      </Col>
    </Row>
  );
};

export default FullWeather;