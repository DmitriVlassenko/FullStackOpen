import React from 'react'
import {filterAnecdote} from "../reducers/filterReducer";
// import {useDispatch} from "react-redux";
import {connect} from "react-redux";

const Filter = (props) => {
    // const dispatch = useDispatch()
    const handleChange = (event) => {
        const filter = event.target.value
        props.filterAnecdote(filter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default connect(null, {filterAnecdote})(Filter)