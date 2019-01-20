import React, { Component } from 'react'
import * as firebase from 'firebase';
import { TextField, RaisedButton, AppBar } from 'material-ui';
export default class Admin extends Component {
    ref = firebase.database().ref("Admin");
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            value: '',
            admin: [],
        }
        this.adminlogin = this.adminlogin.bind(this);
    }

    adminlogin() {
        if (this.state.Username === '' || this.state.Password === '') {
            alert('Fill all Fields');
        } else {
            const email = this.state.Username;
            const pass = this.state.Password;
            const auth = firebase.auth();
           
            const promise = auth.signInWithEmailAndPassword(email, pass)
            promise.then(e => {
         console.log(e);
               
                if (e.user.uid != null) {
                    
                    if (email === 'muhammadyousuf@gmail.com' && pass === '123456') {

                        alert('successfull');
                        this.props.history.push('/Signup');
                        //window.location.reload();
                    }
                    else if ((email === "muhammadsalahuddin@gmail.com" && pass === '123456') || (email === "bilalkhan@gmail.com" && pass === '123456') || (email === "mariakhan@gmail.com" && pass === '123456')) {
                        alert('successfull');
                        this.props.history.push('/Signup')
                       // window.location.reload();
                    }

                    else {
                        alert('Login Failed! Please Make Sure You Are Any Admin')

                    }


              

                    this.ref.on('child_added', childsnapshot => {


                        if (e.user.uid === childsnapshot.key) {

                            localStorage.setItem('AdminID', childsnapshot.key)
                            localStorage.setItem('AdminName', childsnapshot.val().name)
                            localStorage.setItem('AdminEmail', childsnapshot.val().email)
                            localStorage.setItem('AdminImage', childsnapshot.val().image)
                            localStorage.setItem('AdminMessage', childsnapshot.val().message)
                            localStorage.setItem('AdminType', childsnapshot.val().type)
                        //    window.location.reload();


                        }



                    })

                    
              }


            })
            promise.catch(e => {
                alert(e.message)
                this.setState({ Username: '', Password: '', value: '' });
            });
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if (firebaseUser) {

                    console.log(firebaseUser.emailVerified)

                }

            })
            

        }
        

    }
    render() {
        return (
            <div className="App">
                <AppBar  />
                
            <TextField hintText='Email' floatingLabelText="Admin" style={{ width: 350, marginTop:'10%' }} onChange={(event) => { this.setState({ Username: event.target.value }) }} value={this.state.Username} /> <br />
                <br />
                <TextField
                    hintText="Password" floatingLabelText="Password" style={{ width: 350 }} type='password' onChange={(event) => { this.setState({ Password: event.target.value }) }}
                    value={this.state.Password}
                /> <br /> <br />

                <br />

                <RaisedButton label="Log In" primary={true} style={{ width: 350, height: 50, fontSize: 20 }} onClick={this.adminlogin} />
                <br /> <br />
                <div>

                </ div>

            </div>
        );
    }
}