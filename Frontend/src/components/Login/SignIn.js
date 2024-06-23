import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import SignOut from "./SignOut";
import ChatRoom from "../Chat/ChatRoom";
import Login from "./login";

const auth = firebase.auth();

function SignIn() {
  const [user] = useAuthState(auth);

  const signInWithEmailAndPassword = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  return (
    <div className="App">
      <Login signInWithEmailAndPassword={signInWithEmailAndPassword} />
    </div>
  );
}

export default SignIn;
