import anecdoteService from '../services/anecdotes'

const mainReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newJoke = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newJoke
    })
  }
}

export const anecdoteVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const jokes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: jokes,
    })
  }
}

export default mainReducer