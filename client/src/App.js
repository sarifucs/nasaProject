import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import { Router, Route, Switch } from 'react-router-dom';
import fire from './fire.js';
import history from './config/history'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
  console.log('logged in?', isLoggedIn);

  return (

    /* <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
      <script
        src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
        crossorigin></script>
      <script
        src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
        crossorigin></script>
      <script>var Alert = ReactBootstrap.Alert;</script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
        crossorigin="anonymous"
      /> */
    < Provider store={store} >
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path='/dashboard'>
              <Dashboard></Dashboard>
            </Route>
            <Route path='/'>
              <Login></Login>
            </Route>
          </Switch>
        </div >
      </Router>
    </Provider >

  );
}

export default App;
