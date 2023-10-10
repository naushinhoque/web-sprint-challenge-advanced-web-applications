// ✨ implement axiosWithAuth
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../components/App';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


const root = createRoot(document.getElementById('root'));

const axiosWithAuth = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});

axiosWithAuth.get('/articles')
  .then(response => {
    console.log('Authenticated GET arequest response',response.data)

    root.render(
      <React.StrictMode>
        <Router>
        <App axiosWithAuth={axiosWithAuth}/>
        </Router>
      </React.StrictMode>
    );
  })
  .catch(error => {
    console.error('Authenticated GET request error', error);

    root.render(
      <React.StrictMode>
        <Router>
          <App axiosWithAuth={axiosWithAuth}/>
        </Router>  
      </React.StrictMode>
    );
  })

  export default axiosWithAuth;
