import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const random = () => (Math.floor(Math.random() * anecdotes.length))
    const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
    const [selected, setSelected] = useState(0)
    const [best, setBest] = useState(0)
    const Votes = () => {
        const copy = [...vote]
        copy[selected] += 1
        setVote(copy)

        if (copy[best] < copy[selected])
            setBest(selected)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <Button onClick={() => setSelected(random)} />
            <button onClick={Votes}>Like</button>
            <Best best={anecdotes[best]} likes={vote[best]}/>
        </div>
    )
}

const Best = ({best, likes}) => {
    return (
        <div>
            <h2>Anecdote with most votes</h2>
            <p>{best}</p>
            <p>{likes} likes</p>
        </div>
    )
}

const Button = ({onClick}) => <button onClick={onClick}>next anecdote</button>

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));