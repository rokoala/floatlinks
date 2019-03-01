import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as reducers from './ducks';

export const history = createBrowserHistory();

const rootReducers = combineReducers({
  router: connectRouter(history),
  ...reducers
});

export const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
);
