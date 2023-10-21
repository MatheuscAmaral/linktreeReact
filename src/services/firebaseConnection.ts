import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAnDiqzv56EdOLlqy4gLUutJbDq16DwGr4",
  authDomain: "reactlinks-e7ec1.firebaseapp.com",
  projectId: "reactlinks-e7ec1",
  storageBucket: "reactlinks-e7ec1.appspot.com",
  messagingSenderId: "796557276509",
  appId: "1:796557276509:web:95c507908114bcaefc64b4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db};