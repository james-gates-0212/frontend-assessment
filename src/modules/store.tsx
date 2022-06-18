import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import StudentActions from './student/studentActions';
import students from './student/studentReducers';

let store;

function configureStore(preloadedState?) {
  const middlewares = [
    thunkMiddleware
  ].filter(Boolean);

  store = createStore(
    combineReducers({
      students,
    }),
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  store.dispatch(StudentActions.doInit());

  return store;
}

export default configureStore;
