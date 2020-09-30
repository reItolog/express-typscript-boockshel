import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { firebaseConfig } from '../shared/config/firebaseConfig';
import { IUser } from '../shared/interfaces/users';

class FirebaseAuthService {
  private admin;
  private firebase;
  private actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://4dfd592ef2e5.ngrok.io/',
    // This must be true.
    handleCodeInApp: true,
  };

  constructor() {
    this.admin = admin.initializeApp(firebaseConfig);
    this.firebase = firebase.initializeApp(firebaseConfig);
  }

  async createUser(user: IUser) {
    try {
      return await this.admin
        .auth()
        .createUser(user);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      return await this.firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signInWithLinkEmail(email: string) {
    try {
      const user=  await this.firebase.auth().sendSignInLinkToEmail(email, this.actionCodeSettings);
      console.log('from USer Link',user);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      const user = await this.admin.auth().listUsers()
      // console.log(user);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const firebaseAuthService = new FirebaseAuthService();