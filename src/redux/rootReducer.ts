import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';

const reducers = combineReducers({
  user: userReducer,
});

export default reducers;
