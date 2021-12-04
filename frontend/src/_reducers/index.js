import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { flight } from './flight.reducer';
import { airport } from './airport.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  flight,
  airport
});

export default rootReducer;