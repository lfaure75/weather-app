export const getWeatherByLocationId = (key, locationId) => {
	console.log('locationId=======================', locationId)

	// https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location

	return fetch(
		`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/${locationId}/`
	).then((res) => res.json())
}

export const searchLocationByName = (key, locationName) => {
	if (locationName === '') return []

	return fetch(
		`https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/search/?query=${locationName}`
	).then((res) => res.json())
}
