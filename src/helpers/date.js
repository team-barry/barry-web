import Moment from 'moment';
import {extendMoment} from 'moment-range';

const moment = extendMoment(Moment);

const YMD_FORMAT = "YYYY-MM-DD"
const DAYS = 'days';

export class DateFactory {
  static beforeDays(days = 0) {
   return moment().subtract(days, DAYS).format(YMD_FORMAT);
  }

  static now() {
    // [NOTE] moment parses and displays in local time
    // Like that 2017-08-27T11:48:16+09:00
    return moment().format();
  }

  static today() {
    return this.beforeDays(0);
  }

  static yesterday() {
    return this.beforeDays(1);
  }

  static getFormatDate(moment) {
    return moment.format(YMD_FORMAT);
  }

  static dateList(terms = 1) {
    if(terms < 1) {
      return [this.today()];
    }
    const start = this.beforeDays(terms - 1);
    const end = this.beforeDays(0);
    const range = moment.range(start, end);
    const days = Array.from(range.by(DAYS));

    return days.map(moment => moment.format(YMD_FORMAT));
  }
}
