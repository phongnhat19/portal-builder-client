declare type WeatherWidgetProps = {
    width: string
    height: string
    showSettingInit?: boolean
    unitTemp?: string
    weatherCity?: string
    openWeatherMapAPIKey?: string
    type?: string
    data?: FullWeatherProps
}

declare type FullWeatherProps = {
    description: string,
    humidity: string,
    windSpeed: string,
    cloud: string
}