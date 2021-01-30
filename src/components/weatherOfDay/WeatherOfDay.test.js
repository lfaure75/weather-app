import React from 'react'
import { render } from '@testing-library/react'
import { useQuery } from 'react-query'
import WeatherOfDay from './WeatherOfDay'

describe('test weatherOfDay component', () => {
	it('should display a spinner in case the api is still loading', () => {
		const { getByTestId } = render(<WeatherOfDay isLoading={true} />)
		expect(getByTestId('weatherOfDay__spinner')).toBeVisible()
	})

	it('should display the weather data when provided', () => {
		const todayWeather = {
			id: 5321097730850816,
			weather_state_name: 'Light Cloud',
			weather_state_abbr: 'lc',
			wind_direction_compass: 'NNE',
			created: '2020-11-04T09:40:05.753718Z',
			applicable_date: '2020-11-04',
			min_temp: 4.655,
			max_temp: 10.87,
			the_temp: 10.335,
			wind_speed: 2.926770203913147,
			wind_direction: 25.499999999999996,
			air_pressure: 1032.0,
			humidity: 75,
			visibility: 13.743177344309235,
			predictability: 70,
		}
		const { getByAltText, getByText } = render(
			<WeatherOfDay isLoading={false} todayWeather={todayWeather} />
		)
		expect(getByAltText('Light Cloud')).toBeVisible()
		expect(getByText('10')).toBeVisible()
		expect(getByText('Light Cloud')).toBeVisible()
	})
})
