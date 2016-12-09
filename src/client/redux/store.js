import { createStore } from 'redux';
import reducer from './reducer';
import middleware from './middleware';


export default configureStore = initialState => createStore(
  reducer,
  initialState,
  middleware
);
