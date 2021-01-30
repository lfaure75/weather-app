import React from 'react'
import { render } from '@testing-library/react'
import WeatherDetail from './WeatherDetail'

describe('Test WeatherDetail component', () => {
	it('should display a spinner, if the api is still loading', () => {
		const { getByTestId } = render(<WeatherDetail isLoading={true} />)
		expect(getByTestId('weatherDetail__spinner')).toBeVisible()
	})

	it('should display the list of weather items if any', () => {
		const weatherOfTheWeek = [
			{
				id: 5200124406923264,
				weather_state_name: 'Heavy Cloud',
				weather_state_abbr: 'hc',
				wind_direction_compass: 'SW',
				created: '2020-12-26T12:40:05.291106Z',
				applicable_date: '2020-12-27',
				min_temp: 0.5700000000000001,
				max_temp: 4.975,
			},
			{
				id: 5392436097449984,
				weather_state_name: 'Heavy Rain',
				weather_state_abbr: 'hr',
				wind_direction_compass: 'SSW',
				created: '2020-12-26T12:40:08.372812Z',
				applicable_date: '2020-12-28',
				min_temp: 4.505,
				max_temp: 7.8100000000000005,
			},
		]
		const { queryByTestId, getByText } = render(
			<WeatherDetail weatherOfTheWeek={weatherOfTheWeek} />
		)
		expect(queryByTestId('weatherDetail__spinner')).not.toBeInTheDocument()
		expect(getByText('Sun, 27 Dec')).toBeVisible()
		expect(getByText('Mon, 28 Dec')).toBeVisible()
	})
})
