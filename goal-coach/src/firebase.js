import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDqarESmuB0clCFEz6PRZcypGt5LrAkW2c",
  authDomain: "goal-coach-aa748.firebaseapp.com",
  databaseURL: "https://goal-coach-aa748.firebaseio.com",
  projectId: "goal-coach-aa748",
  storageBucket: "",
  messagingSenderId: "170334355078"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref("goals");
export const completeGoalRef = firebase.database().ref("completeGoal");
