import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

import { nodemailerService } from './nodemailer.service';
import { firebaseConfig } from '../shared/config/firebaseConfig';
import { IUser } from '../shared/interfaces/users';

class FirebaseAuthService {
  private redirectSucessUrl = 'https://a2afccaa6a7c.ngrok.io';
  private admin;
  private firebase;
  private actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: `${this.redirectSucessUrl}/auth/signin`,
    // This must be true.
    handleCodeInApp: true,
  };

  constructor() {
    this.admin = admin.initializeApp(firebaseConfig);
    this.firebase = firebase.initializeApp(firebaseConfig);
  }

  private emailHTML(link: string) {
    return `
      <h2>follow this link to verify email.</h2>
      <br>
      ${link}
    `;
  }

  async createUser(user: IUser) {
    try {
      const { providerData } = await this.admin.auth().createUser(user);

      const { email } = providerData[0];

      const emailVerifyLink = await admin
        .auth()
        .generateEmailVerificationLink(email, this.actionCodeSettings);

      await nodemailerService.sendMail({
        subject: 'Verify email',
        from: 'noreply@express-vue-typescript.com',
        html: this.emailHTML(emailVerifyLink),
        to: email,
        text: 'verify your email',
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      return await this.firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      return await this.admin.auth().listUsers();
    } catch (e) {
      throw new Error(e.message);
    }
  }


  async verifyEmail(actionCode: string) {
    try{
      return await this.firebase.auth().applyActionCode(actionCode)
    }catch (e) {
      throw new Error(e.message)
    }
  }
}

export const firebaseAuthService = new FirebaseAuthService();
