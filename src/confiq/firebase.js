import * as firebase from 'firebase';

import serviceAccount from './mechanic-6d028-firebase-adminsdk-6n6t7-f803af5aac';
var admin = require("firebase-admin");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mechanic-6d028.firebaseio.com"
});

var config = {
    apiKey: "AIzaSyDFHbXbDQ3PrLrMn-NjzMYbxmwSPorMWPU",
    authDomain: "mechanic-6d028.firebaseapp.com",
    databaseURL: "https://mechanic-6d028.firebaseio.com",
    projectId: "mechanic-6d028",
    storageBucket: "mechanic-6d028.appspot.com",
    messagingSenderId: "881664810686"
  };
  firebase.initializeApp(config);
 