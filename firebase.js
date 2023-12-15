// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtYLuuUyC9gX7aHhvDtdb27Uct-6yDQKc",
  authDomain: "nextjs-auth-gif-project.firebaseapp.com",
  projectId: "nextjs-auth-gif-project",
  storageBucket: "nextjs-auth-gif-project.appspot.com",
  messagingSenderId: "556820892691",
  appId: "1:556820892691:web:24bacea7180fd1edda83e6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
