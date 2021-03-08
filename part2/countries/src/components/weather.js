import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState('')
    const api_key = process.env.REACT_APP_API_KEY
    const api = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
    useEffect(() => {
        axios.get(api).then(response => {
            setWeather(response.data.current)
        })
    }, [api])

    return (
        <div>
            <h2>Weather in {capital} </h2>
            <p>temperature: {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt="weather icon"/>
            <p>wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
        </div>
    )
}

export default Weather