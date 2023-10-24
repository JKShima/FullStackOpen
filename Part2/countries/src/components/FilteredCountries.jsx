import {useState} from 'react'
import CountryData from './CountryData'

const FilteredCountries = ({country}) => {
    const [showCountry, setShowCountry] = useState(false)

    const handleShowClick = () => {
        //console.log(country.name.common)
        setShowCountry(!showCountry)
    }

    return (
        <div>
            {country.name.common}
            <button onClick = {handleShowClick}>show</button>
            {showCountry === true && <CountryData country = {country} />}
        </div>
    )
}

export default FilteredCountries