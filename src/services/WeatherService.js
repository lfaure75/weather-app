export const getWeatherFromParis = () =>
	fetch(
		'https://cors-anywhere.herokuapp.com/www.metaweather.com/api/location/615702/'
	).then((res) => res.json())
