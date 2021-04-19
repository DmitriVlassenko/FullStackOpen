import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notificationReducer"
import mainReducer, {initializeAnecdotes} from "./reducers/anecdoteReducer"
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: mainReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store