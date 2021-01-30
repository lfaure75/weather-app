import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

import { getWeatherByLocationId } from './services/WeatherService'

jest.mock('./services/WeatherService')

describe('wea&therApp component', () => {
	it('should display the weather of the day and for the next days', async () => {
		getWeatherByLocationId.mockReturnValue({
			consolidated_weather: [
				{
					id: 5841788863512576,
					weather_state_name: 'Heavy Rain',
					weather_state_abbr: 'hr',
					wind_direction_compass: 'SW',
					created: '2021-01-30T12:40:05.737466Z',
					applicable_date: '2021-01-30',
					min_temp: 7.529999999999999,
					max_temp: 12.32,
					the_temp: 12.575,
					wind_speed: 7.173781474492961,
					wind_direction: 230.93291693080803,
					air_pressure: 995.0,
					humidity: 79,
					visibility: 11.634243517855722,
					predictability: 77,
				},
				{
					id: 4888552212004864,
					weather_state_name: 'Light Rain',
					weather_state_abbr: 'lr',
					wind_direction_compass: 'ESE',
					created: '2021-01-30T12:40:09.484286Z',
					applicable_date: '2021-01-31',
					min_temp: 3.965,
					max_temp: 9.385000000000002,
					the_temp: 7.295,
					wind_speed: 3.5791185974124446,
					wind_direction: 110.23119557990097,
					air_pressure: 1000.0,
					humidity: 83,
					visibility: 9.891608009226118,
					predictability: 75,
				},
				{
					id: 5863240748761088,
					weather_state_name: 'Heavy Rain',
					weather_state_abbr: 'hr',
					wind_direction_compass: 'W',
					created: '2021-01-30T12:40:11.888871Z',
					applicable_date: '2021-02-01',
					min_temp: 7.395,
					max_temp: 10.455,
					the_temp: 9.415,
					wind_speed: 4.86613742353721,
					wind_direction: 266.8727321124308,
					air_pressure: 996.5,
					humidity: 91,
					visibility: 7.225614908931838,
					predictability: 77,
				},
			],
		})

		const { findByText } = render(<App />)

		expect(await findByText('Heavy Rain')).toBeVisible()
		expect(await findByText('Sun, 31 Jan')).toBeVisible()
		expect(await findByText('Mon, 1 Feb')).toBeVisible()

		getWeatherByLocationId.mockClear()
	})
})
