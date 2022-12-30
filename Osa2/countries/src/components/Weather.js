import {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    const apikey = process.env.REACT_APP_API_KEY
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
        },[apikey, lat, lon])

    if (!weather) {
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>Loading...</p>
            </div>
        )
    } else {
    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weather.main.temp} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather' />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )}
}

export default Weather