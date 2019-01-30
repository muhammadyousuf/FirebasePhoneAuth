import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom';
import './App.css';
import SignUp from './component/Signup';
import Admin from './component/Login';
//import MyPdfViewer from './component/PDF';

class App extends Component {
  render() {
    return (
 <Router>
   <div>
   <Route exact path='/' component = {Admin} />
   <Route  path='/Signup'           component = {SignUp}   />
   {/* <Route path = '/MyPdfViewer' component = {MyPdfViewer} /> */}
   </div>
 </Router>
    );
  }
}

export default App;
