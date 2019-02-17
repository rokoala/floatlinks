import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Reducers } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export const Store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
