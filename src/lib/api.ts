
class ApiUrl {
	private type: string
	private version: string
	private endpoint: string

	constructor(type: string, version: string, endpoint: string) {
		this.type = type
		this.version = version
		this.endpoint = endpoint
	}

	get href() {
		return `https://api.openweathermap.org/${this.type}/${this.version}/${this.endpoint}`
	}
}

export const WEATHER_API_URL = new ApiUrl('data', '2.5', 'weather').href
export const GEOCODING_API_URL = new ApiUrl('geo', '1.0', 'direct').href
export const GEOCODING_REVERSE_API_URL = new ApiUrl('geo', '1.0', 'reverse').href
export const FORECAST_API_URL = new ApiUrl('data', '2.5', 'forecast').href
