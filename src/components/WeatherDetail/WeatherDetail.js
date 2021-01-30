import React from 'react'
import Loader from 'react-loader-spinner'
import WeatherItem from '../weatherItem/WeatherItem'
import './WeatherDetail.scss'

const WeatherDetail = ({ weatherOfTheWeek, isLoading, isError }) => {
	return (
		<section className='weatherDetail'>
			{isLoading && (
				<div
					className='weatherDetail__spinner'
					data-testid='weatherDetail__spinner'
				>
					<Loader type='Circles' color='#00BFFF' height={80} width={80} />
				</div>
			)}
			{!isLoading && !isError && (
				<div className='weatherDetail__items'>
					{weatherOfTheWeek.map((weatherItem) => (
						<WeatherItem key={weatherItem.id} weatherItem={weatherItem} />
					))}
				</div>
			)}
		</section>
	)
}

export default WeatherDetail
