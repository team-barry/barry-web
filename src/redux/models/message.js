import {Record} from 'immutable';

const MessageRecord = Record({
  info: null,
  error: null
});

export default class Message extends MessageRecord{
  hasError() {
    if(this.error) {
      return true;
    }
    return false;
  }
  
  hasInfo() {
    if(this.info) {
      return true;
    }
    return false;
  }
};
