import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


// Define a global variable with a key value pair of the firebase App's API key
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
// Initialize the firebase configuration
firebase.initializeApp(firebaseConfig);

// Render the App
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
