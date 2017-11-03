import { Record } from "immutable";

const UserRecord = Record({
  uid: null,
  name: null,
  email: null,
  display_name: null,
  logging: false,
  me: false,
});

export default class User extends UserRecord {
  isLogin() {
    if (this.me && this.uid) {
      return true;
    }
    return false;
  }

  isLogging() {
    return this.logging;
  }
}

export class UserUtil {
  static fromAuth(user) {
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    };
  }
}
