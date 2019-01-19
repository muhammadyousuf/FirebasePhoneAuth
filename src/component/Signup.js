import React, { Component } from 'react';
import * as firebase from 'firebase';




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
        console.log('this phone******', this.state.phoneNumber);
        console.log('this window*******', window.recaptchaVerifier)
        var phoneNumber = this.state.phoneNumber;
        var appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log('result',confirmationResult);
            }).catch(function (error) {
                // Error; SMS not sent
                console.log('erro')
                // ...
            })
        
    }

    


    delet() {
        let fire = firebase.storage().ref().child('nic/');
        console.log('deleted', fire)
    }

    componentDidMount() {
        console.log('this----', window.recaptchaVerifier)
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                //    this.onSignInSubmit();
                console.log('res', response)
            }
        });
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <input value={this.state.value} onChange={(event) => { this.setState({ phoneNumber: event.target.value }); console.log('num', this.state.phoneNumber) }} />
                <button id="sign-in-button" onClick={this.SignUp.bind(this)} >SignUp</button> <br />
                <button onClick={this.delet.bind(this)} >Delete</button>
            </div>
        );
    }
}

export default SignUp;
