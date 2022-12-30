import {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  },[])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleShowCountry = (event) => {
    setFilter(event.target.id)
  }

  const countriesToShow = newFilter
    ? countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    : countries

  return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} handleClick={handleShowCountry} />
    </div>
  )
}

export default App;
