import Country from "./country";

const Countries = (props) => {

    return (
        <div>
            {props.filteredList.length === 1 ?
                <Country filteredList={props.filteredList}/>
                :
                (props.filteredList.map(country => <p key={country.name}>{country.name}
                <button type={"button"} onClick={() => props.showButton(country.name)}>show</button>
                </p>))}
        </div>
    )
}

export default Countries