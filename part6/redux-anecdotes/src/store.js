import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from "./reducers/notificationReducer";
import mainReducer from "./reducers/anecdoteReducer";
import filterReducer from './reducers/filterReducer'

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