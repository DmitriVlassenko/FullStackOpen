import './App.css';
import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import noteService from "./services/notes"

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const filteredList = search === '' ? persons : persons.filter((person) =>
      ((person.name.toLowerCase().includes(search.toLowerCase())) || (person.number.includes(search))))

    useEffect(() => {
        noteService.getAll().then(response => setPersons(response))
    }, [])

    const addName = (event) => {
        event.preventDefault()
        const nameObject = {
            name: newName,
            number: number,
            date: new Date().toISOString(),
            id: persons.length + 1,
        }
        const duplicate = persons.find(person => person.name === nameObject.name)
        if (duplicate) {
            if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one ?`)) {
                noteService.update(duplicate.id, nameObject).then(response => {
                    setPersons(persons.map(person => person.id === duplicate.id ? response : person))
                    setNewName('')
                    setNumber('')
                })
            }
        }
        else if (persons.find((person) => person.number === nameObject.number)) {
            alert(`${nameObject.number} is already added to phonebook`)
            setNumber('')
        }
        else if (!nameObject.name || !nameObject.number) {
            alert(`Fill name and phone number please`)
        }
        else {
            noteService.create(nameObject).then(() => {
                setPersons(persons.concat(nameObject))
                setNewName('')
                setNumber('')
            })
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
      <div className={"App"}>
          <h2>Phonebook</h2>
          <Filter search={search} inputFilter={inputFilter}/>
          <h3>add a new</h3>
          <PersonForm addName={addName} newName={newName} number={number} nameChange={nameChange} phoneNumber={phoneNumber} />
          <h3>Numbers</h3>
          <Persons persons={filteredList} setPersons={setPersons}/>
      </div>
  )
}

export default App;