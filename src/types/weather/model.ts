export type CoordInfo = {
  lat: number
  lon: number
}

export type WeatherEntry = {
  id: number
  main: string
  description: string
  icon: string
}

export type TemperatureInfo = {
  temp: number // 温度
  feels_like: number // 体感温度
  temp_min: number // 最低温度
  temp_max: number // 最高温度
  pressure: number // 気圧(hPa)
  humidity: number // 湿度(%)
  sea_level: number // 海面大気圧(hPa)
  grnd_level: number // 地面気圧(hPa)
}

export type ForecastTemperatureInfo = TemperatureInfo & {
  temp_kf: number
}

export type WindInfo = {
  speed: number // 風速(メートル/秒)
  deg: number // 風向(degree)
  guest: number // 突風(メートル/秒)
}

export type RainInfo = {
  '1h'?: number // 過去一時間の降雨量(mm)
  '3h'?: number // 過去三時間の降雨量(mm)
}

export type SnowInfo = {
  '1h'?: number // 過去一時間の積雪量(mm)
  '3h'?: number // 過去三時間の積雪量(mm)
}

export type CloudInfo = {
  all: number // 曇り度合い(%)
}

export type SystemInfo = {
  type: number
  id: number
  message?: any
  country: string
  sunrise: number // 日の出時刻(Unix, UTC)
  sunset: number // 日没時刻(Unix, UTC)
}

export type DayOrNightInfo = {
  pod: 'n' | 'd'
}

export type CityInfo = {
  id: number
  name: string
  coord: CoordInfo
	counrty: string
	population: number
	timezone: number
	sunrise: number
	sunset: number
}
