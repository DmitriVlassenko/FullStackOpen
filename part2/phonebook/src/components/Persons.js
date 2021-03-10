import Person from "./Person";

const Persons = ({persons, setPersons}) => {
    return (
        <div>
            <ul>
                {persons.map((person) => <Person key={person.name} person={person} persons={persons} setPersons={setPersons}/>)}
            </ul>
        </div>
    )
}

export default Persons