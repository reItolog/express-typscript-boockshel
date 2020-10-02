import { admin, firebase } from '../shared/firebase';
import { nodemailerService } from './nodemailer.service';
import { IUser } from '../shared/interfaces/users';

class FirebaseAuthService {
  private redirectSucessUrl = 'https://611178c6f4da.ngrok.io';

  private actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: `${this.redirectSucessUrl}/auth/signin`,
    // This must be true.
    handleCodeInApp: true,
  };

  private emailHTML(link: string) {
    return `
      <h2>follow this link to verify email.</h2>
      <br>
      ${link}
    `;
  }

  async createUser(user: IUser) {
    try {
      const { providerData } = await admin.auth().createUser(user);

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
      return await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getUser() {
    try {
      return await admin.auth().listUsers();
    } catch (e) {
      throw new Error(e.message);
    }
  }


  async verifyEmail(actionCode: string) {
    try {
      return await firebase.auth().applyActionCode(actionCode);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const firebaseAuthService = new FirebaseAuthService();
