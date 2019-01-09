import React, { Component } from 'react';
import * as firebase from 'firebase'



class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+92',
            confirmResult: null,
        }
    }
   
    SignUp() {
        console.log('Its Work')
        let num = this.state.phoneNumber;
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        //     'size': 'invisible',
        //     'callback': function (response) {
        //         // reCAPTCHA solved, allow signInWithPhoneNumber.
        //       //  onSignInSubmit();
        
        //     }
        // });
        // const { phoneNumber } = this.state;
        // this.setState({ message: 'Sending code ...' });
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        // firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
        //     .then(function (confirmationResult) {
        //         window.confirmationResult = confirmationResult;
        //         console.log(confirmationResult);
        //     })
        //     .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
        return new Promise((resolve, reject) => {
        firebase.auth().signInWithPhoneNumber(num)
        .then((confirmResult) => {
            resolve(confirmResult)
        })
        .catch((error) => {
            reject(error)
        });
        });
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <input value={this.state.value} onChange={(event) => { this.setState({ phoneNumber: event.target.value }); console.log('num', this.state.phoneNumber) }} />
                <button onClick={this.SignUp.bind(this)} >SignUp</button>
            </div>
        );
    }
}

export default SignUp;
