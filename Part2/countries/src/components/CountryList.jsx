import CountryData from "./CountryData"
import FilteredCountries from './FilteredCountries'

const CountryList = ({countries}) => {

  if(countries.length === 1){
    return (
      <CountryData country = {countries[0]}/>
    )
  }
  else if(countries.length > 10)
    return (
      <p>Too many matches, specify another filter</p>
    )
  else{
    return (
      countries.map(props => (
        <FilteredCountries key={props.name.common} country = {props}/>
      ))
    )
  }
}

export default CountryList