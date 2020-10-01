import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

import { nodemailerService } from './nodemailer.service';
import { firebaseConfig } from '../shared/config/firebaseConfig';
import { IUser } from '../shared/interfaces/users';

class FirebaseAuthService {
  private redirectSucessUrl = 'https://95a9e888e72f.ngrok.io';
  private admin;
  private firebase;
  private actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: `${this.redirectSucessUrl}/email-success-verify`,
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
      // console.log(object)
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async signInWithLinkEmail(email: string) {
    try {
      return await this.firebase
        .auth()
        .sendSignInLinkToEmail(email, this.actionCodeSettings);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      const user = await this.admin.auth().listUsers();
      // console.log(user);
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const firebaseAuthService = new FirebaseAuthService();
