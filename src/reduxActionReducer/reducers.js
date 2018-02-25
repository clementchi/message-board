// ./src/reducers/index.js
import { combineReducers } from 'redux';
import context from './contextActionReducer';
import events from './calendarActionReducer';
import trip from './tripActionReducer';
import weather from './weatherActionReducer';
import user from './userActionReducer';
import airQuality from './airQualityActionReducer';
import bartSchedule from './bartScheduleActionReducer';
import earthquake from './earthquakeActionReducer';

export default combineReducers({
  user: user,
  context: context,
  events: events,
  trip: trip,
  weather: weather,
  airQuality: airQuality,
  bartSchedule: bartSchedule,
  earthquake: earthquake
});