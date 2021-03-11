import Person from "./Person";

const Persons = ({persons, setPersons, setMessage}) => {
    return (
        <div>
            <ul>
                {persons.map((person) => <Person key={person.name} person={person} persons={persons} setPersons={setPersons} setMessage={setMessage}/>)}
            </ul>
        </div>
    )
}

export default Persons