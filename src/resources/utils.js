import moment from 'moment';

export const createHourLabel = hour => {
  const aStartTime = hour.startTime.toString().split('');
  const labelStart =
    aStartTime[0] + aStartTime[1] + ':' + aStartTime[2] + aStartTime[3];
  const startTime = moment(labelStart, 'HH:mm');
  const labelEnd = startTime.add(hour.slotDuration, 'm').format('HH:mm');
  return `${labelStart} → ${labelEnd}`;
};

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
