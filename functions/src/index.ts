import * as functions from 'firebase-functions';
import firebase from 'firebase/app'
import 'firebase/firestore'
import * as cors from 'cors'

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

const firestore = firebase.firestore();

export const db = functions.https.onRequest(async (req, res) => {
  return cors()(req, res, async () => {
    const {type,key,value,endpoint} = req.body.data

    const testdb = firestore.collection(endpoint)
    if (type === 'GET') {
      const querySnapshot = await testdb.where("key", "==", key).get()
      querySnapshot.forEach(function(doc) {
        const data = doc.data()
        res.send({data})
      });
    } else if (type === 'SET') {
      await testdb.doc(key).set({
        value
      })
      res.send({ data: true });
    } else if (type === 'UPDATE') {
      await testdb.doc(key).update({
        value
      })
      res.send({ data: true });
    } else {
      console.error('Invalid type: Must be GET or SET')
    }
  });
});