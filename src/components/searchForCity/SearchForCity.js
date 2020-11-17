import React, { useState } from 'react'

import './SearchForCity.scss'
import Cities from './Cities'

const SearchForCity = ({ onCloseClick = () => {}, onCityClick = () => {} }) => {
	const [cityForSearch, setCityForSearch] = useState('')
	const [cityToSubmit, setCityToSubmit] = useState('')

	const handleCloseClick = () => {
		onCloseClick()
	}

	const handleCityClick = (cityId) => {
		onCityClick(cityId)
	}

	const handleSubmit = (event) => {
		setCityToSubmit(cityForSearch)
		event.preventDefault()
	}

	const handleCityChange = (event) => {
		setCityForSearch(event.target.value)
	}

	return (
		<>
			<div className='searchForPlaces'>
				<div className='searchForPlaces__close'>
					<button
						type='button'
						aria-label='close'
						onClick={handleCloseClick}
						className='searchForPlaces__close-button'
					/>
				</div>
				<form className='searchForPlaces__form' onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='search location'
						aria-label='search location'
						className='searchForPlaces__input'
						value={cityForSearch}
						onChange={handleCityChange}
					/>
					<input
						type='submit'
						value='Search'
						className='searchForPlaces__submit'
					/>
				</form>
			</div>
			<Cities cityToSearch={cityToSubmit} onCityClick={handleCityClick} />
		</>
	)
}

export default SearchForCity
