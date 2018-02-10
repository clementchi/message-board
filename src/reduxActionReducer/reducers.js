// ./src/reducers/index.js
import { combineReducers } from 'redux';
import context from './contextActionReducer'
import events from './calendarActionReducer'
import trip from './tripActionReducer'
import weather from './weatherActionReducer'

export default combineReducers({
  context: context,
  events: events,
  trip: trip,
  weather: weather
});