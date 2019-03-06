import React from 'react';
import { history } from '../state/store';
import MaskedInput from 'react-text-mask';
import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

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

export const TextMaskCustom = props => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        ')',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

export const parsePhone = phone => phone.replace(/(\(|\)|-)/g, '');
