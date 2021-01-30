import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { searchLocationByName } from '../../services/WeatherService'
import Weather from './Weather'

jest.mock('../../services/WeatherService')

describe('test Weather component', () => {
	const todayWeather = {
		id: 5321097730850816,
		weather_state_name: 'Light Cloud',
		weather_state_abbr: 'lc',
		applicable_date: '2020-11-04',
		min_temp: 4.655,
		max_temp: 10.87,
		the_temp: 10.335,
	}

	it('should display the weather of the day by default', () => {
		const { getByText } = render(
			<Weather isLoading={false} todayWeather={todayWeather} />
		)
		expect(getByText('Light Cloud')).toBeVisible()
	})

	it('should display the city search bar when clicking on the the search button', async () => {
		const { getByText, findByPlaceholderText } = render(
			<Weather isLoading={false} todayWeather={todayWeather} />
		)
		fireEvent.click(getByText('Search for places'))
		expect(await findByPlaceholderText('search location')).toBeVisible()
	})

	it('should send the city Id chosen by the user', async () => {
		searchLocationByName.mockImplementation((key, locationName) => {
			if (locationName === 'lon') {
				return [
					{
						title: 'London',
						location_type: 'City',
						woeid: 44418,
						latt_long: '51.506321,-0.12714',
					},
				]
			} else {
				return []
			}
		})
		const handleCityClick = jest.fn()
		const {
			getByText,
			findByPlaceholderText,
			getByDisplayValue,
			findByText,
			debug,
		} = render(
			<Weather
				isLoading={false}
				todayWeather={todayWeather}
				onCityClick={handleCityClick}
			/>
		)
		fireEvent.click(getByText('Search for places'))
		fireEvent.change(await findByPlaceholderText('search location'), {
			target: { value: 'lon' },
		})

		fireEvent.click(getByDisplayValue('Search'))
		fireEvent.click(await findByText('London'))

		expect(handleCityClick).toHaveBeenCalledWith(44418)

		searchLocationByName.mockClear()
	})
})
