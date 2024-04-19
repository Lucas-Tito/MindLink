import admin from "firebase-admin";
import serviceAccountKey from "./service-account-credentials.json" assert { type: "json" }

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  });

export default admin