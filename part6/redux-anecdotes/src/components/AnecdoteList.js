// import {useDispatch, useSelector} from "react-redux";
import {connect} from "react-redux";
import {anecdoteVote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
    // const anecdotes = useSelector(state => state.anecdotes)
    // const filtered = useSelector(state => state.filter)
    // const dispatch = useDispatch()

    const vote = (anecdote) => {
        props.anecdoteVote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 10)
    }

    return (
        <div>
        {props.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(props.filtered.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filtered: state.filter
    }
}

export default connect(mapStateToProps, {anecdoteVote, setNotification})(AnecdoteList)