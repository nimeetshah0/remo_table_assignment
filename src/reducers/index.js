
import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

import data from "./gameDataReducer";
import authReducer from './auth';

export default combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  tables: data,
  auth: authReducer
});