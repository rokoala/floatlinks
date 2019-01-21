import React, { PureComponent } from 'react';
import { Typography, Card, Button } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import { Link } from 'react-router-dom';
import Layout from '../Layout';
import './Welcome.css';

export default class Welcome extends PureComponent {
  render() {
    return (
      <Layout {...this.props}>
        <Card style={{ padding: 25 }}>
          <Typography variant="subtitle1">Sem agendamentos</Typography>
        </Card>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
        >
          <AlarmIcon style={{ marginRight: 5 }} />
          Agendar
        </Button>
      </Layout>
    );
  }
}
