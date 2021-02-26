import './App.css';
import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [ persons, setPersons ] = useState([{ name: 'Arto Hellas'}])
  const [ newName, setNewName ] = useState('')

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            date: new Date().toISOString(),
            id: persons.length + 1,
        }
        if (persons.find((person) => person.name === nameObject.name)) {
            alert(`${nameObject.name} is already added to phonebook`)
            setNewName('')
        }
        else {
            setPersons(persons.concat(nameObject))
            setNewName('')
        }
    }

    const nameChange = (event) => {
        setNewName(event.target.value)
    }

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={nameChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
            {persons.map((person) => <Person key={person.name} person={person}/>)}
        </ul>
      </div>
  )
}

export default App;
