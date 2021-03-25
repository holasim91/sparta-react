import {createStore, combineReducers, applyMiddleware} from 'redux'
import todos from './modules/todos'
import { composeWithDevTools } from 'redux-devtools-extension'; 
import thunk from "redux-thunk";
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

const middlewares = [thunk];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
const rootReducer = combineReducers({todos})
const store = createStore(rootReducer,enhancer)

export default store;

