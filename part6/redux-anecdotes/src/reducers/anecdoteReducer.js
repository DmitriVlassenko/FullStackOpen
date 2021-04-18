const mainReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.content]
    case 'VOTE':
      const id = action.data.id
      const anecdoteVote = state.find(v => v.id === id)
      const votedAnecdote = {
        ...anecdoteVote,
        votes: anecdoteVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    content
  }
}

export const anecdoteVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export default mainReducer