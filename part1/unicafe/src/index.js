import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Display = ({good, neutral, bad}) => {
    return (
        <div>
            <h3>Good = {good}</h3>
            <h3>Neutral = {neutral}</h3>
            <h3>Bad = {bad}</h3>
        </div>
        )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div className={"container"}>
            <h1>Give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text={"Good"} />
            <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
            <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
            <h2>Statistics:</h2>
            <Display good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)