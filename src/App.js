import React, { useState } from 'react'
import WeatherOfDay from './components/weatherOfDay/WeatherOfDay'
import SearchForCity from './components/searchForCity/SearchForCity'
import './App.scss'

function App() {
	const [searchForPlaces, setSearchForPlaces] = useState(false)
	const [locationId, setLocationId] = useState(615702)

	const handleSearchForPlacesClick = () => {
		setSearchForPlaces(true)
	}

	const handleCloseSearchCityClick = () => {
		setSearchForPlaces(false)
	}

	const handleCityClick = (cityId) => {
		setLocationId(cityId)
		setSearchForPlaces(false)
	}

	return (
		<main>
			<section className='weatherApp'>
				{searchForPlaces && (
					<SearchForCity
						onCloseClick={handleCloseSearchCityClick}
						onCityClick={handleCityClick}
					/>
				)}
				{!searchForPlaces && (
					<WeatherOfDay
						locationId={locationId}
						onSearchForPlacesClick={handleSearchForPlacesClick}
					/>
				)}
			</section>
		</main>
	)
}

export default App
