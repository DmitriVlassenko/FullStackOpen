import './App.css';
import React, { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ number, setNumber ] = useState('')

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: number,
            date: new Date().toISOString(),
            id: persons.length + 1,
        }
        if (persons.find((person) => person.name === nameObject.name)) {
            alert(`${nameObject.name} is already added to phonebook`)
            setNewName('')
        }
        else if (persons.find((person) => person.number === nameObject.number)) {
            alert(`${nameObject.number} is already added to phonebook`)
            setNumber('')
        }
        else if (!nameObject.name) {
            alert(`You haven't added anything`)
        }
        else {
            setPersons(persons.concat(nameObject))
            setNewName('')
            setNumber('')
        }
    }

    const nameChange = (event) => {
        setNewName(event.target.value)
    }

    const phoneNumber = (event) => {
      setNumber(event.target.value)
    }

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            name: <input value={newName} onChange={nameChange}/>
          </div>
          <div>
              number: <input value={number} onChange={phoneNumber}/>
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
