const initialState = { message: '' }

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return { message: '' }
        default:
            return state
    }
}

export const notification = (message) => {
    return {
        type: 'NOTIFICATION',
        data: { message }
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION',
    }
}

export default notificationReducer