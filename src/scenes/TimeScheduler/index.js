import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { Button, Typography } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TimePicker from '../../components/TimePicker';
import { withRouter } from 'react-router-dom';
import { formatDate } from '../../utils/Formatter';
import { getHoursByDate } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TimeSchedule extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //TODO fetch data every time that get into this component...
    this.props.getHoursByDate(
      this.props.serviceProviderId,
      this.props.choosedDate,
    );
  }
  render() {
    const TimePickerWithRouter = withRouter(({ history }) => (
      <TimePicker
        onClick={time => {
          this.props.setHour(time);
          history.push('/schedule/confirm');
        }}
        hours={this.props.hours}
      />
    ));

    return (
      <Layout>
        <Typography variant="h6">Horários disponíveis</Typography>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
        >
          {formatDate(this.props.choosedDate)}
          <ArrowDownIcon fontSize="small" style={{ marginLeft: 12 }} />
        </Button>
        <TimePickerWithRouter />
      </Layout>
    );
  }
}
const mapStateToProps = store => ({
  choosedDate: store.appointment.current.date,
  hours: store.appointment.availableHours,
  serviceProviderId: store.serviceProvider._id,
});

const dispatchStateToProps = dispatch =>
  bindActionCreators(
    {
      getHoursByDate,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  dispatchStateToProps,
)(TimeSchedule);
