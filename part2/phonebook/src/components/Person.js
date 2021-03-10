import noteService from "../services/notes";

const Person = ({ person, persons, setPersons }) => {
    const removeFromList = id => {
        if (window.confirm(`Are you sure you want to delete ${person.name} ?`))
            noteService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
    }

    return (
        <li>{person.name} {person.number}
        <button type={"button"} onClick={() => removeFromList(person.id)}>X</button>
        </li>
    )
}

export default Person