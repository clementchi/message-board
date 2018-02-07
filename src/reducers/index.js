// ./src/reducers/index.js
import { combineReducers } from 'redux';
import context from './contextReducer'

export default combineReducers({
  context: context
});