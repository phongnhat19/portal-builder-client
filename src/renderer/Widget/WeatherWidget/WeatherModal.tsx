import React, { useState } from 'react'
import { Modal, Row, Col, Radio, Input } from 'antd'
import { WEATHER_UNIT } from './constant';

const WeatherModal = ({ isVisible = false, onClose, onSave, defaultCity, defaultUnit, defaultAPIKey }: {
  defaultCity: string
  defaultUnit: string
  defaultAPIKey: string
  isVisible: boolean
  onSave: (item: { city: string, unit: string, apiKey: string }) => void
  onClose?: () => void
}) => {

  const [city, setCity] = useState(defaultCity)
  const [weatherUnit, setWeatherUnit] = useState(defaultUnit)
  const [apiKey, setApiKey] = useState(defaultAPIKey)

  return (
    <Modal
      title="Weather setting"
      visible={isVisible}
      okText="Save"
      onCancel={onClose}
      onOk={() => {
        onSave({
          city,
          apiKey,
          unit: weatherUnit,
        })
      }}
    >
      <Row>
        <Col span={4}>
          <strong>Unit</strong>
        </Col>
        <Col span={20}>
          <Radio.Group onChange={(e) => { setWeatherUnit(e.target.value) }} defaultValue={weatherUnit}>
            <Radio.Button value={WEATHER_UNIT.CELCIUS}>{WEATHER_UNIT.CELCIUS_TITLE}</Radio.Button>
            <Radio.Button value={WEATHER_UNIT.FAHRENHEIT}>{WEATHER_UNIT.FAHRENHEIT_TITLE}</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row className='widget-config-weather'>
        <Col span={4}>
          <strong>City</strong>
        </Col>
        <Col span={20}>
          <Input
            value={city}
            onChange={(e) => { setCity(e.target.value) }}
            placeholder="Input City"
          />
        </Col>
      </Row>
      <Row className='widget-config-weather'>
        <Col span={4}>
          <strong>API Key</strong>
        </Col>
        <Col span={20}>
          <Input
            value={apiKey}
            onChange={(e) => { setApiKey(e.target.value) }}
            placeholder="Input OpenWeatherMap API Key"
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default WeatherModal