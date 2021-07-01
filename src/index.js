import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App'; 
import store from "./Store/store";
import {Toaster} from "react-hot-toast"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
      {/* <h1>Under construction...</h1> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

 
