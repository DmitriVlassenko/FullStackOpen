import './App.css';
import React, { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const filteredList = search === '' ? persons : persons.filter((person) =>
      ((person.name.toLowerCase().includes(search.toLowerCase())) || (person.number.includes(search))))

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
        else if (!nameObject.name || !nameObject.number) {
            alert(`Fill name and phone number please`)
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

    const inputFilter = (event) => {
      setSearch(event.target.value)
    }

  return (
      <div>
          <h2>Phonebook</h2>
          <Filter search={search} inputFilter={inputFilter}/>
          <h3>add a new</h3>
          <PersonForm addName={addName} newName={newName} number={number} nameChange={nameChange} phoneNumber={phoneNumber} />
          <h3>Numbers</h3>
          <Persons persons={filteredList}/>
      </div>
  )
}

export default App;