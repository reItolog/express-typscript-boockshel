import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default firebase;