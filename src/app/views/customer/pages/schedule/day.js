import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from '@material-ui/core';
import { Calendar } from '../../../../components/customer/calendar';
import { history } from '../../../../state/store';
import { agendaOperations } from '../../../../state/ducks/agenda';
import { appointmentOperations } from '../../../../state/ducks/appointment';

class ScheduleDay extends PureComponent {
  componentDidMount() {
    this.props.getAgenda('5c785ff53124d102d10b9bee', new Date());
  }
  render() {
    return (
      <React.Fragment>
        <Calendar
          minDetail="year"
          locale="pt-BR"
          tileDisabled={({ date, view }) =>
            this.props.slots.filter(
              slot =>
                (!slot.isOccupied &&
                  (view === 'month' &&
                    moment(slot.date).isSame(moment(date), 'day'))) ||
                (view === 'year' &&
                  moment(slot.date).isSame(moment(date), 'month'))
            ).length === 0
          }
          onChange={date => {
            this.props.setDate(date);
            history.push('/schedule/time');
          }}
          showLegend={true}
        />
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/"
          variant="outlined"
        >
          Cancelar
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  slots: store.agenda.slots
});

const mapDispatchToProps = {
  setDate: appointmentOperations.setDate,
  getAgenda: agendaOperations.get
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDay);
