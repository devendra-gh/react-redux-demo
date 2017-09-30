import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
const middleware = [thunk];

let environment = (process.env.NODE_ENV).toString().trim().toLowerCase();
if (process.env.BROWSER && environment != 'production') {
  middleware.push(createLogger());
}

const persistedState = () => {
  try{
    const serializedState = localStorage. getItem('state');
    if(serializedState === null){
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err){
    return {};
  }
};

const configureStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );
};

export default configureStore;
