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
            <h3>Good = {good} <br/> Neutral = {neutral} <br/> Bad = {bad}</h3>
        </div>
        )
}

const Statistics = ({all, average, positive}) => {
    if (all) {
        return (
            <div>
                <h3> all = {all} <br/> average = {average} <br/> positive = {positive}%</h3>
            </div>
        )
    }
    else return (
        <h3>all = {'0'} <br/> average = {'0'} <br/> positive = {'0'}</h3>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = (good * 100) / all

    return (
        <div className={"container"}>
            <h1>Give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text={"Good"} />
            <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
            <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
            <h2>Statistics:</h2>
            <Display good={good} neutral={neutral} bad={bad}/>
            <Statistics all={all} average={average} positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))