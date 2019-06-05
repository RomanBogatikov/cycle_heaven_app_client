// configure the Firebase for our app
import app from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID: process.env.REACT_APP_APP_ID,
}

const devConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID: process.env.REACT_APP_APP_ID,
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

console.log('config=', config);

class Firebase {
  constructor() {

    app.initializeApp(config);

    this.auth = app.auth();
  }

  // ***** Auth API *****
  // Authentication interface: authentication functions serve our communication channel from the Firebase class to the Firebase API

  // public class fields syntax ensures 'this' is bound within doCreateUserWithEmailAndPassword. Other ways are calling 'bind' in the constructor (is OK) or using arrow functions in the callback (if this callback is passed as a prop to lower components, those components might do an extra re-rendering).
  // these endpoints are called asynchronously (will need to be resolved + error handling).
  // these functions are put directly on instanse of Firebase and not on Firebase.prototype
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}


export default Firebase;
