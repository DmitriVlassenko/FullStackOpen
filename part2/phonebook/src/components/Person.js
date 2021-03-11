import noteService from "../services/notes";

const Person = ({ person, persons, setPersons, setMessage }) => {
    const removeFromList = id => {
        if (window.confirm(`Are you sure you want to delete ${person.name} ?`))
            noteService.deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    setMessage(`${person.name} was already deleted`)
                })
    }

    return (
        <li>{person.name} {person.number}
        <button type={"button"} onClick={() => removeFromList(person.id)}>X</button>
        </li>
    )
}

export default Person