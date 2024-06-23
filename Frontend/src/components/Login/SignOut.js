import React from "react";
import { auth } from "../../firebase"; // Certifique-se de que o caminho está correto

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export default SignOut;
