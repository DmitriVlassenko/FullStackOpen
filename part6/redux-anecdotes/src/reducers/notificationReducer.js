const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: ''
            })
        }, 500 * time)
        dispatch({
            type: 'SET_NOTIFICATION',
            data: message
        })
    }
}

export default notificationReducer