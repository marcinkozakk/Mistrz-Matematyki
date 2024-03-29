import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Route from './components/Route';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode >
    <BrowserRouter>
      <Route/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
