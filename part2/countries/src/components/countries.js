import Country from "./country";

const Countries = ({filteredList, showButton}) => {

    return (
        <div>
            {filteredList.length === 1 ?
                <Country filteredList={filteredList}/>
                :
                (filteredList.map(country => <p key={country.name}>{country.name}
                <button type={"button"} onClick={() => showButton(country.name)}>show</button>
                </p>))}
        </div>
    )
}

export default Countries