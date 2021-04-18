const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data
        default:
            return state
    }
}

export const filterAnecdote = (content) => {
    return {
        type: 'FILTER',
        data: content
    }
}

export default filterReducer