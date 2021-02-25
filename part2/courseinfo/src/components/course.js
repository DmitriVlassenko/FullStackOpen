const Course = ({ course }) => {
    return (
        <div>
            <Header name={course}/>
            <Content content={course} />
            <Total total={course}/>
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

const Total = ({total}) => {
    const totalAmount = total.parts.reduce((sum, order) => sum + order.exercises, 0)
    return <h3>Total of {totalAmount} exercises</h3>
}

export default Course