import { admin } from '../../shared/firebase';

class FirebaseUsersService {

  async getAllUsers() {
    try {
      return await admin.auth().listUsers();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const firebaseUsersService = new FirebaseUsersService();