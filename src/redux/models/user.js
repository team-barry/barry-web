import {Record} from 'immutable';
import * as storage from 'helpers/storage';

const UserRecord = Record({
  user_id: null,
  name: null,
  email: null,
  access_token: null,
  token_type: null,
  is_valid: false,
});

export default class User extends UserRecord{
  isLogin() {
    if(this.user_id && this.access_token) {
      return true;
    };
    return false;
  }
  
  hasAuthInLocalStorage() {
    const auth = storage.getAuth();
    if(auth.access_token && auth.token_type) {
      return true;
    }
    return false;
  }
  
  needAuth() {
    return !this.isValid() && this.hasAuthInLocalStorage();
  }
  
  isValid() {
    return this.is_valid;
  }
};
