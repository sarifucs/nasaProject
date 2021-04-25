import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDxS5FvZj-H7vYb8nuhKzC4M6jTSQxfxVw",
    authDomain: "nasaproject-3b8c4.firebaseapp.com",
    projectId: "nasaproject-3b8c4",
    storageBucket: "nasaproject-3b8c4.appspot.com",
    messagingSenderId: "51815129517",
    appId: "1:51815129517:web:5346194c55e8a1e42ec124"
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }
  const fire = firebase;
  export default fire;