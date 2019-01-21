import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import { Button, Typography } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import TimePicker from '../../components/TimePicker';
import { withRouter } from 'react-router-dom';
import { formatDate } from '../../utils/Formatter';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      client: {
        hours: []
      }
    };
    this.handleClickTimePicker = this.handleClickTimePicker.bind(this);
  }
  componentDidMount() {
    // fetch data...
    this.setState({
      client: {
        hours: [
          { id: 0, label: '09:00 -> 10:00', available: true },
          { id: 1, label: '10:00 -> 11:00', available: true },
          { id: 2, label: '11:00 -> 12:00', available: false },
          { id: 3, label: '12:00 -> 13:00', available: false },
          { id: 4, label: '13:00 -> 14:00', available: true },
          { id: 5, label: '14:00 -> 15:00', available: true },
          { id: 6, label: '15:00 -> 16:00', available: false },
          { id: 7, label: '17:00 -> 18:00', available: true }
        ]
      }
    });
  }
  handleClickTimePicker(time) {
    this.setState({
      time
    });
    this.props.onSelect(time);
  }
  render() {
    const TimePickerWithRouter = withRouter(({ history }) => (
      <TimePicker
        onClick={time => {
          this.handleClickTimePicker(time);
          history.push('/schedule/confirm');
        }}
        hours={this.state.client.hours}
      />
    ));

    return (
      <Layout {...this.props}>
        <Typography variant="h6">Horários disponíveis</Typography>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
        >
          {formatDate(this.props.date)}
          <ArrowDownIcon fontSize="small" style={{ marginLeft: 12 }} />
        </Button>
        <TimePickerWithRouter />
      </Layout>
    );
  }
}
