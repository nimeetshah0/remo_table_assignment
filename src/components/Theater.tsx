import React, { useState } from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
// import Firebase from '../services/firebase';
// import { useHistory } from 'react-router-dom';
import './Theater.scss'; 
import MapImage from '../assets/conference-map.svg';
import TableConfig from './tableConfig.json';
import _ from 'lodash';
import { getEmptySeat } from '../lib';
import AnimateOnChange from 'react-animate-on-change';

const Theater: React.FC = () => {

  const fs = useFirestore();
  const auth = useSelector((state: RootStateOrAny) => state.firebase.auth);
  
  const [animate, setAnimate] = useState(false);


  const changeSeats = (newTable: any) => {
    let emptySeat = getEmptySeat(newTable, fsTables, auth);
    if (!emptySeat && emptySeat !== 0) {
      alert('Table is full');
      return;
    }
    fs.collection('tables_state').doc(auth.uid).update({
      userId: auth.uid,
      tableId: newTable.id,
      seat: emptySeat,
      photo: auth.photoURL
    });
  }

  // const fs = useFirestore();
  
  console.log(auth.photoURL);

  useFirestoreConnect(['tables_state']);
  const fsTables = useSelector(( {firestore: {ordered} }: RootStateOrAny ) => ordered.tables_state);
  const tableDOMs = TableConfig.tables.map((table) => {

    // Check if there are users on this table
    let seatedUsers = [];
    if (fsTables && fsTables.length) {
      for (let t of fsTables) {
        if (t.tableId == table.id) {
          seatedUsers.push({userId: t.userId, photo: t.photo, seat: t.seat});
        }
      }
    }

    if (seatedUsers && seatedUsers.length) {
      return (
        <div onDoubleClick={() => changeSeats(table)} key={table.id} className='rt-room' style={{ width: table.width, height: table.height, top: table.y, left: table.x }}>
          {seatedUsers.map((usr: any, idx: any) => {
            if (usr.userId == auth.uid) {
              return (
                <AnimateOnChange
                  key={usr.userId}
                  baseClassName="user"
                  animationClassName="animate__animated animate__bounce animate__repeat-2"
                  onAnimationEnd={() => setAnimate(false)}
                  style={{ borderRadius: '50px', position: 'absolute', width: '50px', height: '50px', top: table.seats[usr.seat].y, left: table.seats[usr.seat].x }}
                  animate={animate}>
                  <img src={usr.photo} style={{ borderRadius: '50px', position: 'absolute', width: '50px', height: '50px' }}></img>
                </AnimateOnChange>
              )
            } else {
              return (
                <img key={usr.userId} src={usr.photo} style={{ borderRadius: '50px', position: 'absolute', width: '50px', height: '50px', top: table.seats[usr.seat].y, left: table.seats[usr.seat].x}}></img>
              )
            }
          })}
          <div className='rt-room-name'>{table.id}</div>
        </div>
      )
    } else {
      return (
        <div onDoubleClick={() => changeSeats(table)} key={table.id} className='rt-room' style={{ width: table.width, height: table.height, top: table.y, left: table.x }}><div className='rt-room-name'>{table.id}</div></div>
      );
    }
  });

  const findMe = () => {
    setAnimate(true);
  }


  if (auth) {
    return ( 
      <div className='remo-theater' style={{width: TableConfig.width, height: TableConfig.height}}>
        <div className='rt-app-bar'>
          <button onClick={findMe}>Find me</button>
          <p>{auth.displayName}</p>
          <img className='loggedInUser' src={auth && auth.photoURL ? auth.photoURL : undefined}></img>
          {/* <a href='javascript:;'>Logout</a> */}
        </div>
        <div className='rt-rooms'>
          {tableDOMs}
        </div>
        <div className='rt-background'>
          <img src={MapImage} alt='Conference background'/>
        </div>
      </div>
    );
  } else {
    return (
      <div className='loggedOut'>
        <p>You need to login to see this!</p>
        <a href="/">Go back</a>
      </div>
    )
  }
};
 
export default Theater;