import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import './App.css';
import SignUp from './component/Signup';
import Admin from './component/Login';

class App extends Component {
  render() {
    return (
 <Router>
   <div>
   <Route exact path='/' component = {Admin} />
   <Route  path='/Signup'           component = {SignUp}   />
   </div>
 </Router>
    );
  }
}

export default App;
