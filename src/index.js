import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";

import App from './App'
import './index.css'

require('dotenv').config();
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(localStorage.getItem('ipc'));

ReactDOM.render(<App />, document.getElementById('root'));