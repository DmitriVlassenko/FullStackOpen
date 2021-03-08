import Weather from "./weather";

const Country = ({filteredList}) => {
    return (
        <div>
            <h1>{filteredList[0].name}</h1>
            <h4>Capital {filteredList[0].capital}</h4>
            <h4>Population {filteredList[0].population}</h4>
            <h3>Languages</h3>
            <ul style={{padding: 0}}>
                {filteredList[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img className={"photo"} src={filteredList[0].flag} alt="flag"/>
            <Weather capital={filteredList[0].capital}/>
        </div>
    )
}

export default Country