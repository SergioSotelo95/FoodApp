// import {createStore} from 'redux';
// import rootReducer from '../reducers';


// const store = createStore(rootReducer)


// export default store


import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk))

export default store;