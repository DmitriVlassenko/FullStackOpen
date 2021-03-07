const Country = (props) => {
    return (
        <div>
            <h1>{props.filteredList[0].name}</h1>
            <h4>Capital {props.filteredList[0].capital}</h4>
            <h4>Population {props.filteredList[0].population}</h4>
            <h3>Languages</h3>
            <ul style={{padding: 0}}>
                {props.filteredList[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img className={"photo"} src={props.filteredList[0].flag} alt="flag"/>
        </div>
    )
}

export default Country