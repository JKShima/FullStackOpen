import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryWeather = ({country}) => {
    //console.log('Country Data')
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY
        axios
          .get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.capital}&aqi=no`)
          .then(response => {
            setWeather(response.data)
            //console.log(response.data)
          })
      }, [])

    //console.log(weather)

    if (weather === null) return null

    return (
        <div>
            <h2>{`Weather in ${country.capital}`}</h2>
            <p>Temperature: {weather.current && weather.current.temp_c}</p>
            <img src={weather.current && weather.current.condition.icon} alt={weather.location.name}/>
            <p>Wind: {weather.current && weather.current.wind_kph} km/h</p>
        </div>
    )
}

export default CountryWeather
