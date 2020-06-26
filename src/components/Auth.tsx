import React from 'react';
import Firebase from '../services/firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useFirestore, useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import { loginUser } from '../actions';
import _ from 'lodash';
import { findNextEmptyTable } from '../lib';

const Auth: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fs = useFirestore();

  useFirestoreConnect(['tables_state']);
  const fsTables = useSelector(({ firestore }: RootStateOrAny) => firestore.ordered.tables_state);

  if (isLoaded(fsTables)) {
    // useEffect(() => {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let userCopy = {} as any;
          Object.assign(userCopy, user);
          if (!userCopy.photoURL) {
            userCopy.photoURL = 'https://i.pravatar.cc/50?u=' + userCopy.uid;
          }

          // Find a seat for the user
          // Check if user already has a seat 
          let userHasSeat = false;
          for (let table of fsTables) {
            if (table.userId == userCopy.uid) {
              // User already has a seat, nothing to do 
              userHasSeat = true;
            }
          }

          if (!userHasSeat) {
            const nextTable = findNextEmptyTable(fsTables) as any;
            if (!_.isEmpty(nextTable)) {
              fs.collection('tables_state').doc(userCopy.uid).set({ tableId: nextTable.tableId, seat: nextTable.seat, userId: userCopy.uid, photo: userCopy.photoURL })
            } else {
              alert('All tables full');
              return;
            }
          }

          dispatch(loginUser(userCopy));
          history.push('/theater');
        }
      });
    // }, []);
  }

  const redirect = () => {
    const provider = new Firebase.auth.GoogleAuthProvider();
    // Check if there is a seat available
    const nextTable = findNextEmptyTable(fsTables) as any;
    if (!_.isEmpty(nextTable)) {
      Firebase.auth().signInWithPopup(provider);
    }
  };

  const signInAnon = () => {
    console.log('signing in anon');
    // Check if there is a seat available
    const nextTable = findNextEmptyTable(fsTables) as any;
    if (!_.isEmpty(nextTable)) {
      Firebase.auth().signInAnonymously();
    }
  }

  return ( 
    <div 
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h1> Remo Coding Challenge Join Room </h1>
      <button onClick={redirect}> Login With Google </button>
      <button id='signInAnon' onClick={signInAnon}>Login Anon</button>
    </div> 
  );
};
 
export default Auth;