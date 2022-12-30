import Weather from "./Weather"

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>capital {country.capital}</td>
                    </tr>
                    <tr>
                        <td>area {country.area}</td>
                    </tr>
                </tbody>
            </table>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(language => 
                    <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt='flag' width='160' />
            <Weather country={country} />
        </div>
    )
}

const Countries = ({countriesToShow, handleClick}) => {
    return (
        <div>
            {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}
            {countriesToShow.length <= 10 && countriesToShow.length > 1 && countriesToShow.map(country =>
                <div key={country.name.common}>{country.name.common}
                    <button onClick={handleClick} id={country.name.common}>show</button>
                </div>)
            }
            {countriesToShow.length === 1 && countriesToShow.map(country =>
                <div key={country.name.common}>
                    <Country country={country} />
                </div>
            )}
        </div>
    )
}

export default Countries