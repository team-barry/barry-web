import { Record } from "immutable";

const UserRecord = Record({
  uid: null,
  name: null,
  email: null,
  screen_name: null,
});

export default class User extends UserRecord {
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
