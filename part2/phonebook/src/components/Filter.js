const Filter = (props) => {
    return (
        <div>
            <h3>filter shown with
            <input type={"text"} placeholder={"search"} value={props.search} onChange={props.inputFilter}/>
            </h3>
        </div>
)
}

export default Filter


// {person.filter((person) => {
//         if (person.name.toLowerCase().includes(search.toLowerCase()) || person.number.toLowerCase().includes(search.toLowerCase()))
