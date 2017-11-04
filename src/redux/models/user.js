import { Record } from "immutable";

const UserRecord = Record({
  uid: null,
  name: null,
  email: null,
  screen_name: null,
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

  get screenName() {
    if (this.screen_name) {
      return this.screen_name;
    }
    return this.name;
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
