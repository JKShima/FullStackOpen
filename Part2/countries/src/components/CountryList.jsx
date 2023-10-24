import CountryData from "./CountryData"

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
        <div>
          {countries.map(props => (
              <div key={props.name.common}>
                  {props.name.common}
              </div>
          ))}
        </div>
      )
    }
  }

export default CountryList