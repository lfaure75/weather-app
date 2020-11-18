import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { searchLocationByName } from '../../services/WeatherService'
import Cities from './Cities'

jest.mock('../../services/WeatherService')

describe('Cities component', () => {
	let handleCityClickMock

	beforeEach(() => {
		handleCityClickMock = jest.fn()
		searchLocationByName.mockImplementation((key, locationName) => {
			if (key === 'searchLocation' && locationName === 'lon') {
				return [
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
				]
			} else {
				return []
			}
		})
	})

	afterEach(() => {
		handleCityClickMock.mockClear()
		searchLocationByName.mockClear()
	})

	it('should display a list of cities from the search criteria', async () => {
		const { findByText } = render(
			<Cities cityToSearch='lon' onCityClick={handleCityClickMock} />
		)

		expect(await findByText('London')).toBeVisible()
		expect(await findByText('Barcelona')).toBeVisible()
	})

	it('should return the id of the city on which the user has clicked on', async () => {
		const { findByText } = render(
			<Cities cityToSearch='lon' onCityClick={handleCityClickMock} />
		)

		fireEvent.click(await findByText('London'))

		expect(handleCityClickMock).toHaveBeenCalledWith(44418)
	})
})
