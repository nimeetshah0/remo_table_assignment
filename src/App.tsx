import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Auth from './components/Auth';
import Theater from './components/Theater';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import firebase from './services/firebase';
// import thunk from 'redux-thunk';
import {
  ReactReduxFirebaseProvider
} from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { devToolsEnhancer } from 'redux-devtools-extension';




const store = createStore(
  reducers,
  devToolsEnhancer({})
);

const rrfProps = {
  firebase,
  config: { useFirestoreForProfile: true },
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}


const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Switch>
            <Route exact={true} path='/' component={Auth} />
            <Route exact={true} path='/theater' component={Theater} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
