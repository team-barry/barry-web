import {Record} from 'immutable';
import * as storage from 'helpers/storage';

const UserRecord = Record({
  uid: null,
  name: null,
  email: null,
  isLogging: false,
});

export default class User extends UserRecord{
  isLogin() {
    if(this.uid) {
      return true;
    };
    return false;
  };

  isLogging() {
    return this.isLogging;
  };

  hasUserInLocalStorage() {
    const user = storage.getAuth();
    if(user.uid) {
      return true;
    }
    return false;
  };

  needAuth() {
    return !this.isLogin() && !this.isLogging() && this.hasUserInLocalStorage();
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
