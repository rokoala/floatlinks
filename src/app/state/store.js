import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as reducers from './ducks';

export const history = createBrowserHistory();

export const Store = createStore(
  combineReducers({
    router: connectRouter(history),
    reducers
  }),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);
