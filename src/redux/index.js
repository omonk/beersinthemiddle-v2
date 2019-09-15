import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducer';

export const history = createBrowserHistory();

const enhancers = [];

const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

export default function configureStore(preLoadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preLoadedState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducer', () => {
        store.replaceReducer(createRootReducer(history));
      });
    }
  }

  return store;
}
