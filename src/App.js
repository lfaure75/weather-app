import React, { useState } from 'react'
import './App.scss'
import { useQuery } from 'react-query'
import { getWeatherByLocationId } from './services/WeatherService'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import Weather from './components/Weather/Weather'

function App() {
	const [locationId, setLocationId] = useState(615702)

	const { isLoading, isError, data } = useQuery(
		['weatherOfDay', locationId],
		getWeatherByLocationId,
		{
			refetchOnWindowFocus: false,
		}
	)
	const todayWeather = data?.consolidated_weather[0]
	const weatherOfTheWeek = data?.consolidated_weather.slice(1)

	const handleCityClick = (cityId) => {
		setLocationId(cityId)
	}

	return (
		<main className='weatherApp'>
			<Weather
				isLoading={isLoading}
				isError={isError}
				todayWeather={todayWeather}
				onCityClick={handleCityClick}
			/>
			<WeatherDetail
				isLoading={isLoading}
				isError={isError}
				weatherOfTheWeek={weatherOfTheWeek}
			/>
		</main>
	)
}

export default App
