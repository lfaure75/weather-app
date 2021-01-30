import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { searchLocationByName } from '../../services/WeatherService'
import './SearchForCity'
import SearchForCity from './SearchForCity'

jest.mock('../../services/WeatherService')

describe('SearchForCity component', () => {
	it('should search and display the list of city when clicking on the button', async () => {
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
		const { getByLabelText, getByDisplayValue, findByText } = render(
			<SearchForCity />
		)
		fireEvent.change(getByLabelText('search location'), {
			target: { value: 'lon' },
		})

		fireEvent.click(getByDisplayValue('Search'))

		expect(await findByText('London')).toBeVisible()
		expect(await findByText('Barcelona')).toBeVisible()

		searchLocationByName.mockClear()
	})
})
