import './App.css';
import { useEffect, useState } from 'react'
import axios from "axios";
import Countries from "./components/countries";

const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch ] = useState('')
    const message = ['Search for a country']
    const filteredList = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))

useEffect(() => {
  axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
  })
}, [])

    function showButton(name) {
        setSearch(name)
    }

  return (
      <div className={"App"}>
          <p>find countries
          <input type="search" onChange={event => setSearch(event.target.value)}/>
          </p>
          <div className={"App-header"}>
          {filteredList.length > 10 ? message : <Countries filteredList={filteredList} showButton={showButton}/>}
          </div>
      </div>
  )
}

export default App;
