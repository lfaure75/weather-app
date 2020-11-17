import React from 'react'

import './SearchForCity.scss'
import { useQuery } from 'react-query'
import { searchLocationByName } from '../../services/WeatherService'

const Cities = ({ cityToSearch = '', onCityClick = () => {} }) => {
	const { isError, data: cities } = useQuery(
		['searchLocation', cityToSearch],
		searchLocationByName,
		{
			refetchOnWindowFocus: false,
		}
	)

	const handleClick = (cityId) => {
		onCityClick(cityId)
	}

	return (
		<div className='searchForPlaces__list'>
			{!isError &&
				cities &&
				cities.map((city) => (
					<button
						key={city.woeid}
						className='searchForPlaces__city'
						onClick={() => handleClick(city.woeid)}
					>
						{city.title}
					</button>
				))}
		</div>
	)
}

export default Cities
