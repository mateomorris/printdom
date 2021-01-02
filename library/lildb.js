import axios from 'axios'
import firebase from 'firebase/app'
import 'firebase/functions'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCD8_bwMiQBhoUqgOyrcBYEF39AjtdLcK4",
  authDomain: "lildb-8ff35.firebaseapp.com",
  projectId: "lildb-8ff35",
  storageBucket: "lildb-8ff35.appspot.com",
  messagingSenderId: "558432690545",
  appId: "1:558432690545:web:88767bbd60e400557b16d0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const functions = firebase.functions()
if (window.location.hostname === 'localhost') {
  functions.useFunctionsEmulator('http://localhost:5000')
}

var fbFunctions = functions.httpsCallable('db');

let endpoint
async function runFbFunction(args) {
  if (endpoint) {
    return await fbFunctions({ ...args, endpoint })
  } else {
    console.error('lildb needs an endpoint')
    return {
      data: null
    }
  }
}

// an api to modify get and set data

export default {
  connect: (end) => {
    endpoint = end
  }, 
  get: async (key) => {
    const {data} = await runFbFunction({ type: 'GET', key })
    return data
  },
  set: async (key, value) => {
    const {data} = await runFbFunction({ type: 'SET', key, value })
    console.log(data)
    return data
  },
  update: async (key, value) => {
    const {data} = await fbFunctions({ type: 'UPDATE', key, value })
    return data
  }
}

