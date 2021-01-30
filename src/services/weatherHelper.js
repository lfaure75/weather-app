import clear from '../static/images/Clear.png'
import lightCloud from '../static/images/LightCloud.png'
import heavyCloud from '../static/images/HeavyCloud.png'
import shower from '../static/images/Shower.png'
import lightRain from '../static/images/LightRain.png'
import heavyRain from '../static/images/HeavyRain.png'
import thunderstorm from '../static/images/Thunderstorm.png'
import hail from '../static/images/Hail.png'
import sleet from '../static/images/Sleet.png'
import snow from '../static/images/Snow.png'

export const getWeatherState = (weather_state_abbr) => {
	const weatherState = {
		c: { img: clear, name: 'Clear' },
		lc: { img: lightCloud, name: 'Light Cloud' },
		hc: { img: heavyCloud, name: 'Heavy Cloud' },
		s: { img: shower, name: 'Showers' },
		lr: { img: lightRain, name: 'Light Rain' },
		hr: { img: heavyRain, name: 'Heavy Rain' },
		t: { img: thunderstorm, name: 'Thunderstorm' },
		h: { img: hail, name: 'Hail' },
		sl: { img: sleet, name: 'Sleet' },
		sn: { img: snow, name: 'Snow' },
	}
	return weatherState[weather_state_abbr] || {}
}
