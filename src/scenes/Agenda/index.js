import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import Calendar from 'react-calendar';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { setDate } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import './Agenda.css';

class Agenda extends PureComponent {
  render() {
    console.log(
      moment(this.props.slots[0].slotDate).isSame(moment(new Date()), 'day'),
    );

    const CalendarRouter = withRouter(({ history }) => (
      <Calendar
        minDetail="year"
        locale="pt-BR"
        tileClassName={({ date }) => {
          // check if date is already scheduled by user
          // if (date.getDate() % 2 === 0 && date.getDay() !== 4)
          //   return 'day-scheduled white-font';
        }}
        // check the days that are available
        tileDisabled={({ date, view }) =>
          this.props.slots.filter(
            slot =>
              (!slot.isOccupied &&
                (view === 'month' &&
                  moment(slot.slotDate).isSame(moment(date), 'day'))) ||
              (view === 'year' &&
                moment(slot.slotDate).isSame(moment(date), 'month')),
          ).length === 0
        }
        onChange={date => {
          this.props.setDate(date);
          history.push('/schedule/time');
        }}
      />
    ));

    return (
      <Layout>
        <CalendarRouter />
        <ul className="legend">
          <li>
            <div className="block day-scheduled" />
            <Typography variant="caption">Meus horários</Typography>
          </li>
          <li>
            <div className="block day-available" />
            <Typography variant="caption">Disponível</Typography>
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

const mapStateToProps = store => ({
  slots: store.serviceProvider.agenda.slots,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setDate,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Agenda);
