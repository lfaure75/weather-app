import React from 'react'
import { render } from '@testing-library/react'
import WeatherItem from './WeatherItem'

describe('test WeatherItem component', () => {
	it('should display a weather item with the date, the tempatures and an image', () => {
		const weatherItem = {
			weather_state_abbr: 'hc',
			created: '2020-12-26T12:40:05.291106Z',
			applicable_date: '2020-12-28',
			min_temp: 0.5700000000000001,
			max_temp: 4.975,
			the_temp: 4.505,
		}
		const { getByText, getByAltText } = render(
			<WeatherItem weatherItem={weatherItem} />
		)

		expect(getByText('Mon, 28 Dec')).toBeVisible()
		expect(getByText('5°C')).toBeVisible()
		expect(getByText('1°C')).toBeVisible()
		expect(getByAltText('Heavy Cloud')).toBeVisible()
	})
})
