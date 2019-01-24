import React, { PureComponent } from 'react';
import { Typography, Button, Card } from '@material-ui/core';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/Formatter';

export default class ConfirmScheduler extends PureComponent {
  render() {
    return (
      <Layout {...this.props}>
        <Typography variant="h6">Confirmar agendamento</Typography>
        <Card style={{ margin: 5, padding: 35, textAlign: 'center' }}>
          <Typography variant="h5">{formatDate(this.props.date)}</Typography>
          <Typography variant="h5">
            {this.props.time && this.props.time.label}
          </Typography>
        </Card>
        <div style={{ marginTop: 15 }}>
          <Button
            style={{ margin: 5 }}
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            confirmo
          </Button>
          <Button
            style={{ margin: 5 }}
            component={Link}
            to="/"
            variant="outlined"
          >
            cancelar
          </Button>
        </div>
      </Layout>
    );
  }
}
