import firebase from 'firebase/app';
import 'firebase/firebase-auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCyYPPSHTxvTKiSk37tWcG0znZc_V2FvI4',
	authDomain: 'ecom-rd-demo.firebaseapp.com',
	projectId: 'ecom-rd-demo',
	storageBucket: 'ecom-rd-demo.appspot.com',
	messagingSenderId: '706630618355',
	appId: '1:706630618355:web:6390bdf899d32e8d85bb86'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export auth and googleAuthProvider

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
