import { history } from '../../store';

export const createAppointmentLabel = appointment => {
  const aStartTime = appointment.startTime.toString().split('');
  const labelStart =
    aStartTime[0] + aStartTime[1] + ':' + aStartTime[2] + aStartTime[3];
  const startTime = moment(labelStart, 'HH:mm');
  const labelEnd = startTime
    .add(appointment.appointmentDuration, 'm')
    .format('HH:mm');

  const hourLabel = `${labelStart} → ${labelEnd}`;
  return moment(appointment.appointmentDate).format('LL') + ' ' + hourLabel;
};

export const onClickGo = location => evt => {
  evt.preventDefault();
  history.push(location);
};
