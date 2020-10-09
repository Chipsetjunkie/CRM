import {combineReducers} from 'redux';
import {AuthReducer} from './auth';
import {ErrorReducer} from './error';
import {EmployeeReducer} from './profile';

export const rootReducer = combineReducers({
  AuthReducer,
  ErrorReducer,
  EmployeeReducer
})
