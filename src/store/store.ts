import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { attachInterceptors } from '../service/api';
import { hydrate } from '../store/auth/thunks';
import rootReducer from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

attachInterceptors(store);

store.dispatch<any>(hydrate());