import {
  CloudInfo,
  CoordInfo,
  RainInfo,
  SnowInfo,
  SystemInfo,
  TemperatureInfo,
  WeatherEntry,
  WindInfo,
  ForecastTemperatureInfo,
  DayOrNightInfo,
  CityInfo
} from './model'

export type MeasurementUnit = 'standard' | 'metric' | 'imperial'

export type BaseApiParams = {
  appid: string // API key
  lat: string // latitude
  lon: string // longitude
}

export type CurrentWeatherApiParams = BaseApiParams & {
  mode?: 'json' | 'xml' | 'html'
  units?: MeasurementUnit
  lang?: string // language
}

export type CurrentWeatherApiResponse = {
  coord: CoordInfo
  weather: WeatherEntry[]
  base: string
  main: TemperatureInfo
  visibility: number // 視界
  wind: WindInfo
  rain?: RainInfo
  snow?: SnowInfo
  clouds: CloudInfo
  dt: number // Unix, UTC
  sys: SystemInfo
  timezone: number
  id: number
  name: string
  cod: number
}

export type GeoCodingApiParams = {
  q: string
  appid: string
  limit?: number
}

export type GeoCodingApiResponse = {
  name: string
  local_names: any
  lat: number
  lon: number
  country: string
  state?: string
}

export type GeoCodingReverseApiParams = BaseApiParams
export type GeoCodingReverseApiResponse = GeoCodingApiResponse

export type ForecastApiParams = CurrentWeatherApiParams & {
  cnt?: number
}

export type ForecastWeatherData = {
  dt: number // Unix, UTC
  main: ForecastTemperatureInfo
  weather: WeatherEntry[]
  clouds: CloudInfo
  wind: WindInfo
  visibility: number
  pop: number
  rain: RainInfo
  snow: SnowInfo
  sys: DayOrNightInfo
  dt_txt: string
}

export type ForecastApiResponse = {
  cod: string
  message: number
  cnt: number
  list: ForecastWeatherData[]
  city: CityInfo
}
