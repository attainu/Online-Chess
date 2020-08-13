import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {BrowserRouter as Router, } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store } >
    <Router> 
      <App />
    </Router> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

