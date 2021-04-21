let timer = 0

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
        clearTimeout(timer)
        timer = setTimeout(() => {
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