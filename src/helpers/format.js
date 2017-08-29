import numeral from 'numeral'
import moment from 'moment';

export function formatLatLng(number) {
  return numeral(number).format('[00]0.0000')
}

export function formatDate(date) {
  return moment(date).fromNow();
}
