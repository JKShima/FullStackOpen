import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Filter from './components/Filter'

function App() {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleFilterChange = (event) => {
    const query = event.target.value
    setCountryFilter(query)
  }

  // Load data from server
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  //console.log('render ', countries.length, 'countries')
  //console.log(countries)

  const filteredCountries = countries.map(props => props.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
        ? countries.filter(props => props.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
        : countries

  return (
    <div>
      <Filter filter={countryFilter} onChange={handleFilterChange}/>
      <CountryList countries={filteredCountries}/>
    </div>
  )
}

export default App
