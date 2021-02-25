const Course = ({ course }) => {
    return (
        <div>
            <Header name={course}/>
            <Content content={course} />
        </div>
    )
}

const Header = ({name}) => <h1>{name.name}</h1>

const Content = ({content}) => {
    return (
        <div>
            {content.parts.map((part) => <Part key={part.id} part={part}/>)}
        </div>
    )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

export default Course