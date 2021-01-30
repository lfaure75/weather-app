import React from 'react'

import Loader from 'react-loader-spinner'

import './WeatherOfDay.scss'
import { getWeatherState } from '../../services/weatherHelper'

const WeatherOfDay = ({
	onSearchForPlacesClick = () => {},
	isLoading = true,
	isError,
	todayWeather = {},
}) => {
	const { weather_state_abbr, the_temp } = todayWeather

	const handleSearchForPlacesClick = () => {
		onSearchForPlacesClick()
	}

	const { img: weatherImage, name: weatherName } = getWeatherState(
		weather_state_abbr
	)

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
						src={weatherImage}
						alt={weatherName}
						className='weatherOfDay__img'
					/>
					<p className='weatherOfDay__temp'>
						{Math.round(the_temp)}
						<span className='weatherOfDay__temp-symbol'>°C</span>
					</p>
					<p className='weatherOfDay__conditions'>{weatherName}</p>
				</>
			)}
		</article>
	)
}

export default WeatherOfDay
