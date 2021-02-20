import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {

    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={course} />
            <Content part1={part1.name} part2={part2.name} part3={part3.name} ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
            <Total ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
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
            <Part part={props.part1} ex={props.ex1}/>
            <Part part={props.part2} ex={props.ex2}/>
            <Part part={props.part3} ex={props.ex3}/>
        </>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
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