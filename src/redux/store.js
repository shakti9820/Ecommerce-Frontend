// store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import productsReducer from './reducer/productsReducer'; 
import userReducer from './reducer/userReducer';


const rootReducer = combineReducers({
  products: productsReducer, 
  user: userReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // Apply middleware (e.g., Redux Thunk)
);

export default store;
