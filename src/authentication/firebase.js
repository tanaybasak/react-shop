import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './cred';

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
export default auth;
