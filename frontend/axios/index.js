// ✨ implement axiosWithAuth
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import axios from 'axios';

const axiosWithAuth = axios.create({
  baseURL: 'http://localhost:9000/api',
  headers: {
    Authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json'
  }
});

const root = createRoot(document.getElementById('root'));

axiosWithAuth.get('/articles')
  .then(response => {
    console.log('Authenticated GET arequest response',response.data)

    root.render(
      <React.StrictMode>
        <App axiosWithAuth={axiosWithAuth}/>
      </React.StrictMode>
    );
  })
  .catch(error => {
    console.error('Authenticated GET request error', error);

    root.render(
      <React.StrictMode>
        <App axiosWithAuth={axiosWithAuth}/>
      </React.StrictMode>
    );
  })

  export default axiosWithAuth;
