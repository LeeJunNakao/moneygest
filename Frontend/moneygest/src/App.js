import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './reducers/Reducers'
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk'

import Manager from './components/Manager'

import './App.css';


const store = applyMiddleware(thunk, multi, promise)(createStore)(Reducers);

function App() {
  return (
    <Provider store={store}>

      <Manager/>

    </Provider>

  );
}

export default App;
