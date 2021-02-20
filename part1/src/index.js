import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {

    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0].exercises} ex={props.parts[0].name}/>
            <Part part={props.parts[1].exercises} ex={props.parts[1].name}/>
            <Part part={props.parts[2].exercises} ex={props.parts[2].name}/>

        </>
    )
}

const Total = (props) => {
    const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    return (
        <p>Number of exercises {sum} </p>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.ex}</p>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))