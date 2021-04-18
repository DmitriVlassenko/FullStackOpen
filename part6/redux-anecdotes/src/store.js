import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notificationReducer"
import mainReducer, {initializeAnecdotes} from "./reducers/anecdoteReducer"
import filterReducer from './reducers/filterReducer'
import anecdoteService from "./services/anecdotes";

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes))
)

const reducer = combineReducers({
    anecdotes: mainReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools()
)

export default store