import React from 'react'

const Notification = ({ message }) => {
    const style = {
        color: 'black',
        backgroundColor: 'lightgrey',
        border: '1px solid black',
        padding: '5px',
        margin: '0px 0px 10px 0px',
    }
    if (message === null) {
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification