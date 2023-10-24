import CountryWeather from "./CountryWeather"

const CountryData = ({country}) => {
    //console.log('Country Data')
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <h2>Flag</h2>
            <img src={country.flags.png} alt={country.name.common}/>
            <CountryWeather country = {country}/>
        </div>
    )
}

export default CountryData