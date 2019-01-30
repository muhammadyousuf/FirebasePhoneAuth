import React, { Component } from 'react';
import * as firebase from 'firebase';

import jsPDF from 'jspdf';

var doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [640, 640]
  })
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+92',
            confirmResult: null,
            code: "",
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
                // conform = confirmationResult;
                console.log('result', confirmationResult);
            }).catch(function (error) {
                // Error; SMS not sent
                console.log('erro')
                // ...
            })

    }




    delet() {

        let fire = firebase.storage().ref().child('picture/').child('1.PNG').delete();
        console.log('deleted', fire)
        console.log('delet')
        // admin.auth().deleteUser('05svqZ68C8fKgjOmszhwaPxj5D32')
        //     .then(function () {
        //         console.log("Successfully deleted user");
        //     })
        //     .catch(function (error) {
        //         console.log("Error deleting user:", error);
        //     });
    }

    componentDidMount() {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': function (response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                //    this.onSignInSubmit();
                console.log('res', response)
            }
        });
        // window.recaptchaVerifier.render().then(function (widgetId) {
        //     window.recaptchaWidgetId = widgetId;
        // });

    }
    pdf() {
        console.log("Go")
       
        // this.props.history.push('/MyPdfViewer');
        const user = `Hello Muhammad Yousuf
        
Add Succeefully`
//var img = new Image();
//img.src = "https://firebasestorage.googleapis.com/v0/b/mechanic-6d028.appspot.com/o/picture%2F2.jpg?alt=media&token=35893644-b173-4de0-ba3f-f9429259cf07"
        doc.text(user, 1, 1)
     //   doc.addImage(img, 'JPEG', 15, 40, 180, 160);
        doc.save('two-by-four.pdf')

    }
    verify() {
        var code = this.state.code;
        window.verifyingCode = true;
        console.log('conform', code)

        window.confirmationResult.confirm(code).then(function (result) {
            // User signed in successfully.
            var user = result.user;
            console.log('usre', user)
            window.verifyingCode = false;
            // ...
        }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
        });
    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <input value={this.state.phoneNumber} onChange={(event) => { this.setState({ phoneNumber: event.target.value }); console.log('num', this.state.phoneNumber) }} />
                <button id="sign-in-button" onClick={this.SignUp.bind(this)} >SignUp</button> <br />

                <input value={this.state.code} onChange={(event) => { this.setState({ code: event.target.value }); console.log('code', this.state.code) }} placeholder="XXXXXX" /><br />
                <button onClick={this.verify.bind(this)} >verification Code</button> <br /><br />
                <button onClick={this.delet.bind(this)} >Delete</button>
                <button onClick={this.pdf.bind(this)} >Next</button>
            </div>
        );
    }
}

export default SignUp;
