import {Record} from 'immutable';

const UserRecord = Record({
  user_id: null,
  name: null,
  email: null,
  access_token: null,
  token_type: null,
});

export default class User extends UserRecord{
  isLogin() {
    if(this.user_id && this.access_token) {
      return true;
    };
    return false;
  }
};
