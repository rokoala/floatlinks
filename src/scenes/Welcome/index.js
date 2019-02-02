import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import Layout from '../Layout';
import ScheduleList from '../../components/ScheduleList';
import './Welcome.css';

class Welcome extends PureComponent {
  componentDidMount() {
    // chamada API REST: getSchedule
  }
  render() {
    return (
      <Layout>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
          size="large"
        >
          <AlarmIcon style={{ marginRight: 5 }} />
          agendar
        </Button>
        <ScheduleList />
      </Layout>
    );
  }
}

export default Welcome;
