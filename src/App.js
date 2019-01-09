import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import './App.css';
import SignUp from './component/Signup';

class App extends Component {
  render() {
    return (
 <Router>
   <Route  exact path='/'           component = {SignUp}   />
 </Router>
    );
  }
}

export default App;
