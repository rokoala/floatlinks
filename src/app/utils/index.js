import { history } from '../state/store';
import moment from 'moment';

export const createHourLabel = hour => {
  const aStartTime = hour.startTime.toString().split('');
  const labelStart =
    aStartTime[0] + aStartTime[1] + ':' + aStartTime[2] + aStartTime[3];
  const startTime = moment(labelStart, 'HH:mm');
  const labelEnd = startTime.add(hour.slotDuration, 'm').format('HH:mm');
  return `${labelStart} → ${labelEnd}`;
};

export const createAppointmentLabel = (date, startTime, duration) => {
  const aStartTime = startTime.toString().split('');
  const labelStart =
    aStartTime[0] + aStartTime[1] + ':' + aStartTime[2] + aStartTime[3];
  const momentStartTime = moment(labelStart, 'HH:mm');
  const labelEnd = momentStartTime.add(duration, 'm').format('HH:mm');

  const hourLabel = `${labelStart} → ${labelEnd}`;
  return moment(date).format('LL') + ' ' + hourLabel;
};

export const onClickGo = location => evt => {
  evt.preventDefault();
  history.push(location);
};

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

export const convertMonth = monthNumber => {
  return months[monthNumber];
};

export const formatDate = date => {
  return date
    ? date.getDate() +
        ' ' +
        convertMonth(date.getMonth()) +
        ' de ' +
        date.getFullYear()
    : null;
};
