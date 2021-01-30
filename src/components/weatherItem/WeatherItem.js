import React from 'react'
import moment from 'moment'
import { getWeatherState } from '../../services/weatherHelper'
import './weatherItem.scss'

const WeatherItem = ({ weatherItem }) => {
	const {
		applicable_date,
		min_temp,
		max_temp,
		weather_state_abbr,
	} = weatherItem

	const { img: weatherImage, name: weatherName } = getWeatherState(
		weather_state_abbr
	)

	return (
		<article className='weatherItem'>
			<p className='weatherItem__date'>
				{moment(applicable_date, 'YYYY-MM-DD').format('ddd, D MMM')}
			</p>
			<img
				src={weatherImage}
				alt={weatherName}
				className='weatherItem__image'
			/>
			<div className='weatherItem__temps'>
				<p className='weatherItem__temp-min'>{Math.round(min_temp)}°C</p>
				<p className='weatherItem__temp-max'>{Math.round(max_temp)}°C</p>
			</div>
		</article>
	)
}

export default WeatherItem
