import {Record} from 'immutable';

const UserRecord = Record({
  id: null,
  name: null,
  token: null,
  loggingIn: false,
});

export default class User extends UserRecord{
  isLogin() {
    if(this.id && this.token) {
      return true;
    };
    return false;
  }
};
