import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({course}) => (<h1>{course}</h1>)

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

const Part = ({part, ex}) => (<p>{part} {ex}</p>)

ReactDOM.render(<App />, document.getElementById('root'))