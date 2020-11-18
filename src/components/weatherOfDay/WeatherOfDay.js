import React from 'react'
import clear from '../../static/images/Clear.png'
import hail from '../../static/images/Hail.png'
import heavyCloud from '../../static/images/HeavyCloud.png'
import heavyRain from '../../static/images/HeavyRain.png'
import lightCloud from '../../static/images/LightCloud.png'
import lightRain from '../../static/images/LightRain.png'
import shower from '../../static/images/Shower.png'
import sleet from '../../static/images/Sleet.png'
import snow from '../../static/images/Snow.png'
import thunderstorm from '../../static/images/Thunderstorm.png'

import { useQuery } from 'react-query'
import Loader from 'react-loader-spinner'

import './WeatherOfDay.scss'
import { getWeatherByLocationId } from '../../services/WeatherService'

const WeatherOfDay = ({
	locationId = 615702,
	onSearchForPlacesClick = () => {},
}) => {
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

	const { isLoading, isError, data } = useQuery(
		['weatherOfDay', locationId],
		getWeatherByLocationId,
		{
			refetchOnWindowFocus: false,
		}
	)
	const { weather_state_abbr, the_temp } =
		(data && data.consolidated_weather && data.consolidated_weather[0]) || {}

	const handleSearchForPlacesClick = () => {
		onSearchForPlacesClick()
	}

	return (
		<article className='weatherOfDay'>
			<div className='weatherOfDay__searchForPlaces'>
				<button
					className='weatherOfDay__searchForPlaces-button'
					aria-label='searchForPlaces'
					onClick={handleSearchForPlacesClick}
				>
					Search for places
				</button>
			</div>
			{isLoading && (
				<div
					className='weatherOfDay__spinner'
					data-testid='weatherOfDay__spinner'
				>
					<Loader type='Circles' color='#00BFFF' height={80} width={80} />
				</div>
			)}
			{!isLoading && !isError && (
				<>
					<img
						src={weatherState[weather_state_abbr].img}
						alt={weatherState[weather_state_abbr].name}
						className='weatherOfDay__img'
					/>
					<p className='weatherOfDay__temp'>
						{Math.round(the_temp)}
						<span className='weatherOfDay__temp-symbol'>°C</span>
					</p>
					<p className='weatherOfDay__conditions'>
						{weatherState[weather_state_abbr].name}
					</p>
				</>
			)}
		</article>
	)
}

export default WeatherOfDay
