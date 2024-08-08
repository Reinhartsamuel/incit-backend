import * as admin from 'firebase-admin';
import dotenv  from "dotenv"

dotenv.config();
// Store the Base64-encoded service account key in an environment variable
const serviceAccountKeyBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

// Decode the Base64-encoded string
// const serviceAccountKey = JSON.parse(serviceAccountKeyBase64 || '{"name" : "test"}');
const serviceAccountKey = JSON.parse(Buffer.from(serviceAccountKeyBase64 || '', 'base64').toString('utf8')
)

// Initialize the Firebase Admin SDK
const adminFirebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});


export default adminFirebase