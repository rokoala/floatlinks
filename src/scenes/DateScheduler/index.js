import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Calendar from 'react-calendar';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './DateScheduler.css';

export default class DateScheduler extends PureComponent {
  render() {
    const CalendarRouter = withRouter(({ history }) => (
      <Calendar
        minDetail="year"
        locale="pt-BR"
        tileClassName={({ date, view }) => {
          // check if date is already scheduled by user
          if (date.getDate() % 2 === 0 && date.getDay() !== 4)
            return 'day-scheduled white-font';
        }}
        // check if the day is already full
        tileDisabled={({ activeStartDate, date, view }) => date.getDay() === 4}
        onChange={date => {
          this.props.onSelect(date);
          history.push('/schedule/time');
        }}
      />
    ));

    return (
      <Layout {...this.props}>
        <CalendarRouter />
        <ul className="legend">
          <li>
            <div className="block day-scheduled" />
            <Typography variant="caption">Meus horários</Typography>
          </li>
          <li>
            <div className="block day-unavailable" />
            <Typography variant="caption">Indisponível</Typography>
          </li>
        </ul>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/"
          variant="outlined"
        >
          Cancelar
        </Button>
      </Layout>
    );
  }
}
