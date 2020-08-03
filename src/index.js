import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.css'

import axios from "axios";

require('dotenv').config();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(localStorage.getItem('ipc'));

ReactDOM.render(<App />, document.getElementById('root'));