import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';

const CountryPage = ({data}) => {
  console.log(data)
  return (
    <div>
      <h1>{data.name}</h1>
      <p>Capital: {data.capital}</p>
      <p>Population: {data.population}</p>
      <h2>Official languages</h2>
      <ul>
        {data.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={data.flag} alt="flag" height="100px"></img>
    </div>
  )
}

const CountryList = ({data, filter, setFilter}) => {
  const countries = data.filter((country) => country.name.includes(filter))
  if (countries.length === 0) {
    return <p>Found no matches</p>
  } else if (countries.length === 1) {
    return <CountryPage data={countries[0]} />
  } else if (countries.length <= 10) {
    return (
      <ol>
        {countries.map((country) => (<li key={country.name}>
          {country.name} <button onClick={() => setFilter(country.name)}>Show</button>
        </li>))}
      </ol>
    )
  } else {
    return <p>Too many cooks! A family is like a stew, everyone adds an extra scoop</p>
  }
}

const App = () => {
  const [ countryData, setCountryData ] = useState([])
  const [ countryFilter, setCountryFilter ] = useState("Fin")

  useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('loaded data')
          setCountryData(response.data)
        })
    }, [])
  
  return (
    <div className="App">
      <div>
        Search country: <input value={countryFilter}
                    onChange={(event) => setCountryFilter(event.target.value)} />
      </div>
      <CountryList data={countryData} filter={countryFilter} setFilter={setCountryFilter} />
    </div>
  )
}

export default App;
