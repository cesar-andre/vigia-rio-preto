import * as firebase from 'firebase'
import 'firebase/firestore'

const config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.firestore();

export{
    auth,
    database
}