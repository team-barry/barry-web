import {Record} from 'immutable';

const UserRecord = Record({
  uid: null,
  name: null,
  email: null,
  logging: false,
});

export default class User extends UserRecord{
  isLogin() {
    if(this.uid) {
      return true;
    };
    return false;
  };

  isLogging() {
    return this.logging;
  };
};

export class UserUtil {
  static fromAuth(user) {
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    };
  };
};
