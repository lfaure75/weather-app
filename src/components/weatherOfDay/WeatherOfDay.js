import React from 'react';
import clear from '../../static/images/Clear.png'
import hail from '../../static/images/Hail.png'
import heavyCloud from '../../static/images/HeavyCloud.png'
import heavyRain from '../../static/images/HeavyRain.png'
import lightCloud from '../../static/images/LightCloud.png'
import lightRain from '../../static/images/LightRain.png'
import shower from '../../static/images/Shower.png'
import sleet from '../../static/images/Sleet.png'
import snow from '../../static/images/Snow.png'
import thunderstorm from '../../static/images/Thunderstorm.png'

import { useQuery } from 'react-query'
import Loader from 'react-loader-spinner'

import './WeatherOfDay.scss'
import {getWeatherFromParis} from "../../services/WeatherService";

const WeatherOfDay = () => {

    const weatherState = {
        c: {img: clear, name: 'Clear'},
        lc: {img: lightCloud, name: 'Light Cloud'},
        hc: {img: heavyCloud, name: 'Heavy Cloud'},
        s: {img: shower, name: 'Showers'},
        lr: {img: lightRain, name: 'Light Rain'},
        hr: {img: heavyRain, name: 'Heavy Rain'},
        t: {img: thunderstorm, name: 'Thunderstorm'},
        h: {img: hail, name: 'Hail'},
        sl: {img: sleet, name: 'Sleet'},
        sn: {img: snow, name: 'Snow'}
    }

    const { isLoading, isError, data } = useQuery('weatherOfDay', getWeatherFromParis)
    const {weather_state_abbr, the_temp} = (data && data.consolidated_weather && data.consolidated_weather[0]) || {}

    return (
        <article className='weatherOfDay'>
            {isLoading &&
                <div className='weatherOfDay__spinner'>
                    <Loader type="Circles" color="#00BFFF" height={80} width={80} />
                </div>
            }
            {!isLoading && !isError &&
                <>
                    <img src={weatherState[weather_state_abbr].img} alt='weatherState.weather_state_abbr.name' className='weatherOfDay__img' />
                    <p className='weatherOfDay__temp'>{Math.round(the_temp)}<span className='weatherOfDay__temp-symbol'>°C</span></p>
                    <p className='weatherOfDay__conditions'>{weatherState[weather_state_abbr].name}</p>
                </>
            }
        </article>
    )
}

export default WeatherOfDay