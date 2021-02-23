import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistics = (props) => {
    if (props.all) {
        return (
            <table>
                <tbody>
                    <Statistic text={"Good"} value={props.good}/>
                    <Statistic text={"Neutral"} value={props.neutral}/>
                    <Statistic text={"Bad"} value={props.bad}/>
                    <Statistic text={"All"} value={props.all}/>
                    <Statistic text={"Average"} value={props.average}/>
                    <Statistic text={"Positive"} value={props.positive}/>
                </tbody>
            </table>
        )
    }
    else return (
        <h3>No feedback given</h3>
    )
}

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {text === "Positive" ? "%" : ""}</td>
        </tr>
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
        <div>
            <h1>Give feedback</h1>
            <Button handleClick={() => setGood(good + 1)} text={"Good"} />
            <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
            <Button handleClick={() => setBad(bad + 1)} text={"Bad"} />
            <h2>Statistics:</h2>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))