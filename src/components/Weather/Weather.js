import React, { useState } from 'react'

import './Weather.scss'
import SearchForCity from '../searchForCity/SearchForCity'
import WeatherOfDay from '../weatherOfDay/WeatherOfDay'

const Weather = ({ onCityClick, isLoading, isError, todayWeather }) => {
	const [searchForPlaces, setSearchForPlaces] = useState(false)

	const handleSearchForPlacesClick = () => {
		setSearchForPlaces(true)
	}

	const handleCloseSearchCityClick = () => {
		setSearchForPlaces(false)
	}

	const handleCityClick = (cityId) => {
		setSearchForPlaces(false)
		onCityClick(cityId)
	}

	return (
		<section className='weather'>
			{searchForPlaces && (
				<SearchForCity
					onCloseClick={handleCloseSearchCityClick}
					onCityClick={handleCityClick}
				/>
			)}
			{!searchForPlaces && (
				<WeatherOfDay
					onSearchForPlacesClick={handleSearchForPlacesClick}
					isLoading={isLoading}
					isError={isError}
					todayWeather={todayWeather}
				/>
			)}
		</section>
	)
}

export default Weather
