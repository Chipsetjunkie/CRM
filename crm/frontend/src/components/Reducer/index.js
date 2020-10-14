import {combineReducers} from 'redux';
import {AuthReducer} from './auth';
import {ErrorReducer} from './error';
import {EmployeeReducer} from './profile';
import {ClientReducer} from './client';

export const rootReducer = combineReducers({
  AuthReducer,
  ErrorReducer,
  EmployeeReducer,
  ClientReducer
})
