import {combineReducers} from 'redux';
import {AuthReducer} from './auth';
import {ErrorReducer} from './error';
import {EmployeeReducer} from './profile';
import {ClientReducer} from './client';
import {NotesReducer} from './notes';
import {OrderReducer} from './order';
import {FileReducer} from './files';
import {AssignmentReducer} from './assignment';
import {TimeReducer} from './time';

export const rootReducer = combineReducers({
  AuthReducer,
  ErrorReducer,
  EmployeeReducer,
  ClientReducer,
  NotesReducer,
  OrderReducer,
  FileReducer,
  AssignmentReducer,
  TimeReducer
})
