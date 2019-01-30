import React, { Component } from 'react'
import * as firebase from 'firebase';
import { RaisedButton, TextField } from 'material-ui';
import Navbar from './NavBar';
import { cyan800 } from 'material-ui/styles/colors';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Mechanic extends Component {
  ref = firebase.database().ref("Mechanic");
  constructor(props) {
    super();
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      Email: '',
      NIC: '',
      Address: '',
      Phone: '',
      test: false,
      Password: '',
      value: '',
      emailverified: "no",
      nicverify: false,
      profilepic: false,
      experienceCompleted: false,
      approved: false,
      description:''
    }

  }
  
  componentWillMount(){
    console.clear()
}
componentWillUnmount(){
  console.clear()
}
  sendToFirebase(ev) {

    if (this.state.firstName === "" ){
      toast.error("Please Enter First Name")
    }
    if(this.state.lastName === ""){
      toast.error("Please Enter Last Name");
    }
    if(this.state.Email === ""){
      toast.error("Please Enter Email Address");
    }
    if(this.state.NIC === ""){
      toast.error("Please Enter NIC Number ");
    }
    if(this.state.description === ""){
      toast.error("Please Enter Some Description")
    }
    if(this.state.Address === ""){
      toast.error("Please Enter Address");
    }
    if(this.state.Phone === ""){
      toast.error("Please Your Mobile Number");
    }
    if(this.state.Password === ""){
      toast.error("Please Enter Password");
    }
    if(this.state.firstName !== "" && this.state.lastName !== "" && this.state.Email !== "" && this.state.NIC !== "" && this.state.Address !== "" && this.state.Phone !== "" && this.state.Password !== "" && this.state.description !== "")  {
      const email = this.state.Email;
      const pass = this.state.Password;
      const auth = firebase.auth();

      const promise = auth.createUserWithEmailAndPassword(email, pass)
      promise.then((aaa) => {
        console.log(">>>>>>>>>>>", aaa);
        if (aaa.user.uid != null) {
          var AdminID = localStorage.getItem('AdminID');
          var AdminName = localStorage.getItem('AdminName');
          var AdminEmail = localStorage.getItem('AdminEmail');
          var AdminMessage = localStorage.getItem('AdminMessage');

          console.log(AdminID + '' + AdminName + '' + AdminEmail + '' + AdminMessage)

          this.ref.child(aaa.user.uid).push({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.Email, NIC: this.state.NIC, Address: this.state.Address, phoneNo: this.state.Phone, password: this.state.Password, EmailVerified: this.state.emailverified, NicVerified: this.state.nicverify, ProfilePic: this.state.profilepic, test: this.state.test, experienceCompleted:this.state.experienceCompleted, approved:this.state.approved, description:this.state.description }).child('registrationBy').set({ AdminID, name: AdminName, email: AdminEmail, message: AdminMessage });
          this.setState({ firstName: "", lastName: "", Email: "", NIC: "", Address: "", Phone: "", Password: "", value: "", description:"" })
          toast.success('Records Successfully  Submitted')
          var user = firebase.auth().currentUser;
          if (user) {
            console.log('user', user.emailVerified)
            user.sendEmailVerification().then(function () {
              console.log('send Verification');
            }, function (error) {
              console.log('not send Verification');
            });
          }
        }
      });
      promise.catch(e => toast.error(e.message));
    }
  }
  render() {
    return (
      <div className="App">
        <Navbar logOut={this.props.logOut} />
        
        <div className='App'>
      <ToastContainer />
        
          <form>

            <TextField
              name="firstname"
              type="text"
              floatingLabelText="First Name"
              value={this.state.firstName}
              onChange={(event) => { this.setState({ firstName: event.target.value }) }}

            />
            <br />
            <TextField
              name="lastname"
              type='text'
              floatingLabelText="Last Name"
              value={this.state.lastName}
              onChange={(event) => { this.setState({ lastName: event.target.value }) }}

            />
            <br />
            <TextField
              type="email"
              name="Email"
              floatingLabelText="Email"
              value={this.state.Email}
              onChange={(event) => { this.setState({ Email: event.target.value }) }}

            />
            <br />
            <TextField
              name="Description"
              floatingLabelText="Description"
              value={this.state.description}
              onChange={(event) => { this.setState({ description: event.target.value }) }}

            />
            <br />
            <NumberFormat customInput={TextField} floatingLabelText="NIC" value={this.state.NIC}
              onChange={(event) => { this.setState({ NIC: event.target.value }) }} format="#####-#######-#"/>
            <br />
            <TextField
              name="Address"
              floatingLabelText="Address"
              value={this.state.Address}
              onChange={(event) => { this.setState({ Address: event.target.value }) }}

            />
            <br />
  
            <NumberFormat customInput={TextField} floatingLabelText="Phone No." value={this.state.Phone}
              onChange={(event) => { this.setState({ Phone: event.target.value }) }} format="####-#######"/>
            <br />
            <TextField

              name="Password"
              floatingLabelText="Password"
              type='password'
              value={this.state.Password}
              onChange={(event) => { this.setState({ Password: event.target.value }) }}

            />
            <br /><br /> <br />


            <div>




              <RaisedButton label="Register"
                style={{ width: '20%' }}
                buttonStyle={{ backgroundColor: cyan800 }}
                labelStyle={{ color: 'white', fontFamily: 'Times' }}
                onTouchTap={this.handleSave}
                onClick={this.sendToFirebase.bind(this)}
                primary={false}
              />
            </div>
          </form>
        </div>

      </div>
    );
  }
}