import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Calendar from 'react-calendar';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './DateScheduler.css';

export default class DateScheduler extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const CalendarRouter = withRouter(({ history }) => (
      <Calendar
        locale="pt-BR"
        onChange={date => {
          this.props.onSelect(date);
          history.push('/schedule/time');
        }}
      />
    ));

    return (
      <Layout {...this.props}>
        <CalendarRouter />
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
