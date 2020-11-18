import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useQuery } from 'react-query'
import App from './App'

jest.mock('react-query')

const parisConsolidatedWeather = {
	consolidated_weather: [
		{
			weather_state_name: 'Light Cloud',
			weather_state_abbr: 'lc',
			the_temp: 10.335,
		},
	],
}

const londonConsolidatedWeather = {
	consolidated_weather: [
		{
			weather_state_name: 'Thunderstorm',
			weather_state_abbr: 't',
			the_temp: 10.335,
		},
	],
}

const londonLocationSearch = [
	{
		title: 'London',
		location_type: 'City',
		woeid: 44418,
		latt_long: '51.506321,-0.12714',
	},
	{
		title: 'Barcelona',
		location_type: 'City',
		woeid: 753692,
		latt_long: '41.385578,2.168740',
	},
	{
		title: 'Long Beach',
		location_type: 'City',
		woeid: 2441472,
		latt_long: '33.766720,-118.192398',
	},
]

describe('wea&therApp component', () => {
	afterEach(() => {
		useQuery.mockClear()
	})

	it('should display the weather of Paris by default', async () => {
		useQuery.mockReturnValue({
			isLoading: false,
			data: parisConsolidatedWeather,
		})
		const { findByText } = render(<App />)

		expect(await findByText('Light Cloud')).toBeVisible()
	})

	it('should display the weather of the city selected', async () => {
		useQuery.mockImplementation((queryKey) => {
			if (queryKey[0] === 'weatherOfDay' && queryKey[1] === 615702) {
				return {
					isLoading: false,
					data: parisConsolidatedWeather,
				}
			} else if (queryKey[0] === 'weatherOfDay' && queryKey[1] === 44418) {
				return {
					isLoading: false,
					data: londonConsolidatedWeather,
				}
			} else if (queryKey[0] === 'searchLocation' && queryKey[1] === 'lon') {
				return {
					isLoading: false,
					data: londonLocationSearch,
				}
			} else if (queryKey[0] === 'searchLocation' && queryKey[1] === '') {
				return {
					isLoading: false,
					data: [],
				}
			}
		})
		const {
			getByText,
			findByPlaceholderText,
			getByDisplayValue,
			findByText,
		} = render(<App />)

		fireEvent.click(getByText('Search for places'))

		fireEvent.change(await findByPlaceholderText('search location'), {
			target: { value: 'lon' },
		})

		fireEvent.click(getByDisplayValue('Search'))

		expect(await findByText('London')).toBeVisible()

		fireEvent.click(await findByText('London'))

		expect(await findByText('Thunderstorm')).toBeVisible()
	})
})
