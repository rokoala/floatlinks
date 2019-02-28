import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Calendar } from '../../../../components/customer/calendar';
import { history } from '../../../../../store';

const ScheduleDay = () => (
  <React.Fragment>
    <Calendar
      minDetail="year"
      locale="pt-BR"
      tileDisabled={({ date, view }) => {}}
      onChange={date => {
        history.push('/schedule/time');
      }}
      showLegend={true}
    />
    <Button style={{ marginTop: 5 }} component={Link} to="/" variant="outlined">
      Cancelar
    </Button>
  </React.Fragment>
);

export default ScheduleDay;
