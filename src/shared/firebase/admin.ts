import * as admin from 'firebase-admin';
import { firebaseConfig } from '../config/firebaseConfig';

admin.initializeApp(firebaseConfig);

export default admin;