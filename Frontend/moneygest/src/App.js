import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './reducers/Reducers'
import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk'

import ReduxToastr from 'react-redux-toastr'
import Manager from './components/Manager'

import './App.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'


const store = applyMiddleware(thunk, multi, promise)(createStore)(Reducers);

function App() {
  return (
    <Provider store={store}>
      
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      getState={(state) => state.toastr} // This is the default
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>


      <Manager/>

    </Provider>

  );
}

export default App;
